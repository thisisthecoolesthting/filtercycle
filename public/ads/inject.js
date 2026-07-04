/**
 * Ad Injection Runtime — v3
 * Reads window.__AD_SITE_SLUG__ (set by BaseLayout.astro at build time),
 * fetches /ads/manifest.json, and fills every [data-ad-slot] element.
 *
 * utm_source is ALWAYS derived from window.__AD_SITE_SLUG__ — it is never
 * stored in the manifest. This makes cross-site UTM leakage architecturally
 * impossible: the manifest contains no source value, so it cannot carry the
 * wrong one to the wrong site.
 */
(function () {
  'use strict';

  var MANIFEST_URL = '/ads/manifest.json';
  var CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes client-side cache

  // ── 1. Identify the site ─────────────────────────────────────────────────
  var siteSlug = (window.__AD_SITE_SLUG__ || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (!siteSlug) return; // no slug = no ads (should never happen in production)

  // ── 2. Find all ad slots on this page ────────────────────────────────────
  var slots = document.querySelectorAll('[data-ad-slot]');
  if (!slots.length) return;

  // Reserve space immediately (synchronous) to prevent CLS.
  // slots.css already sets min-height; this marks them pending.
  slots.forEach(function (el) {
    el.setAttribute('data-ad-pending', '');
  });

  // ── 3. Fetch manifest with short-lived localStorage cache ─────────────────
  function fetchManifest(cb) {
    var KEY = 'adn_manifest_v3';
    var cached = null;
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var obj = JSON.parse(raw);
        if (Date.now() - obj.ts < CACHE_TTL_MS) {
          cached = obj.data;
        }
      }
    } catch (e) {}

    if (cached) { cb(cached); return; }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', MANIFEST_URL, true);
    xhr.timeout = 3000;
    xhr.onload = function () {
      if (xhr.status === 200) {
        var data = null;
        try { data = JSON.parse(xhr.responseText); } catch (e) {}
        if (data && data.schemaVersion === 3) {
          try {
            localStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), data: data }));
          } catch (e) {}
          cb(data);
        }
        // schema mismatch → fall through, SSR fallbacks remain visible
      }
    };
    xhr.onerror = xhr.ontimeout = function () { /* fall through — SSR fallback stays */ };
    xhr.send();
  }

  // ── 4. Weighted random store selection ───────────────────────────────────
  function pickStore(manifest, usedSlugs) {
    var targeting = (manifest.targeting || {})[siteSlug] || {};
    var weights   = targeting.weights || manifest.defaultWeights || {};
    var slugs     = Object.keys(weights);

    // Prefer unused stores for variety; fall back to full pool
    var pool = slugs.filter(function (s) { return !usedSlugs[s] && (weights[s] || 0) > 0; });
    if (!pool.length) pool = slugs.filter(function (s) { return (weights[s] || 0) > 0; });
    if (!pool.length) return null;

    // Weighted reservoir sample
    var total = pool.reduce(function (acc, s) { return acc + (weights[s] || 1); }, 0);
    var rand  = Math.random() * total;
    var acc   = 0;
    for (var i = 0; i < pool.length; i++) {
      acc += weights[pool[i]] || 1;
      if (rand < acc) return manifest.advertisers[pool[i]] || null;
    }
    return manifest.advertisers[pool[pool.length - 1]] || null;
  }

  // ── 5. Assemble click URL — utm_source ALWAYS from siteSlug ──────────────
  // utm_source is never in the manifest. This function is the only place
  // it is assembled, and it always reads from siteSlug (= window.__AD_SITE_SLUG__).
  function buildUrl(advertiser, slotMeta, deviceSuffix) {
    var content = slotMeta.size + '_' + (advertiser.slug || advertiser.name.toLowerCase());
    if (advertiser.affiliateUrl) {
      var base = String(advertiser.affiliateUrl);
      var sep = base.indexOf('?') >= 0 ? '&' : '?';
      var campaign = (advertiser.campaigns && advertiser.campaigns.primary) || 'partner';
      return base + sep
        + 'utm_source='   + encodeURIComponent(siteSlug)
        + '&utm_medium='   + encodeURIComponent(slotMeta.medium || 'cross_promo')
        + '&utm_campaign=' + encodeURIComponent(campaign)
        + '&utm_content='  + encodeURIComponent(content);
    }
    var domain;
    if (deviceSuffix === '_iph') {
      domain = advertiser.iphoneDomain || advertiser.domain;
    } else if (deviceSuffix === '_sam') {
      domain = advertiser.samsungDomain || advertiser.domain;
    } else {
      domain = advertiser.domain;
    }
    var campaign = (advertiser.campaigns && advertiser.campaigns.primary) || '15off';
    return 'https://' + domain + '/'
      + '?utm_source='   + encodeURIComponent(siteSlug)
      + '&utm_medium='   + encodeURIComponent(slotMeta.medium)
      + '&utm_campaign=' + encodeURIComponent(campaign)
      + '&utm_content='  + encodeURIComponent(content);
  }

  // ── 6. Render functions ───────────────────────────────────────────────────

  function renderLeaderBar(el, adv, slotMeta) {
    var href = buildUrl(adv, slotMeta, '');
    var ua   = navigator.userAgent || '';
    var resolvedHref = /iPhone|iPad|iPod/.test(ua) ? buildUrl(adv, slotMeta, '_iph')
                     : /Samsung|SM-[A-Za-z]/.test(ua) ? buildUrl(adv, slotMeta, '_sam')
                     : href;

    var eyebrow = adv.affiliatePartner ? 'Print-on-demand &middot; Sponsored' : 'Sponsored';
    el.innerHTML =
      '<div class="adn-leader-bar">'
      + '<p class="adn-eyebrow" style="margin:0 8px 0 0;align-self:center;white-space:nowrap">' + eyebrow + '</p>'
      + '<a href="' + resolvedHref + '" target="_blank" rel="noopener sponsored" class="adn-leader-link">'
      + '<span class="adn-leader-name">' + escHtml(adv.name) + '</span>'
      + '<span class="adn-leader-sep" aria-hidden="true">&mdash;</span>'
      + '<span class="adn-leader-body">' + (adv.barBody || '50,000+ designs &middot; ships in 2&nbsp;days') + ' &mdash; '
      + escHtml(adv.offer) + '&nbsp;code&nbsp;<span class="adn-leader-code">' + escHtml(adv.code) + '</span>'
      + '</span>'
      + '<span class="adn-leader-cta"> &rarr;</span>'
      + '</a>'
      + '</div>';
  }

  function renderTextSlot(el, adv, slotMeta) {
    var href = buildUrl(adv, slotMeta, '');
    var textEyebrow = adv.affiliatePartner
      ? ('Print-on-demand &middot; Sponsored &middot; ' + escHtml(adv.offer))
      : ('Phone cases &middot; Sponsored &middot; ' + escHtml(adv.offer));
    el.innerHTML =
      '<p class="adn-eyebrow">' + textEyebrow + '</p>'
      + '<a href="' + href + '" target="_blank" rel="noopener sponsored" class="adn-text-link">'
      + '<span class="adn-text-name">' + escHtml(adv.name) + '</span>'
      + ' &mdash; <span class="adn-text-tag">' + escHtml(adv.tagline)
      + ' Code <span class="adn-text-code">' + escHtml(adv.code) + '</span></span>'
      + '</a>';
  }

  function renderImageSlot(el, adv, slotMeta) {
    var href       = buildUrl(adv, slotMeta, '');
    var iphoneUrl  = buildUrl(adv, slotMeta, '_iph');
    var samsungUrl = buildUrl(adv, slotMeta, '_sam');

    // Device-detect for direct link
    var ua = navigator.userAgent || '';
    var resolvedHref = adv.affiliatePartner ? href
                     : /iPhone|iPad|iPod/.test(ua) ? iphoneUrl
                     : /Samsung|SM-[A-Za-z]/.test(ua) ? samsungUrl
                     : href;

    var imgs    = adv.images || [];
    var imgFile = imgs.length ? imgs[Math.floor(Math.random() * imgs.length)] : '';
    var imgUrl  = imgFile ? (adv.imageBaseUrl || '') + imgFile : '';

    el.style.setProperty('--adn-accent',       adv.accent      || '#4350e8');
    el.style.setProperty('--adn-accent-light',  adv.accentLight || '#eef0fd');
    el.style.setProperty('--adn-accent-dark',   adv.accentDark  || '#2e3ab5');

    var imgEyebrow = adv.affiliatePartner
      ? ('Sponsored &middot; Partner offer')
      : 'Sponsored &middot; From our family of brands';
    el.innerHTML =
      '<p class="adn-eyebrow">' + imgEyebrow + '</p>'
      + '<a href="' + resolvedHref + '" target="_blank" rel="noopener sponsored"'
      + '   data-href-iphone="' + iphoneUrl + '" data-href-samsung="' + samsungUrl + '"'
      + '   class="adn-card adn-card--' + slotMeta.size.replace('x', '-') + '">'
      + (imgUrl
          ? '<img src="' + imgUrl + '" alt="" loading="lazy" class="adn-card-img"'
            + ' onerror="this.style.display=\'none\'">'
          : '')
      + '<div class="adn-card-body">'
      + '  <span class="adn-badge">' + escHtml(adv.badge || '') + '</span>'
      + '  <p class="adn-name">'  + escHtml(adv.name)    + '</p>'
      + '  <p class="adn-tag">'   + escHtml(adv.tagline) + '</p>'
      + '  <div class="adn-offer">'
      + '    <span class="adn-offer-text">&#10022; ' + escHtml(adv.offer) + '</span>'
      + '    <span class="adn-code">Code: <strong>' + escHtml(adv.code) + '</strong></span>'
      + '  </div>'
      + '  <span class="adn-cta">' + escHtml(adv.cta) + ' &rarr;</span>'
      + '</div></a>';
  }

  function escHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // html5 animated banner (sandboxed iframe + click overlay)
  function bannerSizeForSlot(adv, slotMeta) {
    var b = adv.banners || {};
    var s = slotMeta.size;
    if (b[s]) return s;
    if (slotMeta.layout === 'bar' && b['320x50']) return '320x50';
    if (s === 'leaderboard' && b['728x90']) return '728x90';
    return null;
  }
  function renderHtml5Slot(el, adv, slotMeta, size) {
    var clickUrl  = buildUrl(adv, slotMeta, '');
    var bannerUrl = (adv.bannerBaseUrl || '') + adv.banners[size];
    var dims = size.split('x');
    var w = dims[0], h = dims[1] || '250';
    var imgEyebrow = adv.affiliatePartner
      ? ('Sponsored &middot; Partner offer')
      : 'Sponsored &middot; From our family of brands';
    el.innerHTML =
      '<p class="adn-eyebrow">' + imgEyebrow + '</p>'
      + '<div class="adn-h5" style="position:relative;width:' + w + 'px;max-width:100%;'
      +   'aspect-ratio:' + w + ' / ' + h + ';margin:0 auto;border-radius:14px;overflow:hidden;'
      +   'box-shadow:0 2px 12px rgba(0,0,0,.12)">'
      + '<iframe src="' + bannerUrl + '" title="' + escHtml(adv.name) + ' ad" loading="lazy" scrolling="no"'
      +   ' sandbox="" aria-hidden="true"'
      +   ' style="position:absolute;inset:0;width:100%;height:100%;border:0;display:block;pointer-events:none"></iframe>'
      + '<a href="' + clickUrl + '" target="_blank" rel="noopener sponsored"'
      +   ' aria-label="' + escHtml(adv.name + ' — ' + adv.offer) + '"'
      +   ' style="position:absolute;inset:0;z-index:2"></a>'
      + '</div>';
  }

  // ── 7. Render a single slot ───────────────────────────────────────────────
  function renderSlot(el, manifest, usedSlugs) {
    var slotId   = el.getAttribute('data-ad-slot');
    var slotMeta = (manifest.slots || {})[slotId];
    if (!slotMeta) return;

    var pinned     = el.getAttribute('data-ad-pin');
    var advertiser = pinned
      ? (manifest.advertisers[pinned] || null)
      : pickStore(manifest, usedSlugs);

    if (!advertiser) return;
    usedSlugs[advertiser.slug || advertiser.name] = true;

    if (advertiser.creativeType === 'html5' && advertiser.banners) {
      var h5size = bannerSizeForSlot(advertiser, slotMeta);
      if (h5size) {
        renderHtml5Slot(el, advertiser, slotMeta, h5size);
        el.removeAttribute('data-ad-pending');
        el.setAttribute('data-ad-filled', slotId);
        return;
      }
    }

    if (slotMeta.layout === 'bar') {
      renderLeaderBar(el, advertiser, slotMeta);
    } else if (slotMeta.size === 'text') {
      renderTextSlot(el, advertiser, slotMeta);
    } else {
      renderImageSlot(el, advertiser, slotMeta);
    }

    el.removeAttribute('data-ad-pending');
    el.setAttribute('data-ad-filled', slotId);
  }

  // ── 8. Main ───────────────────────────────────────────────────────────────
  fetchManifest(function (manifest) {
    var usedSlugs = {};
    slots.forEach(function (el) {
      if (el.hasAttribute('data-ad-pending') || el.hasAttribute('data-ad-force-refresh')) {
        renderSlot(el, manifest, usedSlugs);
      }
    });
  });

})();
