declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"articles": {
"6-best-air-purifiers-for-smoke-removal-clear-the-air-in-minutes.md": {
	id: "6-best-air-purifiers-for-smoke-removal-clear-the-air-in-minutes.md";
  slug: "6-best-air-purifiers-for-smoke-removal-clear-the-air-in-minutes";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"a-beginner-s-guide-to-improving-air-quality-in-every-room.md": {
	id: "a-beginner-s-guide-to-improving-air-quality-in-every-room.md";
  slug: "a-beginner-s-guide-to-improving-air-quality-in-every-room";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"a-homeowner-s-guide-to-hvac-air-filter-types-pleated-fiberglass-and-more.md": {
	id: "a-homeowner-s-guide-to-hvac-air-filter-types-pleated-fiberglass-and-more.md";
  slug: "a-homeowner-s-guide-to-hvac-air-filter-types-pleated-fiberglass-and-more";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"air-filter-materials-explained-which-one-is-right-for-you.md": {
	id: "air-filter-materials-explained-which-one-is-right-for-you.md";
  slug: "air-filter-materials-explained-which-one-is-right-for-you";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"are-all-air-filters-created-equal-a-deep-dive-into-quality.md": {
	id: "are-all-air-filters-created-equal-a-deep-dive-into-quality.md";
  slug: "are-all-air-filters-created-equal-a-deep-dive-into-quality";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"are-washable-air-filters-worth-it-pros-and-cons-explored.md": {
	id: "are-washable-air-filters-worth-it-pros-and-cons-explored.md";
  slug: "are-washable-air-filters-worth-it-pros-and-cons-explored";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-filters-for-homes-with-fireplaces-and-wood-stoves.md": {
	id: "best-air-filters-for-homes-with-fireplaces-and-wood-stoves.md";
  slug: "best-air-filters-for-homes-with-fireplaces-and-wood-stoves";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-filters-for-odor-removal-fresh-air-guaranteed.md": {
	id: "best-air-filters-for-odor-removal-fresh-air-guaranteed.md";
  slug: "best-air-filters-for-odor-removal-fresh-air-guaranteed";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-filters-for-preventing-hvac-system-damage.md": {
	id: "best-air-filters-for-preventing-hvac-system-damage.md";
  slug: "best-air-filters-for-preventing-hvac-system-damage";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-babies-and-children-ensuring-a-healthy-start.md": {
	id: "best-air-purifiers-for-babies-and-children-ensuring-a-healthy-start.md";
  slug: "best-air-purifiers-for-babies-and-children-ensuring-a-healthy-start";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-bedrooms-sleep-soundly-with-clean-air.md": {
	id: "best-air-purifiers-for-bedrooms-sleep-soundly-with-clean-air.md";
  slug: "best-air-purifiers-for-bedrooms-sleep-soundly-with-clean-air";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-classrooms-and-daycares-protecting-our-kids.md": {
	id: "best-air-purifiers-for-classrooms-and-daycares-protecting-our-kids.md";
  slug: "best-air-purifiers-for-classrooms-and-daycares-protecting-our-kids";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-data-centers-and-server-rooms-protecting-equipment.md": {
	id: "best-air-purifiers-for-data-centers-and-server-rooms-protecting-equipment.md";
  slug: "best-air-purifiers-for-data-centers-and-server-rooms-protecting-equipment";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-dust-mites-a-complete-guide.md": {
	id: "best-air-purifiers-for-dust-mites-a-complete-guide.md";
  slug: "best-air-purifiers-for-dust-mites-a-complete-guide";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-gyms-and-fitness-studios-fresh-air-for-workouts.md": {
	id: "best-air-purifiers-for-gyms-and-fitness-studios-fresh-air-for-workouts.md";
  slug: "best-air-purifiers-for-gyms-and-fitness-studios-fresh-air-for-workouts";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-hair-salons-and-spas-fresh-air-for-clients-and-staff.md": {
	id: "best-air-purifiers-for-hair-salons-and-spas-fresh-air-for-clients-and-staff.md";
  slug: "best-air-purifiers-for-hair-salons-and-spas-fresh-air-for-clients-and-staff";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-hotels-and-resorts-enhancing-guest-experience.md": {
	id: "best-air-purifiers-for-hotels-and-resorts-enhancing-guest-experience.md";
  slug: "best-air-purifiers-for-hotels-and-resorts-enhancing-guest-experience";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-indoor-farming-and-grow-rooms-optimal-conditions.md": {
	id: "best-air-purifiers-for-indoor-farming-and-grow-rooms-optimal-conditions.md";
  slug: "best-air-purifiers-for-indoor-farming-and-grow-rooms-optimal-conditions";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-kitchen-odors-banish-cooking-smells.md": {
	id: "best-air-purifiers-for-kitchen-odors-banish-cooking-smells.md";
  slug: "best-air-purifiers-for-kitchen-odors-banish-cooking-smells";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-large-rooms-coverage-you-can-count-on.md": {
	id: "best-air-purifiers-for-large-rooms-coverage-you-can-count-on.md";
  slug: "best-air-purifiers-for-large-rooms-coverage-you-can-count-on";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-mold-spores-protecting-your-family-s-health.md": {
	id: "best-air-purifiers-for-mold-spores-protecting-your-family-s-health.md";
  slug: "best-air-purifiers-for-mold-spores-protecting-your-family-s-health";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-offices-and-workspaces-improve-productivity.md": {
	id: "best-air-purifiers-for-offices-and-workspaces-improve-productivity.md";
  slug: "best-air-purifiers-for-offices-and-workspaces-improve-productivity";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-pet-allergies-say-goodbye-to-sneezing.md": {
	id: "best-air-purifiers-for-pet-allergies-say-goodbye-to-sneezing.md";
  slug: "best-air-purifiers-for-pet-allergies-say-goodbye-to-sneezing";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-restaurants-and-commercial-kitchens-food-safety-air-.md": {
	id: "best-air-purifiers-for-restaurants-and-commercial-kitchens-food-safety-air-.md";
  slug: "best-air-purifiers-for-restaurants-and-commercial-kitchens-food-safety-air-";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-retail-stores-a-breath-of-fresh-air-for-shoppers.md": {
	id: "best-air-purifiers-for-retail-stores-a-breath-of-fresh-air-for-shoppers.md";
  slug: "best-air-purifiers-for-retail-stores-a-breath-of-fresh-air-for-shoppers";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-schools-and-universities-a-healthy-learning-environm.md": {
	id: "best-air-purifiers-for-schools-and-universities-a-healthy-learning-environm.md";
  slug: "best-air-purifiers-for-schools-and-universities-a-healthy-learning-environm";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-seasonal-allergies-find-relief-year-round.md": {
	id: "best-air-purifiers-for-seasonal-allergies-find-relief-year-round.md";
  slug: "best-air-purifiers-for-seasonal-allergies-find-relief-year-round";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-travel-compact-solutions-for-clean-air-anywhere.md": {
	id: "best-air-purifiers-for-travel-compact-solutions-for-clean-air-anywhere.md";
  slug: "best-air-purifiers-for-travel-compact-solutions-for-clean-air-anywhere";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-for-workshops-and-garages-tackling-tough-air.md": {
	id: "best-air-purifiers-for-workshops-and-garages-tackling-tough-air.md";
  slug: "best-air-purifiers-for-workshops-and-garages-tackling-tough-air";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-with-activated-carbon-filters-for-chemical-removal.md": {
	id: "best-air-purifiers-with-activated-carbon-filters-for-chemical-removal.md";
  slug: "best-air-purifiers-with-activated-carbon-filters-for-chemical-removal";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-air-purifiers-with-true-hepa-filters-the-gold-standard.md": {
	id: "best-air-purifiers-with-true-hepa-filters-the-gold-standard.md";
  slug: "best-air-purifiers-with-true-hepa-filters-the-gold-standard";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-medical-grade-air-purifiers-for-the-most-sensitive-individuals.md": {
	id: "best-medical-grade-air-purifiers-for-the-most-sensitive-individuals.md";
  slug: "best-medical-grade-air-purifiers-for-the-most-sensitive-individuals";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-personal-air-purifiers-for-travel-and-small-spaces.md": {
	id: "best-personal-air-purifiers-for-travel-and-small-spaces.md";
  slug: "best-personal-air-purifiers-for-travel-and-small-spaces";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-portable-air-purifiers-for-on-the-go-clean-air.md": {
	id: "best-portable-air-purifiers-for-on-the-go-clean-air.md";
  slug: "best-portable-air-purifiers-for-on-the-go-clean-air";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-reusable-water-bottles-save-money.md": {
	id: "best-reusable-water-bottles-save-money.md";
  slug: "best-reusable-water-bottles-save-money";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-uv-c-air-purifiers-are-they-safe-and-effective.md": {
	id: "best-uv-c-air-purifiers-are-they-safe-and-effective.md";
  slug: "best-uv-c-air-purifiers-are-they-safe-and-effective";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-whole-house-air-purifiers-of-2024-a-comprehensive-review.md": {
	id: "best-whole-house-air-purifiers-of-2024-a-comprehensive-review.md";
  slug: "best-whole-house-air-purifiers-of-2024-a-comprehensive-review";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"beyond-the-basics-advanced-air-filtration-techniques-for-a-healthier-home.md": {
	id: "beyond-the-basics-advanced-air-filtration-techniques-for-a-healthier-home.md";
  slug: "beyond-the-basics-advanced-air-filtration-techniques-for-a-healthier-home";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"buying-guide-air-purifier-features-you-can-t-live-without.md": {
	id: "buying-guide-air-purifier-features-you-can-t-live-without.md";
  slug: "buying-guide-air-purifier-features-you-can-t-live-without";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"buying-guide-how-to-choose-the-right-merv-rating-for-your-home.md": {
	id: "buying-guide-how-to-choose-the-right-merv-rating-for-your-home.md";
  slug: "buying-guide-how-to-choose-the-right-merv-rating-for-your-home";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"cancel-unwanted-subscriptions-guide.md": {
	id: "cancel-unwanted-subscriptions-guide.md";
  slug: "cancel-unwanted-subscriptions-guide";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"choosing-the-best-air-filter-for-asthma-sufferers-a-practical-guide.md": {
	id: "choosing-the-best-air-filter-for-asthma-sufferers-a-practical-guide.md";
  slug: "choosing-the-best-air-filter-for-asthma-sufferers-a-practical-guide";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"common-air-filter-myths-debunked-get-the-facts.md": {
	id: "common-air-filter-myths-debunked-get-the-facts.md";
  slug: "common-air-filter-myths-debunked-get-the-facts";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"comparing-air-purifier-technologies-hepa-activated-carbon-and-more.md": {
	id: "comparing-air-purifier-technologies-hepa-activated-carbon-and-more.md";
  slug: "comparing-air-purifier-technologies-hepa-activated-carbon-and-more";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"concentrates-for-cleaning-cost-efficiency-and-environmental-benefits.md": {
	id: "concentrates-for-cleaning-cost-efficiency-and-environmental-benefits.md";
  slug: "concentrates-for-cleaning-cost-efficiency-and-environmental-benefits";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"decoding-air-filter-terminology-a-glossary-for-homeowners.md": {
	id: "decoding-air-filter-terminology-a-glossary-for-homeowners.md";
  slug: "decoding-air-filter-terminology-a-glossary-for-homeowners";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"detergent-dollar-drain.md": {
	id: "detergent-dollar-drain.md";
  slug: "detergent-dollar-drain";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"diy-air-quality-testing-simple-ways-to-monitor-your-home-s-air.md": {
	id: "diy-air-quality-testing-simple-ways-to-monitor-your-home-s-air.md";
  slug: "diy-air-quality-testing-simple-ways-to-monitor-your-home-s-air";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"diy-cleaning-supplies-recipes.md": {
	id: "diy-cleaning-supplies-recipes.md";
  slug: "diy-cleaning-supplies-recipes";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"diy-furnace-filter-replacement-a-step-by-step-guide-for-beginners.md": {
	id: "diy-furnace-filter-replacement-a-step-by-step-guide-for-beginners.md";
  slug: "diy-furnace-filter-replacement-a-step-by-step-guide-for-beginners";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"electrostatic-air-filters-do-they-really-work.md": {
	id: "electrostatic-air-filters-do-they-really-work.md";
  slug: "electrostatic-air-filters-do-they-really-work";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"from-dust-to-dander-the-science-behind-air-filtration.md": {
	id: "from-dust-to-dander-the-science-behind-air-filtration.md";
  slug: "from-dust-to-dander-the-science-behind-air-filtration";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"hepa-vs-merv-understanding-the-differences-for-optimal-air-quality.md": {
	id: "hepa-vs-merv-understanding-the-differences-for-optimal-air-quality.md";
  slug: "hepa-vs-merv-understanding-the-differences-for-optimal-air-quality";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-air-filters-impact-your-hvac-system-s-efficiency.md": {
	id: "how-air-filters-impact-your-hvac-system-s-efficiency.md";
  slug: "how-air-filters-impact-your-hvac-system-s-efficiency";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-often-change-hvac-filter-pets.md": {
	id: "how-often-change-hvac-filter-pets.md";
  slug: "how-often-change-hvac-filter-pets";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-often-should-you-change-your-air-filter-the-definitive-answer.md": {
	id: "how-often-should-you-change-your-air-filter-the-definitive-answer.md";
  slug: "how-often-should-you-change-your-air-filter-the-definitive-answer";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-choose-an-air-filter-for-optimal-heating-and-cooling.md": {
	id: "how-to-choose-an-air-filter-for-optimal-heating-and-cooling.md";
  slug: "how-to-choose-an-air-filter-for-optimal-heating-and-cooling";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-choose-the-right-air-filter-brand-a-comparison.md": {
	id: "how-to-choose-the-right-air-filter-brand-a-comparison.md";
  slug: "how-to-choose-the-right-air-filter-brand-a-comparison";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-choose-the-right-air-filter-for-your-climate-zone.md": {
	id: "how-to-choose-the-right-air-filter-for-your-climate-zone.md";
  slug: "how-to-choose-the-right-air-filter-for-your-climate-zone";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-clean-your-air-purifier-filters-a-maintenance-tutorial.md": {
	id: "how-to-clean-your-air-purifier-filters-a-maintenance-tutorial.md";
  slug: "how-to-clean-your-air-purifier-filters-a-maintenance-tutorial";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-create-a-healthy-home-environment-with-proper-air-filtration.md": {
	id: "how-to-create-a-healthy-home-environment-with-proper-air-filtration.md";
  slug: "how-to-create-a-healthy-home-environment-with-proper-air-filtration";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-detect-poor-indoor-air-quality-warning-signs-to-look-for.md": {
	id: "how-to-detect-poor-indoor-air-quality-warning-signs-to-look-for.md";
  slug: "how-to-detect-poor-indoor-air-quality-warning-signs-to-look-for";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-diagnose-and-fix-common-air-filter-problems.md": {
	id: "how-to-diagnose-and-fix-common-air-filter-problems.md";
  slug: "how-to-diagnose-and-fix-common-air-filter-problems";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-extend-the-life-of-your-hvac-system-through-proper-filtration.md": {
	id: "how-to-extend-the-life-of-your-hvac-system-through-proper-filtration.md";
  slug: "how-to-extend-the-life-of-your-hvac-system-through-proper-filtration";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-get-the-most-out-of-your-air-filter-s-lifespan.md": {
	id: "how-to-get-the-most-out-of-your-air-filter-s-lifespan.md";
  slug: "how-to-get-the-most-out-of-your-air-filter-s-lifespan";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-identify-and-replace-specialty-air-filters.md": {
	id: "how-to-identify-and-replace-specialty-air-filters.md";
  slug: "how-to-identify-and-replace-specialty-air-filters";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-improve-indoor-air-quality-simple-steps-for-a-healthier-home.md": {
	id: "how-to-improve-indoor-air-quality-simple-steps-for-a-healthier-home.md";
  slug: "how-to-improve-indoor-air-quality-simple-steps-for-a-healthier-home";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-incorporate-air-filtration-into-your-home-renovation-plans.md": {
	id: "how-to-incorporate-air-filtration-into-your-home-renovation-plans.md";
  slug: "how-to-incorporate-air-filtration-into-your-home-renovation-plans";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-install-a-new-air-filter-a-visual-guide.md": {
	id: "how-to-install-a-new-air-filter-a-visual-guide.md";
  slug: "how-to-install-a-new-air-filter-a-visual-guide";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-know-when-your-air-filter-needs-replacing-key-indicators.md": {
	id: "how-to-know-when-your-air-filter-needs-replacing-key-indicators.md";
  slug: "how-to-know-when-your-air-filter-needs-replacing-key-indicators";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-maximize-your-air-filter-s-performance-expert-tips.md": {
	id: "how-to-maximize-your-air-filter-s-performance-expert-tips.md";
  slug: "how-to-maximize-your-air-filter-s-performance-expert-tips";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-measure-your-air-filter-a-simple-guide.md": {
	id: "how-to-measure-your-air-filter-a-simple-guide.md";
  slug: "how-to-measure-your-air-filter-a-simple-guide";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-protect-your-hvac-system-from-common-airborne-contaminants.md": {
	id: "how-to-protect-your-hvac-system-from-common-airborne-contaminants.md";
  slug: "how-to-protect-your-hvac-system-from-common-airborne-contaminants";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-read-your-air-filter-s-packaging-essential-information.md": {
	id: "how-to-read-your-air-filter-s-packaging-essential-information.md";
  slug: "how-to-read-your-air-filter-s-packaging-essential-information";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-reduce-dust-in-your-home-the-role-of-your-air-filter.md": {
	id: "how-to-reduce-dust-in-your-home-the-role-of-your-air-filter.md";
  slug: "how-to-reduce-dust-in-your-home-the-role-of-your-air-filter";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-reduce-pet-odors-with-the-right-air-filter.md": {
	id: "how-to-reduce-pet-odors-with-the-right-air-filter.md";
  slug: "how-to-reduce-pet-odors-with-the-right-air-filter";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-reduce-static-electricity-in-your-home-with-air-filtration.md": {
	id: "how-to-reduce-static-electricity-in-your-home-with-air-filtration.md";
  slug: "how-to-reduce-static-electricity-in-your-home-with-air-filtration";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-refill-glass-jars-safely-for-household-products.md": {
	id: "how-to-refill-glass-jars-safely-for-household-products.md";
  slug: "how-to-refill-glass-jars-safely-for-household-products";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-refill-household-cleaners-without-sacrificing-effectiveness.md": {
	id: "how-to-refill-household-cleaners-without-sacrificing-effectiveness.md";
  slug: "how-to-refill-household-cleaners-without-sacrificing-effectiveness";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-save-money-on-air-filters-without-sacrificing-quality.md": {
	id: "how-to-save-money-on-air-filters-without-sacrificing-quality.md";
  slug: "how-to-save-money-on-air-filters-without-sacrificing-quality";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-set-up-an-air-quality-monitoring-system-in-your-home.md": {
	id: "how-to-set-up-an-air-quality-monitoring-system-in-your-home.md";
  slug: "how-to-set-up-an-air-quality-monitoring-system-in-your-home";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-spot-fake-or-low-quality-air-filters-a-buyer-s-beware-guide.md": {
	id: "how-to-spot-fake-or-low-quality-air-filters-a-buyer-s-beware-guide.md";
  slug: "how-to-spot-fake-or-low-quality-air-filters-a-buyer-s-beware-guide";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-store-your-spare-air-filters-tips-for-longevity.md": {
	id: "how-to-store-your-spare-air-filters-tips-for-longevity.md";
  slug: "how-to-store-your-spare-air-filters-tips-for-longevity";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-troubleshoot-airflow-issues-caused-by-your-filter.md": {
	id: "how-to-troubleshoot-airflow-issues-caused-by-your-filter.md";
  slug: "how-to-troubleshoot-airflow-issues-caused-by-your-filter";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"hvac-filter-maintenance-checklist-keep-your-system-running-smoothly.md": {
	id: "hvac-filter-maintenance-checklist-keep-your-system-running-smoothly.md";
  slug: "hvac-filter-maintenance-checklist-keep-your-system-running-smoothly";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"merv-11-vs-13-allergies.md": {
	id: "merv-11-vs-13-allergies.md";
  slug: "merv-11-vs-13-allergies";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"merv-11-vs-merv-13-which-is-right-for-your-home.md": {
	id: "merv-11-vs-merv-13-which-is-right-for-your-home.md";
  slug: "merv-11-vs-merv-13-which-is-right-for-your-home";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"merv-14-and-above-when-do-you-need-industrial-grade-filtration.md": {
	id: "merv-14-and-above-when-do-you-need-industrial-grade-filtration.md";
  slug: "merv-14-and-above-when-do-you-need-industrial-grade-filtration";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"merv-8-vs-merv-10-which-offers-better-filtration.md": {
	id: "merv-8-vs-merv-10-which-offers-better-filtration.md";
  slug: "merv-8-vs-merv-10-which-offers-better-filtration";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"merv-ratings-and-you-a-personalized-recommendation-guide.md": {
	id: "merv-ratings-and-you-a-personalized-recommendation-guide.md";
  slug: "merv-ratings-and-you-a-personalized-recommendation-guide";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"pet-food-inflation-finding-affordable-alternatives.md": {
	id: "pet-food-inflation-finding-affordable-alternatives.md";
  slug: "pet-food-inflation-finding-affordable-alternatives";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"pet-food-inflation-watch.md": {
	id: "pet-food-inflation-watch.md";
  slug: "pet-food-inflation-watch";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"pet-food-price-watch.md": {
	id: "pet-food-price-watch.md";
  slug: "pet-food-price-watch";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"streaming-service-price-creep-tracker.md": {
	id: "streaming-service-price-creep-tracker.md";
  slug: "streaming-service-price-creep-tracker";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"streaming-service-price-creep.md": {
	id: "streaming-service-price-creep.md";
  slug: "streaming-service-price-creep";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"streaming-subscription-hikes-avoid.md": {
	id: "streaming-subscription-hikes-avoid.md";
  slug: "streaming-subscription-hikes-avoid";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-5-best-budget-friendly-air-filters-that-don-t-compromise-quality.md": {
	id: "the-5-best-budget-friendly-air-filters-that-don-t-compromise-quality.md";
  slug: "the-5-best-budget-friendly-air-filters-that-don-t-compromise-quality";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-5-best-quiet-air-purifiers-for-peaceful-breathing.md": {
	id: "the-5-best-quiet-air-purifiers-for-peaceful-breathing.md";
  slug: "the-5-best-quiet-air-purifiers-for-peaceful-breathing";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-7-best-air-filters-for-pet-owners-breathe-easy-with-your-furry-friends.md": {
	id: "the-7-best-air-filters-for-pet-owners-breathe-easy-with-your-furry-friends.md";
  slug: "the-7-best-air-filters-for-pet-owners-breathe-easy-with-your-furry-friends";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-8-best-smart-air-purifiers-for-connected-living.md": {
	id: "the-8-best-smart-air-purifiers-for-connected-living.md";
  slug: "the-8-best-smart-air-purifiers-for-connected-living";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-9-best-air-purifiers-for-voc-removal-say-goodbye-to-indoor-pollutants.md": {
	id: "the-9-best-air-purifiers-for-voc-removal-say-goodbye-to-indoor-pollutants.md";
  slug: "the-9-best-air-purifiers-for-voc-removal-say-goodbye-to-indoor-pollutants";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-energy-efficiency-save-money-breathe-better.md": {
	id: "the-best-air-filters-for-energy-efficiency-save-money-breathe-better.md";
  slug: "the-best-air-filters-for-energy-efficiency-save-money-breathe-better";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-energy-star-certified-homes.md": {
	id: "the-best-air-filters-for-energy-star-certified-homes.md";
  slug: "the-best-air-filters-for-energy-star-certified-homes";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-in-arid-climates.md": {
	id: "the-best-air-filters-for-homes-in-arid-climates.md";
  slug: "the-best-air-filters-for-homes-in-arid-climates";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-in-urban-environments.md": {
	id: "the-best-air-filters-for-homes-in-urban-environments.md";
  slug: "the-best-air-filters-for-homes-in-urban-environments";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-with-art-collections-and-antiques.md": {
	id: "the-best-air-filters-for-homes-with-art-collections-and-antiques.md";
  slug: "the-best-air-filters-for-homes-with-art-collections-and-antiques";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-with-basement-humidity-issues.md": {
	id: "the-best-air-filters-for-homes-with-basement-humidity-issues.md";
  slug: "the-best-air-filters-for-homes-with-basement-humidity-issues";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-with-basement-living-spaces.md": {
	id: "the-best-air-filters-for-homes-with-basement-living-spaces.md";
  slug: "the-best-air-filters-for-homes-with-basement-living-spaces";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-with-central-vacuum-systems.md": {
	id: "the-best-air-filters-for-homes-with-central-vacuum-systems.md";
  slug: "the-best-air-filters-for-homes-with-central-vacuum-systems";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-with-construction-dust.md": {
	id: "the-best-air-filters-for-homes-with-construction-dust.md";
  slug: "the-best-air-filters-for-homes-with-construction-dust";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-with-elderly-residents-respiratory-protectio.md": {
	id: "the-best-air-filters-for-homes-with-elderly-residents-respiratory-protectio.md";
  slug: "the-best-air-filters-for-homes-with-elderly-residents-respiratory-protectio";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-with-indoor-plants.md": {
	id: "the-best-air-filters-for-homes-with-indoor-plants.md";
  slug: "the-best-air-filters-for-homes-with-indoor-plants";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-with-infants-protecting-delicate-lungs.md": {
	id: "the-best-air-filters-for-homes-with-infants-protecting-delicate-lungs.md";
  slug: "the-best-air-filters-for-homes-with-infants-protecting-delicate-lungs";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-with-multiple-occupants.md": {
	id: "the-best-air-filters-for-homes-with-multiple-occupants.md";
  slug: "the-best-air-filters-for-homes-with-multiple-occupants";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-with-radiant-heating-systems.md": {
	id: "the-best-air-filters-for-homes-with-radiant-heating-systems.md";
  slug: "the-best-air-filters-for-homes-with-radiant-heating-systems";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-with-sensitive-electronics.md": {
	id: "the-best-air-filters-for-homes-with-sensitive-electronics.md";
  slug: "the-best-air-filters-for-homes-with-sensitive-electronics";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-with-smokers.md": {
	id: "the-best-air-filters-for-homes-with-smokers.md";
  slug: "the-best-air-filters-for-homes-with-smokers";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-homes-with-solar-panels-optimizing-efficiency.md": {
	id: "the-best-air-filters-for-homes-with-solar-panels-optimizing-efficiency.md";
  slug: "the-best-air-filters-for-homes-with-solar-panels-optimizing-efficiency";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-pet-hair-and-dander-control.md": {
	id: "the-best-air-filters-for-pet-hair-and-dander-control.md";
  slug: "the-best-air-filters-for-pet-hair-and-dander-control";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-preventing-coil-buildup-in-your-hvac.md": {
	id: "the-best-air-filters-for-preventing-coil-buildup-in-your-hvac.md";
  slug: "the-best-air-filters-for-preventing-coil-buildup-in-your-hvac";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-preventing-dust-buildup-on-furniture.md": {
	id: "the-best-air-filters-for-preventing-dust-buildup-on-furniture.md";
  slug: "the-best-air-filters-for-preventing-dust-buildup-on-furniture";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-preventing-hvac-system-breakdowns.md": {
	id: "the-best-air-filters-for-preventing-hvac-system-breakdowns.md";
  slug: "the-best-air-filters-for-preventing-hvac-system-breakdowns";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-air-filters-for-southern-climates-humidity-and-pollen-solutions.md": {
	id: "the-best-air-filters-for-southern-climates-humidity-and-pollen-solutions.md";
  slug: "the-best-air-filters-for-southern-climates-humidity-and-pollen-solutions";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-best-reusable-air-filters-eco-friendly-and-effective-options.md": {
	id: "the-best-reusable-air-filters-eco-friendly-and-effective-options.md";
  slug: "the-best-reusable-air-filters-eco-friendly-and-effective-options";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-environmental-impact-of-air-filters-sustainable-choices.md": {
	id: "the-environmental-impact-of-air-filters-sustainable-choices.md";
  slug: "the-environmental-impact-of-air-filters-sustainable-choices";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-future-of-air-filtration-innovations-on-the-horizon.md": {
	id: "the-future-of-air-filtration-innovations-on-the-horizon.md";
  slug: "the-future-of-air-filtration-innovations-on-the-horizon";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-hidden-costs-of-not-changing-your-air-filter-don-t-make-these-mistakes.md": {
	id: "the-hidden-costs-of-not-changing-your-air-filter-don-t-make-these-mistakes.md";
  slug: "the-hidden-costs-of-not-changing-your-air-filter-don-t-make-these-mistakes";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-history-of-air-filtration-from-simple-screens-to-advanced-tech.md": {
	id: "the-history-of-air-filtration-from-simple-screens-to-advanced-tech.md";
  slug: "the-history-of-air-filtration-from-simple-screens-to-advanced-tech";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-impact-of-hvac-air-filters-on-overall-home-health.md": {
	id: "the-impact-of-hvac-air-filters-on-overall-home-health.md";
  slug: "the-impact-of-hvac-air-filters-on-overall-home-health";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-importance-of-air-filtration-for-respiratory-health.md": {
	id: "the-importance-of-air-filtration-for-respiratory-health.md";
  slug: "the-importance-of-air-filtration-for-respiratory-health";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-psychology-of-clean-air-how-filters-impact-well-being.md": {
	id: "the-psychology-of-clean-air-how-filters-impact-well-being.md";
  slug: "the-psychology-of-clean-air-how-filters-impact-well-being";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-science-of-airflow-how-filters-impact-your-hvac-system.md": {
	id: "the-science-of-airflow-how-filters-impact-your-hvac-system.md";
  slug: "the-science-of-airflow-how-filters-impact-your-hvac-system";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-ultimate-guide-to-furnace-filter-sizes-find-the-perfect-fit.md": {
	id: "the-ultimate-guide-to-furnace-filter-sizes-find-the-perfect-fit.md";
  slug: "the-ultimate-guide-to-furnace-filter-sizes-find-the-perfect-fit";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"the-ultimate-home-air-quality-checklist-from-filters-to-ventilation.md": {
	id: "the-ultimate-home-air-quality-checklist-from-filters-to-ventilation.md";
  slug: "the-ultimate-home-air-quality-checklist-from-filters-to-ventilation";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"top-10-hvac-air-filters-for-allergies-your-ultimate-relief-guide.md": {
	id: "top-10-hvac-air-filters-for-allergies-your-ultimate-relief-guide.md";
  slug: "top-10-hvac-air-filters-for-allergies-your-ultimate-relief-guide";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"understanding-air-filter-density-and-its-impact-on-filtration.md": {
	id: "understanding-air-filter-density-and-its-impact-on-filtration.md";
  slug: "understanding-air-filter-density-and-its-impact-on-filtration";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"understanding-air-filter-sizing-common-mistakes-and-how-to-avoid-them.md": {
	id: "understanding-air-filter-sizing-common-mistakes-and-how-to-avoid-them.md";
  slug: "understanding-air-filter-sizing-common-mistakes-and-how-to-avoid-them";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"understanding-cadr-ratings-what-they-mean-for-air-purifier-performance.md": {
	id: "understanding-cadr-ratings-what-they-mean-for-air-purifier-performance.md";
  slug: "understanding-cadr-ratings-what-they-mean-for-air-purifier-performance";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"understanding-merv-ratings-what-do-the-numbers-really-mean.md": {
	id: "understanding-merv-ratings-what-do-the-numbers-really-mean.md";
  slug: "understanding-merv-ratings-what-do-the-numbers-really-mean";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"understanding-pressure-drop-why-it-matters-for-your-air-filter.md": {
	id: "understanding-pressure-drop-why-it-matters-for-your-air-filter.md";
  slug: "understanding-pressure-drop-why-it-matters-for-your-air-filter";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"understanding-the-difference-between-hvac-filters-and-air-purifiers.md": {
	id: "understanding-the-difference-between-hvac-filters-and-air-purifiers.md";
  slug: "understanding-the-difference-between-hvac-filters-and-air-purifiers";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"understanding-the-lifespan-of-different-air-filter-types.md": {
	id: "understanding-the-lifespan-of-different-air-filter-types.md";
  slug: "understanding-the-lifespan-of-different-air-filter-types";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"understanding-the-link-between-air-filters-and-energy-bills.md": {
	id: "understanding-the-link-between-air-filters-and-energy-bills.md";
  slug: "understanding-the-link-between-air-filters-and-energy-bills";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"understanding-the-relationship-between-humidity-and-air-filter-performance.md": {
	id: "understanding-the-relationship-between-humidity-and-air-filter-performance.md";
  slug: "understanding-the-relationship-between-humidity-and-air-filter-performance";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"understanding-the-role-of-air-filters-in-smart-home-ecosystems.md": {
	id: "understanding-the-role-of-air-filters-in-smart-home-ecosystems.md";
  slug: "understanding-the-role-of-air-filters-in-smart-home-ecosystems";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"when-to-call-a-professional-air-filter-issues-you-can-t-ignore.md": {
	id: "when-to-call-a-professional-air-filter-issues-you-can-t-ignore.md";
  slug: "when-to-call-a-professional-air-filter-issues-you-can-t-ignore";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"when-to-upgrade-your-air-filter-signs-it-s-time-for-a-change.md": {
	id: "when-to-upgrade-your-air-filter-signs-it-s-time-for-a-change.md";
  slug: "when-to-upgrade-your-air-filter-signs-it-s-time-for-a-change";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"why-high-merv-ratings-aren-t-always-better-a-balanced-perspective.md": {
	id: "why-high-merv-ratings-aren-t-always-better-a-balanced-perspective.md";
  slug: "why-high-merv-ratings-aren-t-always-better-a-balanced-perspective";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"why-merv-matters-protecting-your-family-from-airborne-pollutants.md": {
	id: "why-merv-matters-protecting-your-family-from-airborne-pollutants.md";
  slug: "why-merv-matters-protecting-your-family-from-airborne-pollutants";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"your-guide-to-air-filter-materials-from-fiberglass-to-synthetic.md": {
	id: "your-guide-to-air-filter-materials-from-fiberglass-to-synthetic.md";
  slug: "your-guide-to-air-filter-materials-from-fiberglass-to-synthetic";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
};
"authors": {
"dana-wolff.md": {
	id: "dana-wolff.md";
  slug: "dana-wolff";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"eli-rowe.md": {
	id: "eli-rowe.md";
  slug: "eli-rowe";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"jordan-reed-filtercycle.md": {
	id: "jordan-reed-filtercycle.md";
  slug: "jordan-reed-filtercycle";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"jordan-reed.md": {
	id: "jordan-reed.md";
  slug: "jordan-reed";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"marcus-chen.md": {
	id: "marcus-chen.md";
  slug: "marcus-chen";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"nate-brennan.md": {
	id: "nate-brennan.md";
  slug: "nate-brennan";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"rosa-linden.md": {
	id: "rosa-linden.md";
  slug: "rosa-linden";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
};
"pillars": {
"bottled-water-vs-filter-pitcher-economics.md": {
	id: "bottled-water-vs-filter-pitcher-economics.md";
  slug: "bottled-water-vs-filter-pitcher-economics";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
"consumable-price-traps-printer-ink-razors-keurig.md": {
	id: "consumable-price-traps-printer-ink-razors-keurig.md";
  slug: "consumable-price-traps-printer-ink-razors-keurig";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
"grocery-staples-unit-price-watch-guide.md": {
	id: "grocery-staples-unit-price-watch-guide.md";
  slug: "grocery-staples-unit-price-watch-guide";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
"household-refill-buying-guide.md": {
	id: "household-refill-buying-guide.md";
  slug: "household-refill-buying-guide";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
"laundry-detergent-cost-per-load-guide.md": {
	id: "laundry-detergent-cost-per-load-guide.md";
  slug: "laundry-detergent-cost-per-load-guide";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
"merv-guide.md": {
	id: "merv-guide.md";
  slug: "merv-guide";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
"pet-food-bulk-pricing-playbook.md": {
	id: "pet-food-bulk-pricing-playbook.md";
  slug: "pet-food-bulk-pricing-playbook";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
"razor-blade-subscription-escape-guide.md": {
	id: "razor-blade-subscription-escape-guide.md";
  slug: "razor-blade-subscription-escape-guide";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
"replacement-calendar.md": {
	id: "replacement-calendar.md";
  slug: "replacement-calendar";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
"shrinkflation-spotter-checklist.md": {
	id: "shrinkflation-spotter-checklist.md";
  slug: "shrinkflation-spotter-checklist";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
"subscription-price-creep-how-to-fight-back.md": {
	id: "subscription-price-creep-how-to-fight-back.md";
  slug: "subscription-price-creep-how-to-fight-back";
  body: string;
  collection: "pillars";
  data: InferEntrySchema<"pillars">
} & { render(): Render[".md"] };
};
"products": {
"b0002ynf8k-filtrete-merv-13-allergen.md": {
	id: "b0002ynf8k-filtrete-merv-13-allergen.md";
  slug: "b0002ynf8k-filtrete-merv-13-allergen";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00063rwt8-b00063rwt8.md": {
	id: "b00063rwt8-b00063rwt8.md";
  slug: "b00063rwt8-b00063rwt8";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00063rwt8-lodge-seasoned-cast-iron-skillet-6-5-inches-pfas-free-non-to.md": {
	id: "b00063rwt8-lodge-seasoned-cast-iron-skillet-6-5-inches-pfas-free-non-to.md";
  slug: "b00063rwt8-lodge-seasoned-cast-iron-skillet-6-5-inches-pfas-free-non-to";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b000h0xfcs-b000h0xfcs.md": {
	id: "b000h0xfcs-b000h0xfcs.md";
  slug: "b000h0xfcs-b000h0xfcs";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b000h0xfcs-eva-dry-wireless-mini-dehumidifier-white-e-333.md": {
	id: "b000h0xfcs-eva-dry-wireless-mini-dehumidifier-white-e-333.md";
  slug: "b000h0xfcs-eva-dry-wireless-mini-dehumidifier-white-e-333";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b000n3bbw0-b000n3bbw0.md": {
	id: "b000n3bbw0-b000n3bbw0.md";
  slug: "b000n3bbw0-b000n3bbw0";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b000nl0t1k-b000nl0t1k.md": {
	id: "b000nl0t1k-b000nl0t1k.md";
  slug: "b000nl0t1k-b000nl0t1k";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b000vkgrf0-b000vkgrf0.md": {
	id: "b000vkgrf0-b000vkgrf0.md";
  slug: "b000vkgrf0-b000vkgrf0";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b000w7v2yc-ge-mwf-fridge-filter.md": {
	id: "b000w7v2yc-ge-mwf-fridge-filter.md";
  slug: "b000w7v2yc-ge-mwf-fridge-filter";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b000wkwmws-dawn-ultra-dish-soap-75oz-2-pack.md": {
	id: "b000wkwmws-dawn-ultra-dish-soap-75oz-2-pack.md";
  slug: "b000wkwmws-dawn-ultra-dish-soap-75oz-2-pack";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b0014d3n0q-b0014d3n0q.md": {
	id: "b0014d3n0q-b0014d3n0q.md";
  slug: "b0014d3n0q-b0014d3n0q";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b0014d3n0q-downy-fabric-softener-dryer-sheets-april-fresh-120-count.md": {
	id: "b0014d3n0q-downy-fabric-softener-dryer-sheets-april-fresh-120-count.md";
  slug: "b0014d3n0q-downy-fabric-softener-dryer-sheets-april-fresh-120-count";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b001e10b9i-b001e10b9i.md": {
	id: "b001e10b9i-b001e10b9i.md";
  slug: "b001e10b9i-b001e10b9i";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b001eq4g0o-b001eq4g0o.md": {
	id: "b001eq4g0o-b001eq4g0o.md";
  slug: "b001eq4g0o-b001eq4g0o";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b001eq4g0o-stuart-weitzman-women-s-metro-slingback-sandal-palomino-llam.md": {
	id: "b001eq4g0o-stuart-weitzman-women-s-metro-slingback-sandal-palomino-llam.md";
  slug: "b001eq4g0o-stuart-weitzman-women-s-metro-slingback-sandal-palomino-llam";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b001et73j2-b001et73j2.md": {
	id: "b001et73j2-b001et73j2.md";
  slug: "b001et73j2-b001et73j2";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b001et76h8-b001et76h8.md": {
	id: "b001et76h8-b001et76h8.md";
  slug: "b001et76h8-b001et76h8";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b001qy8qxm-astra-platinum-double-edge-safety-razor-blades-100-blades-20.md": {
	id: "b001qy8qxm-astra-platinum-double-edge-safety-razor-blades-100-blades-20.md";
  slug: "b001qy8qxm-astra-platinum-double-edge-safety-razor-blades-100-blades-20";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b001qy8qxm-b001qy8qxm.md": {
	id: "b001qy8qxm-b001qy8qxm.md";
  slug: "b001qy8qxm-b001qy8qxm";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b002bwq6xk-b002bwq6xk.md": {
	id: "b002bwq6xk-b002bwq6xk.md";
  slug: "b002bwq6xk-b002bwq6xk";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b002r5af1i-b002r5af1i.md": {
	id: "b002r5af1i-b002r5af1i.md";
  slug: "b002r5af1i-b002r5af1i";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b004qm8slg-b004qm8slg.md": {
	id: "b004qm8slg-b004qm8slg.md";
  slug: "b004qm8slg-b004qm8slg";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b004qm8slg-lodge-cast-iron-set-5-piece-set-pre-seasoned-kitchen-set-ski.md": {
	id: "b004qm8slg-lodge-cast-iron-set-5-piece-set-pre-seasoned-kitchen-set-ski.md";
  slug: "b004qm8slg-lodge-cast-iron-set-5-piece-set-pre-seasoned-kitchen-set-ski";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00762ahte-b00762ahte.md": {
	id: "b00762ahte-b00762ahte.md";
  slug: "b00762ahte-b00762ahte";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00762ahte-hakko-t18s3p-tip-for-fx-888-station-5-2mm.md": {
	id: "b00762ahte-hakko-t18s3p-tip-for-fx-888-station-5-2mm.md";
  slug: "b00762ahte-hakko-t18s3p-tip-for-fx-888-station-5-2mm";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00b5joc5c-b00b5joc5c.md": {
	id: "b00b5joc5c-b00b5joc5c.md";
  slug: "b00b5joc5c-b00b5joc5c";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00c2o7c7o-scott-1000-toilet-paper-36-rolls.md": {
	id: "b00c2o7c7o-scott-1000-toilet-paper-36-rolls.md";
  slug: "b00c2o7c7o-scott-1000-toilet-paper-36-rolls";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00cazau62-b00cazau62.md": {
	id: "b00cazau62-b00cazau62.md";
  slug: "b00cazau62-b00cazau62";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00cazau62-dr-tobias-omega-3-fish-oil-2000mg-triple-strength-with-800mg.md": {
	id: "b00cazau62-dr-tobias-omega-3-fish-oil-2000mg-triple-strength-with-800mg.md";
  slug: "b00cazau62-dr-tobias-omega-3-fish-oil-2000mg-triple-strength-with-800mg";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00dkflp4g-filtrete-16x25-merv-11.md": {
	id: "b00dkflp4g-filtrete-16x25-merv-11.md";
  slug: "b00dkflp4g-filtrete-16x25-merv-11";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00ffj0r1q-b00ffj0r1q.md": {
	id: "b00ffj0r1q-b00ffj0r1q.md";
  slug: "b00ffj0r1q-b00ffj0r1q";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00hhqx0bq-folgers-classic-roast-coffee-48oz.md": {
	id: "b00hhqx0bq-folgers-classic-roast-coffee-48oz.md";
  slug: "b00hhqx0bq-folgers-classic-roast-coffee-48oz";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00nq1clti-b00nq1clti.md": {
	id: "b00nq1clti-b00nq1clti.md";
  slug: "b00nq1clti-b00nq1clti";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00nq1clti-brother-hl-l2300d-monochrome-laser-printer-with-duplex-print.md": {
	id: "b00nq1clti-brother-hl-l2300d-monochrome-laser-printer-with-duplex-print.md";
  slug: "b00nq1clti-brother-hl-l2300d-monochrome-laser-printer-with-duplex-print";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00pb6f2v4-b00pb6f2v4.md": {
	id: "b00pb6f2v4-b00pb6f2v4.md";
  slug: "b00pb6f2v4-b00pb6f2v4";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00sayakpk-b00sayakpk.md": {
	id: "b00sayakpk-b00sayakpk.md";
  slug: "b00sayakpk-b00sayakpk";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00wsaxbq0-b00wsaxbq0.md": {
	id: "b00wsaxbq0-b00wsaxbq0.md";
  slug: "b00wsaxbq0-b00wsaxbq0";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b00wsaxbq0-hq-replacement-soldering-iron-for-hakko-fx-8801-fx-888d-stat.md": {
	id: "b00wsaxbq0-hq-replacement-soldering-iron-for-hakko-fx-8801-fx-888d-stat.md";
  slug: "b00wsaxbq0-hq-replacement-soldering-iron-for-hakko-fx-8801-fx-888d-stat";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b01n4iwh2o-b01n4iwh2o.md": {
	id: "b01n4iwh2o-b01n4iwh2o.md";
  slug: "b01n4iwh2o-b01n4iwh2o";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b01n4nlzjn-b01n4nlzjn.md": {
	id: "b01n4nlzjn-b01n4nlzjn.md";
  slug: "b01n4nlzjn-b01n4nlzjn";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b01n4qak9o-b01n4qak9o.md": {
	id: "b01n4qak9o-b01n4qak9o.md";
  slug: "b01n4qak9o-b01n4qak9o";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b01n5ib20q-amazon-basics-aa-batteries-48-pack.md": {
	id: "b01n5ib20q-amazon-basics-aa-batteries-48-pack.md";
  slug: "b01n5ib20q-amazon-basics-aa-batteries-48-pack";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b01n5q9q6j-b01n5q9q6j.md": {
	id: "b01n5q9q6j-b01n5q9q6j.md";
  slug: "b01n5q9q6j-b01n5q9q6j";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b01n7v39qj-b01n7v39qj.md": {
	id: "b01n7v39qj-b01n7v39qj.md";
  slug: "b01n7v39qj-b01n7v39qj";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b01n7v39uo-b01n7v39uo.md": {
	id: "b01n7v39uo-b01n7v39uo.md";
  slug: "b01n7v39uo-b01n7v39uo";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b073q8p6cq-amazon-basics-pre-seasoned-cast-iron-skillet-oven-safe-even.md": {
	id: "b073q8p6cq-amazon-basics-pre-seasoned-cast-iron-skillet-oven-safe-even.md";
  slug: "b073q8p6cq-amazon-basics-pre-seasoned-cast-iron-skillet-oven-safe-even-";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b073q8p6cq-b073q8p6cq.md": {
	id: "b073q8p6cq-b073q8p6cq.md";
  slug: "b073q8p6cq-b073q8p6cq";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b074nd5rdt-b074nd5rdt.md": {
	id: "b074nd5rdt-b074nd5rdt.md";
  slug: "b074nd5rdt-b074nd5rdt";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b074nd5rdt-backcountry-iron-12-inch-round-large-pre-seasoned-cast-iron.md": {
	id: "b074nd5rdt-backcountry-iron-12-inch-round-large-pre-seasoned-cast-iron.md";
  slug: "b074nd5rdt-backcountry-iron-12-inch-round-large-pre-seasoned-cast-iron-";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07c11yw88-b07c11yw88.md": {
	id: "b07c11yw88-b07c11yw88.md";
  slug: "b07c11yw88-b07c11yw88";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07c11yw88-inkowl-compatible-ink-cartridge-replacement-for-roland-eco-s.md": {
	id: "b07c11yw88-inkowl-compatible-ink-cartridge-replacement-for-roland-eco-s.md";
  slug: "b07c11yw88-inkowl-compatible-ink-cartridge-replacement-for-roland-eco-s";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07d5dn269-b07d5dn269.md": {
	id: "b07d5dn269-b07d5dn269.md";
  slug: "b07d5dn269-b07d5dn269";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07d5dn269-niagara-sleep-solution-ultra-soft-queen-size-mattress-topper.md": {
	id: "b07d5dn269-niagara-sleep-solution-ultra-soft-queen-size-mattress-topper.md";
  slug: "b07d5dn269-niagara-sleep-solution-ultra-soft-queen-size-mattress-topper";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07f97mpyt-b07f97mpyt.md": {
	id: "b07f97mpyt-b07f97mpyt.md";
  slug: "b07f97mpyt-b07f97mpyt";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07f97mpyt-extra-deep-queen-sheet-set-6-piece-breathable-and-cooling-sh.md": {
	id: "b07f97mpyt-extra-deep-queen-sheet-set-6-piece-breathable-and-cooling-sh.md";
  slug: "b07f97mpyt-extra-deep-queen-sheet-set-6-piece-breathable-and-cooling-sh";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07g82d89g-b07g82d89g.md": {
	id: "b07g82d89g-b07g82d89g.md";
  slug: "b07g82d89g-b07g82d89g";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07g82d89g-under-armour-women-s-ua-charged-assert-8-running-shoes-12-bl.md": {
	id: "b07g82d89g-under-armour-women-s-ua-charged-assert-8-running-shoes-12-bl.md";
  slug: "b07g82d89g-under-armour-women-s-ua-charged-assert-8-running-shoes-12-bl";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07j2p2v7t-b07j2p2v7t.md": {
	id: "b07j2p2v7t-b07j2p2v7t.md";
  slug: "b07j2p2v7t-b07j2p2v7t";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07j2p2v7t-utopia-bedding-bed-pillows-for-sleeping-queen-size-blue-set.md": {
	id: "b07j2p2v7t-utopia-bedding-bed-pillows-for-sleeping-queen-size-blue-set.md";
  slug: "b07j2p2v7t-utopia-bedding-bed-pillows-for-sleeping-queen-size-blue-set-";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07p5bnqjg-b07p5bnqjg.md": {
	id: "b07p5bnqjg-b07p5bnqjg.md";
  slug: "b07p5bnqjg-b07p5bnqjg";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07p5y5qhg-b07p5y5qhg.md": {
	id: "b07p5y5qhg-b07p5y5qhg.md";
  slug: "b07p5y5qhg-b07p5y5qhg";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07q5j5xjl-b07q5j5xjl.md": {
	id: "b07q5j5xjl-b07q5j5xjl.md";
  slug: "b07q5j5xjl-b07q5j5xjl";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07q5j5yxv-b07q5j5yxv.md": {
	id: "b07q5j5yxv-b07q5j5yxv.md";
  slug: "b07q5j5yxv-b07q5j5yxv";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07qr6z1jb-tide-pods-laundry-detergent-112-count.md": {
	id: "b07qr6z1jb-tide-pods-laundry-detergent-112-count.md";
  slug: "b07qr6z1jb-tide-pods-laundry-detergent-112-count";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07r3n9x3f-b07r3n9x3f.md": {
	id: "b07r3n9x3f-b07r3n9x3f.md";
  slug: "b07r3n9x3f-b07r3n9x3f";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07rvmznyr-yihua-939d-digital-soldering-station-75w-equivalent-with-pre.md": {
	id: "b07rvmznyr-yihua-939d-digital-soldering-station-75w-equivalent-with-pre.md";
  slug: "b07rvmznyr-yihua-939d-digital-soldering-station-75w-equivalent-with-pre";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07vvk39f7-levoit-air-purifier-for-home-allergies-pet-hair-in-bedroom-c.md": {
	id: "b07vvk39f7-levoit-air-purifier-for-home-allergies-pet-hair-in-bedroom-c.md";
  slug: "b07vvk39f7-levoit-air-purifier-for-home-allergies-pet-hair-in-bedroom-c";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07ypr2dgh-b07ypr2dgh.md": {
	id: "b07ypr2dgh-b07ypr2dgh.md";
  slug: "b07ypr2dgh-b07ypr2dgh";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07z6tv9y7-lodge-12-cast-iron-skillet-chef-collection-perfect-sear-ergo.md": {
	id: "b07z6tv9y7-lodge-12-cast-iron-skillet-chef-collection-perfect-sear-ergo.md";
  slug: "b07z6tv9y7-lodge-12-cast-iron-skillet-chef-collection-perfect-sear-ergo";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b07zpsfvx5-b07zpsfvx5.md": {
	id: "b07zpsfvx5-b07zpsfvx5.md";
  slug: "b07zpsfvx5-b07zpsfvx5";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b082y7x9h5-e-z-ink-remanufactured-ink-cartridge-replacement-for-252xl-c.md": {
	id: "b082y7x9h5-e-z-ink-remanufactured-ink-cartridge-replacement-for-252xl-c.md";
  slug: "b082y7x9h5-e-z-ink-remanufactured-ink-cartridge-replacement-for-252xl-c";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b083bfpgd8-toner-kingdom-compatible-toner-cartridge-replacement-for-can.md": {
	id: "b083bfpgd8-toner-kingdom-compatible-toner-cartridge-replacement-for-can.md";
  slug: "b083bfpgd8-toner-kingdom-compatible-toner-cartridge-replacement-for-can";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b085vzpr2y-lodge-blacklock-10-25-triple-seasoned-cast-iron-skillet-ligh.md": {
	id: "b085vzpr2y-lodge-blacklock-10-25-triple-seasoned-cast-iron-skillet-ligh.md";
  slug: "b085vzpr2y-lodge-blacklock-10-25-triple-seasoned-cast-iron-skillet-ligh";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b08b3k9h7l-b08b3k9h7l.md": {
	id: "b08b3k9h7l-b08b3k9h7l.md";
  slug: "b08b3k9h7l-b08b3k9h7l";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b08fy8xq3w-b08fy8xq3w.md": {
	id: "b08fy8xq3w-b08fy8xq3w.md";
  slug: "b08fy8xq3w-b08fy8xq3w";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b08gx3k9ys-lxtek-compatible-toner-cartridge-6510-6515-106r03480-106r034.md": {
	id: "b08gx3k9ys-lxtek-compatible-toner-cartridge-6510-6515-106r03480-106r034.md";
  slug: "b08gx3k9ys-lxtek-compatible-toner-cartridge-6510-6515-106r03480-106r034";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b08k3j4wx6-b08k3j4wx6.md": {
	id: "b08k3j4wx6-b08k3j4wx6.md";
  slug: "b08k3j4wx6-b08k3j4wx6";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b08kdqzjq5-b08kdqzjq5.md": {
	id: "b08kdqzjq5-b08kdqzjq5.md";
  slug: "b08kdqzjq5-b08kdqzjq5";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b08pdhvz4n-b08pdhvz4n.md": {
	id: "b08pdhvz4n-b08pdhvz4n.md";
  slug: "b08pdhvz4n-b08pdhvz4n";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b08pdt1y3h-b08pdt1y3h.md": {
	id: "b08pdt1y3h-b08pdt1y3h.md";
  slug: "b08pdt1y3h-b08pdt1y3h";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b08pzbpxlz-soldering-iron-kit-80w-110v-fast-heat-up-in-10s-lcd-digital.md": {
	id: "b08pzbpxlz-soldering-iron-kit-80w-110v-fast-heat-up-in-10s-lcd-digital.md";
  slug: "b08pzbpxlz-soldering-iron-kit-80w-110v-fast-heat-up-in-10s-lcd-digital-";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b08r3515sf-soldering-iron-kit-80w-110v-lcd-digital-solder-iron-pen-with.md": {
	id: "b08r3515sf-soldering-iron-kit-80w-110v-lcd-digital-solder-iron-pen-with.md";
  slug: "b08r3515sf-soldering-iron-kit-80w-110v-lcd-digital-solder-iron-pen-with";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b08r3r5kxj-b08r3r5kxj.md": {
	id: "b08r3r5kxj-b08r3r5kxj.md";
  slug: "b08r3r5kxj-b08r3r5kxj";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b093tcyf9t-cuisinel-cast-iron-skillet-with-lid-12-inch-pre-seasoned-cov.md": {
	id: "b093tcyf9t-cuisinel-cast-iron-skillet-with-lid-12-inch-pre-seasoned-cov.md";
  slug: "b093tcyf9t-cuisinel-cast-iron-skillet-with-lid-12-inch-pre-seasoned-cov";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b098jd8hd3-soldering-kit-60w-soldering-iron-110v-welding-kit-with-ceram.md": {
	id: "b098jd8hd3-soldering-kit-60w-soldering-iron-110v-welding-kit-with-ceram.md";
  slug: "b098jd8hd3-soldering-kit-60w-soldering-iron-110v-welding-kit-with-ceram";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b09dv14zzl-b09dv14zzl.md": {
	id: "b09dv14zzl-b09dv14zzl.md";
  slug: "b09dv14zzl-b09dv14zzl";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b09dy7ccw5-60w-adjustable-temperature-soldering-iron-kit-9-in-1-with-5.md": {
	id: "b09dy7ccw5-60w-adjustable-temperature-soldering-iron-kit-9-in-1-with-5.md";
  slug: "b09dy7ccw5-60w-adjustable-temperature-soldering-iron-kit-9-in-1-with-5-";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b09txp1kdv-wep-927-iv-soldering-station-kit-high-power-110w-with-3-pres.md": {
	id: "b09txp1kdv-wep-927-iv-soldering-station-kit-high-power-110w-with-3-pres.md";
  slug: "b09txp1kdv-wep-927-iv-soldering-station-kit-high-power-110w-with-3-pres";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b09vxq221k-soldering-iron-kit-60w-adjustable-temperature-digital-multim.md": {
	id: "b09vxq221k-soldering-iron-kit-60w-adjustable-temperature-digital-multim.md";
  slug: "b09vxq221k-soldering-iron-kit-60w-adjustable-temperature-digital-multim";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b09w9mf63y-ecodot-552-pigment-ink-refill-ink-bottle-replacement-for-eps.md": {
	id: "b09w9mf63y-ecodot-552-pigment-ink-refill-ink-bottle-replacement-for-eps.md";
  slug: "b09w9mf63y-ecodot-552-pigment-ink-refill-ink-bottle-replacement-for-eps";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b09wdbhxb3-b09wdbhxb3.md": {
	id: "b09wdbhxb3-b09wdbhxb3.md";
  slug: "b09wdbhxb3-b09wdbhxb3";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b0b2rm68g2-biodance-bio-collagen-real-deep-mask-hydrating-overnight-hyd.md": {
	id: "b0b2rm68g2-biodance-bio-collagen-real-deep-mask-hydrating-overnight-hyd.md";
  slug: "b0b2rm68g2-biodance-bio-collagen-real-deep-mask-hydrating-overnight-hyd";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b0b7mkrr58-b0b7mkrr58.md": {
	id: "b0b7mkrr58-b0b7mkrr58.md";
  slug: "b0b7mkrr58-b0b7mkrr58";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b0bvybvhk5-280xxl-281xxl-ink-for-canon-ink-280-281-replacement-for-cano.md": {
	id: "b0bvybvhk5-280xxl-281xxl-ink-for-canon-ink-280-281-replacement-for-cano.md";
  slug: "b0bvybvhk5-280xxl-281xxl-ink-for-canon-ink-280-281-replacement-for-cano";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b0bx2n258s-wep-926led-v3-soldering-station-130w-max-soldering-iron-kit.md": {
	id: "b0bx2n258s-wep-926led-v3-soldering-station-130w-max-soldering-iron-kit.md";
  slug: "b0bx2n258s-wep-926led-v3-soldering-station-130w-max-soldering-iron-kit-";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b0cb75lml9-stargazer-10-5-inch-cast-iron-skillet-made-in-usa-seasoned-p.md": {
	id: "b0cb75lml9-stargazer-10-5-inch-cast-iron-skillet-made-in-usa-seasoned-p.md";
  slug: "b0cb75lml9-stargazer-10-5-inch-cast-iron-skillet-made-in-usa-seasoned-p";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b0cgw2tfsv-field-company-mini-cast-iron-skillet-extra-small-6-75-inch-o.md": {
	id: "b0cgw2tfsv-field-company-mini-cast-iron-skillet-extra-small-6-75-inch-o.md";
  slug: "b0cgw2tfsv-field-company-mini-cast-iron-skillet-extra-small-6-75-inch-o";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b0cgw48c3g-field-company-small-cast-iron-skillet-8-38-inch-pre-seasoned.md": {
	id: "b0cgw48c3g-field-company-small-cast-iron-skillet-8-38-inch-pre-seasoned.md";
  slug: "b0cgw48c3g-field-company-small-cast-iron-skillet-8-38-inch-pre-seasoned";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b0cyjv9x52-inkowl-compatible-ink-cartridge-replacement-for-roland-eco-s.md": {
	id: "b0cyjv9x52-inkowl-compatible-ink-cartridge-replacement-for-roland-eco-s.md";
  slug: "b0cyjv9x52-inkowl-compatible-ink-cartridge-replacement-for-roland-eco-s";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b0d41zmdpd-fanttik-t1-max-soldering-iron-kit-cordless-soldering-iron-7.md": {
	id: "b0d41zmdpd-fanttik-t1-max-soldering-iron-kit-cordless-soldering-iron-7.md";
  slug: "b0d41zmdpd-fanttik-t1-max-soldering-iron-kit-cordless-soldering-iron-7-";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b0d92pvdqh-soldering-iron-kit-60w-led-display-digital-solder-pen-5-repl.md": {
	id: "b0d92pvdqh-soldering-iron-kit-60w-led-display-digital-solder-pen-5-repl.md";
  slug: "b0d92pvdqh-soldering-iron-kit-60w-led-display-digital-solder-pen-5-repl";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
