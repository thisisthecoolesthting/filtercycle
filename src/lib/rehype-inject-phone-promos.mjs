/**
 * Inserts [data-ad-slot="in-article-text"] divs after selected h2s.
 *
 * MIGRATION: The old version had `const AFF = 'filtercycle-20'` hardcoded, which
 * caused cross-site UTM leaks when templates were spawned with the wrong value.
 *
 * The new version emits slot divs that inject.js fills at runtime using
 * window.__AD_SITE_SLUG__ — the manifest carries no utm_source value.
 *
 * Each emitted div contains a build-time SSR fallback (readable by crawlers /
 * no-JS visitors) with utm_source derived from spawn-home.json — correctly
 * per-site. inject.js replaces the inner HTML with a weighted-random store.
 */
import spawnHome from '../data/spawn-home.json' with { type: 'json' };
import { CASE_AD_STORES } from '../data/case-ad-stores.ts';

// Derive slug at build time from spawn-home.json — same logic as BaseLayout.astro.
// This is the correct per-site value; it matches window.__AD_SITE_SLUG__.
const rawBrandName =
  spawnHome?.brand?.shortName ||
  spawnHome?.brand?.fullName ||
  spawnHome?.siteSlug ||
  'filtercycle';
const SSR_SLUG = rawBrandName.toLowerCase().replace(/[^a-z0-9-]/g, '');

/** After the 2nd, 4th, and 6th h2 (skip title-area noise). */
const INJECT_ON_H2 = new Set([2, 4, 6]);

function slotElement(h2Index) {
  // SSR fallback: one store, correct slug, readable by Googlebot.
  // inject.js replaces this with a weighted-random pick at runtime.
  const store = CASE_AD_STORES[h2Index % CASE_AD_STORES.length];
  const href = `https://${store.domain}/?utm_source=${SSR_SLUG}&utm_medium=cross_promo_text&utm_campaign=15off&utm_content=article-mid-${h2Index}_${store.slug}`;

  return {
    type: 'element',
    tagName: 'div',
    properties: {
      'data-ad-slot': 'in-article-text',
      className: ['not-prose'],
    },
    children: [
      {
        type: 'element',
        tagName: 'p',
        properties: { className: ['adn-eyebrow'] },
        children: [{ type: 'text', value: 'Phone cases · Sponsored · 15% off first order' }],
      },
      {
        type: 'element',
        tagName: 'a',
        properties: {
          href,
          className: ['adn-text-link'],
          rel: ['noopener', 'sponsored'],
          target: '_blank',
        },
        children: [
          {
            type: 'element',
            tagName: 'span',
            properties: { className: ['adn-text-name'] },
            children: [{ type: 'text', value: store.name }],
          },
          {
            type: 'element',
            tagName: 'span',
            properties: { className: ['adn-text-tag'] },
            children: [{ type: 'text', value: ` — ${store.tagline} Code ` }],
          },
          {
            type: 'element',
            tagName: 'span',
            properties: { className: ['adn-text-code'] },
            children: [{ type: 'text', value: store.code }],
          },
        ],
      },
    ],
  };
}

function walkInsert(node) {
  if (!node?.children || !Array.isArray(node.children)) return;

  let h2Count = 0;
  const next = [];

  for (const child of node.children) {
    next.push(child);
    walkInsert(child);

    if (child?.type === 'element' && child.tagName === 'h2') {
      h2Count += 1;
      if (INJECT_ON_H2.has(h2Count)) {
        next.push(slotElement(h2Count));
      }
    }
  }

  node.children = next;
}

export function rehypeInjectPhonePromos() {
  return (tree) => {
    walkInsert(tree);
  };
}
