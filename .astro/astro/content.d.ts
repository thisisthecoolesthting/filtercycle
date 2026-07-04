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
"amazon-prime-subscription-cost-increase.md": {
	id: "amazon-prime-subscription-cost-increase.md";
  slug: "amazon-prime-subscription-cost-increase";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"amazon-prime-subscription-increase-analysis.md": {
	id: "amazon-prime-subscription-increase-analysis.md";
  slug: "amazon-prime-subscription-increase-analysis";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-body-lotions-without-plastic-pump-bottles.md": {
	id: "best-refillable-body-lotions-without-plastic-pump-bottles.md";
  slug: "best-refillable-body-lotions-without-plastic-pump-bottles";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-cleaning-products-for-hard-water-areas.md": {
	id: "best-refillable-cleaning-products-for-hard-water-areas.md";
  slug: "best-refillable-cleaning-products-for-hard-water-areas";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-cleaning-products-for-pet-owners.md": {
	id: "best-refillable-cleaning-products-for-pet-owners.md";
  slug: "best-refillable-cleaning-products-for-pet-owners";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-cleaning-tools-for-plastic-reduction-at-home.md": {
	id: "best-refillable-cleaning-tools-for-plastic-reduction-at-home.md";
  slug: "best-refillable-cleaning-tools-for-plastic-reduction-at-home";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-conditioner-options-for-curly-hair-types.md": {
	id: "best-refillable-conditioner-options-for-curly-hair-types.md";
  slug: "best-refillable-conditioner-options-for-curly-hair-types";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-deodorant-brands-for-sensitive-skin-reviewed.md": {
	id: "best-refillable-deodorant-brands-for-sensitive-skin-reviewed.md";
  slug: "best-refillable-deodorant-brands-for-sensitive-skin-reviewed";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-dish-soap-brands-for-zero-waste-kitchens.md": {
	id: "best-refillable-dish-soap-brands-for-zero-waste-kitchens.md";
  slug: "best-refillable-dish-soap-brands-for-zero-waste-kitchens";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-dishwashing-liquid-options-for-eco-friendly-kitchens.md": {
	id: "best-refillable-dishwashing-liquid-options-for-eco-friendly-kitchens.md";
  slug: "best-refillable-dishwashing-liquid-options-for-eco-friendly-kitchens";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-fabric-softener-options-without-plastic-bottles.md": {
	id: "best-refillable-fabric-softener-options-without-plastic-bottles.md";
  slug: "best-refillable-fabric-softener-options-without-plastic-bottles";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-face-washes-for-oily-and-dry-skin-types.md": {
	id: "best-refillable-face-washes-for-oily-and-dry-skin-types.md";
  slug: "best-refillable-face-washes-for-oily-and-dry-skin-types";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-glass-spray-bottles-for-homemade-cleaners.md": {
	id: "best-refillable-glass-spray-bottles-for-homemade-cleaners.md";
  slug: "best-refillable-glass-spray-bottles-for-homemade-cleaners";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-household-cleaners-for-sensitive-skin-types.md": {
	id: "best-refillable-household-cleaners-for-sensitive-skin-types.md";
  slug: "best-refillable-household-cleaners-for-sensitive-skin-types";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-household-products-for-allergy-friendly-cleaning.md": {
	id: "best-refillable-household-products-for-allergy-friendly-cleaning.md";
  slug: "best-refillable-household-products-for-allergy-friendly-cleaning";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-shampoo-bars-compared-to-liquid-refills.md": {
	id: "best-refillable-shampoo-bars-compared-to-liquid-refills.md";
  slug: "best-refillable-shampoo-bars-compared-to-liquid-refills";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-sunscreens-for-eco-conscious-consumers.md": {
	id: "best-refillable-sunscreens-for-eco-conscious-consumers.md";
  slug: "best-refillable-sunscreens-for-eco-conscious-consumers";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-toothbrushes-for-plastic-reduction-goals.md": {
	id: "best-refillable-toothbrushes-for-plastic-reduction-goals.md";
  slug: "best-refillable-toothbrushes-for-plastic-reduction-goals";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-refillable-toothpaste-tablets-for-travel-and-plastic-reduction.md": {
	id: "best-refillable-toothpaste-tablets-for-travel-and-plastic-reduction.md";
  slug: "best-refillable-toothpaste-tablets-for-travel-and-plastic-reduction";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"best-reusable-water-bottles-for-savings.md": {
	id: "best-reusable-water-bottles-for-savings.md";
  slug: "best-reusable-water-bottles-for-savings";
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
"best-reusable-water-bottles-to-save-money.md": {
	id: "best-reusable-water-bottles-to-save-money.md";
  slug: "best-reusable-water-bottles-to-save-money";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"brand-comparison-refillable-vs-disposable-cleaning-product-effectiveness.md": {
	id: "brand-comparison-refillable-vs-disposable-cleaning-product-effectiveness.md";
  slug: "brand-comparison-refillable-vs-disposable-cleaning-product-effectiveness";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"bulk-cleaning-supplies-guide.md": {
	id: "bulk-cleaning-supplies-guide.md";
  slug: "bulk-cleaning-supplies-guide";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"bulk-laundry-detergent-guide.md": {
	id: "bulk-laundry-detergent-guide.md";
  slug: "bulk-laundry-detergent-guide";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"bulk-pet-food-savings-guide.md": {
	id: "bulk-pet-food-savings-guide.md";
  slug: "bulk-pet-food-savings-guide";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"cancel-unnecessary-subscriptions.md": {
	id: "cancel-unnecessary-subscriptions.md";
  slug: "cancel-unnecessary-subscriptions";
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
"cancel-unwanted-subscriptions-save-money.md": {
	id: "cancel-unwanted-subscriptions-save-money.md";
  slug: "cancel-unwanted-subscriptions-save-money";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"cheaper-laundry-detergent-alternatives.md": {
	id: "cheaper-laundry-detergent-alternatives.md";
  slug: "cheaper-laundry-detergent-alternatives";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"coffee-bean-price-watch-2024.md": {
	id: "coffee-bean-price-watch-2024.md";
  slug: "coffee-bean-price-watch-2024";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"comparing-best-refillable-personal-care-brands-for-plastic-reduction.md": {
	id: "comparing-best-refillable-personal-care-brands-for-plastic-reduction.md";
  slug: "comparing-best-refillable-personal-care-brands-for-plastic-reduction";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"comparing-plastic-reduction-efforts-across-leading-refillable-brands.md": {
	id: "comparing-plastic-reduction-efforts-across-leading-refillable-brands.md";
  slug: "comparing-plastic-reduction-efforts-across-leading-refillable-brands";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"concentrated-detergents-vs-traditional-environmental-impact-reviewed.md": {
	id: "concentrated-detergents-vs-traditional-environmental-impact-reviewed.md";
  slug: "concentrated-detergents-vs-traditional-environmental-impact-reviewed";
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
"detergent-dilemma-price-watch.md": {
	id: "detergent-dilemma-price-watch.md";
  slug: "detergent-dilemma-price-watch";
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
"detergent-inflation-alert.md": {
	id: "detergent-inflation-alert.md";
  slug: "detergent-inflation-alert";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"detergent-price-creep-how-to-fight-back.md": {
	id: "detergent-price-creep-how-to-fight-back.md";
  slug: "detergent-price-creep-how-to-fight-back";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"detergent-price-creep-target-vs-costco.md": {
	id: "detergent-price-creep-target-vs-costco.md";
  slug: "detergent-price-creep-target-vs-costco";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"diy-cleaning-supplies-bulk-refill-guide.md": {
	id: "diy-cleaning-supplies-bulk-refill-guide.md";
  slug: "diy-cleaning-supplies-bulk-refill-guide";
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
"diy-cleaning-supplies-save-money.md": {
	id: "diy-cleaning-supplies-save-money.md";
  slug: "diy-cleaning-supplies-save-money";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"diy-laundry-detergent-refills.md": {
	id: "diy-laundry-detergent-refills.md";
  slug: "diy-laundry-detergent-refills";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"eco-friendly-concentrates-saving-space-and-reducing-plastic-packaging.md": {
	id: "eco-friendly-concentrates-saving-space-and-reducing-plastic-packaging.md";
  slug: "eco-friendly-concentrates-saving-space-and-reducing-plastic-packaging";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"eco-friendly-laundry-refills-worth-it.md": {
	id: "eco-friendly-laundry-refills-worth-it.md";
  slug: "eco-friendly-laundry-refills-worth-it";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"eco-friendly-laundry-refills.md": {
	id: "eco-friendly-laundry-refills.md";
  slug: "eco-friendly-laundry-refills";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"filter-subscription-vs-bulk.md": {
	id: "filter-subscription-vs-bulk.md";
  slug: "filter-subscription-vs-bulk";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"food-staples-price-tracking-apps.md": {
	id: "food-staples-price-tracking-apps.md";
  slug: "food-staples-price-tracking-apps";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"food-staples-price-watch-inflation.md": {
	id: "food-staples-price-watch-inflation.md";
  slug: "food-staples-price-watch-inflation";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-concentrated-cleaning-products-help-cut-plastic-waste-effectively.md": {
	id: "how-concentrated-cleaning-products-help-cut-plastic-waste-effectively.md";
  slug: "how-concentrated-cleaning-products-help-cut-plastic-waste-effectively";
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
"how-to-choose-refillable-deodorants-that-actually-work.md": {
	id: "how-to-choose-refillable-deodorants-that-actually-work.md";
  slug: "how-to-choose-refillable-deodorants-that-actually-work";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-choose-refillable-products-for-zero-waste-families.md": {
	id: "how-to-choose-refillable-products-for-zero-waste-families.md";
  slug: "how-to-choose-refillable-products-for-zero-waste-families";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-identify-truly-plastic-free-refillable-product-packaging.md": {
	id: "how-to-identify-truly-plastic-free-refillable-product-packaging.md";
  slug: "how-to-identify-truly-plastic-free-refillable-product-packaging";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-make-your-own-refillable-air-freshener-at-home.md": {
	id: "how-to-make-your-own-refillable-air-freshener-at-home.md";
  slug: "how-to-make-your-own-refillable-air-freshener-at-home";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-make-your-own-refillable-hand-soap-without-harsh-chemicals.md": {
	id: "how-to-make-your-own-refillable-hand-soap-without-harsh-chemicals.md";
  slug: "how-to-make-your-own-refillable-hand-soap-without-harsh-chemicals";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-make-your-own-refillable-laundry-detergent-at-home.md": {
	id: "how-to-make-your-own-refillable-laundry-detergent-at-home.md";
  slug: "how-to-make-your-own-refillable-laundry-detergent-at-home";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-make-zero-waste-cleaning-products-from-kitchen-ingredients.md": {
	id: "how-to-make-zero-waste-cleaning-products-from-kitchen-ingredients.md";
  slug: "how-to-make-zero-waste-cleaning-products-from-kitchen-ingredients";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-properly-clean-refillable-containers-to-avoid-mold.md": {
	id: "how-to-properly-clean-refillable-containers-to-avoid-mold.md";
  slug: "how-to-properly-clean-refillable-containers-to-avoid-mold";
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
"how-to-refill-household-products-while-traveling-sustainably.md": {
	id: "how-to-refill-household-products-while-traveling-sustainably.md";
  slug: "how-to-refill-household-products-while-traveling-sustainably";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-refill-laundry-detergent-without-spills-or-waste.md": {
	id: "how-to-refill-laundry-detergent-without-spills-or-waste.md";
  slug: "how-to-refill-laundry-detergent-without-spills-or-waste";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-refill-personal-care-products-without-cross-contamination.md": {
	id: "how-to-refill-personal-care-products-without-cross-contamination.md";
  slug: "how-to-refill-personal-care-products-without-cross-contamination";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-refill-soap-dispensers-without-creating-additional-waste.md": {
	id: "how-to-refill-soap-dispensers-without-creating-additional-waste.md";
  slug: "how-to-refill-soap-dispensers-without-creating-additional-waste";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-refill-your-own-all-purpose-cleaner-safely.md": {
	id: "how-to-refill-your-own-all-purpose-cleaner-safely.md";
  slug: "how-to-refill-your-own-all-purpose-cleaner-safely";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-refill-your-own-bathroom-cleaning-solutions-at-home.md": {
	id: "how-to-refill-your-own-bathroom-cleaning-solutions-at-home.md";
  slug: "how-to-refill-your-own-bathroom-cleaning-solutions-at-home";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-set-up-a-refillable-cleaning-station-in-your-home.md": {
	id: "how-to-set-up-a-refillable-cleaning-station-in-your-home.md";
  slug: "how-to-set-up-a-refillable-cleaning-station-in-your-home";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-start-a-refillable-product-routine-on-a-budget.md": {
	id: "how-to-start-a-refillable-product-routine-on-a-budget.md";
  slug: "how-to-start-a-refillable-product-routine-on-a-budget";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-store-and-use-refillable-products-in-small-apartments.md": {
	id: "how-to-store-and-use-refillable-products-in-small-apartments.md";
  slug: "how-to-store-and-use-refillable-products-in-small-apartments";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-store-refillable-products-to-maximize-shelf-life.md": {
	id: "how-to-store-refillable-products-to-maximize-shelf-life.md";
  slug: "how-to-store-refillable-products-to-maximize-shelf-life";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-transition-to-refillable-personal-care-products-gradually.md": {
	id: "how-to-transition-to-refillable-personal-care-products-gradually.md";
  slug: "how-to-transition-to-refillable-personal-care-products-gradually";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"how-to-transition-to-zero-waste-personal-care-routines-easily.md": {
	id: "how-to-transition-to-zero-waste-personal-care-routines-easily.md";
  slug: "how-to-transition-to-zero-waste-personal-care-routines-easily";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"ink-cartridge-rip-off.md": {
	id: "ink-cartridge-rip-off.md";
  slug: "ink-cartridge-rip-off";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"ink-cartridge-scam-how-to-avoid-overpaying.md": {
	id: "ink-cartridge-scam-how-to-avoid-overpaying.md";
  slug: "ink-cartridge-scam-how-to-avoid-overpaying";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"ink-cartridge-scam-uncovered.md": {
	id: "ink-cartridge-scam-uncovered.md";
  slug: "ink-cartridge-scam-uncovered";
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
"personal-care-brand-showdown-refillable-packaging-vs-conventional.md": {
	id: "personal-care-brand-showdown-refillable-packaging-vs-conventional.md";
  slug: "personal-care-brand-showdown-refillable-packaging-vs-conventional";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"personal-care-refill-options.md": {
	id: "personal-care-refill-options.md";
  slug: "personal-care-refill-options";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"personal-care-refills-eco-friendly-options-for-every-skin-type.md": {
	id: "personal-care-refills-eco-friendly-options-for-every-skin-type.md";
  slug: "personal-care-refills-eco-friendly-options-for-every-skin-type";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"personal-care-refills-which-brands-offer-the-best-value.md": {
	id: "personal-care-refills-which-brands-offer-the-best-value.md";
  slug: "personal-care-refills-which-brands-offer-the-best-value";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"pet-food-inflation-alternatives.md": {
	id: "pet-food-inflation-alternatives.md";
  slug: "pet-food-inflation-alternatives";
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
"pet-food-inflation-tracking.md": {
	id: "pet-food-inflation-tracking.md";
  slug: "pet-food-inflation-tracking";
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
"pet-food-price-hikes-and-cheaper-alternatives.md": {
	id: "pet-food-price-hikes-and-cheaper-alternatives.md";
  slug: "pet-food-price-hikes-and-cheaper-alternatives";
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
"plastic-free-toothpaste-options-compared-tubes-vs-refill-packs.md": {
	id: "plastic-free-toothpaste-options-compared-tubes-vs-refill-packs.md";
  slug: "plastic-free-toothpaste-options-compared-tubes-vs-refill-packs";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"plastic-reduction-strategies-using-concentrated-cleaning-formulas.md": {
	id: "plastic-reduction-strategies-using-concentrated-cleaning-formulas.md";
  slug: "plastic-reduction-strategies-using-concentrated-cleaning-formulas";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"plastic-reduction-wins-refills-that-transform-your-personal-care-routine.md": {
	id: "plastic-reduction-wins-refills-that-transform-your-personal-care-routine.md";
  slug: "plastic-reduction-wins-refills-that-transform-your-personal-care-routine";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"printer-ink-price-gouging-exposed.md": {
	id: "printer-ink-price-gouging-exposed.md";
  slug: "printer-ink-price-gouging-exposed";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"printer-ink-refill-kits-worth-it.md": {
	id: "printer-ink-refill-kits-worth-it.md";
  slug: "printer-ink-refill-kits-worth-it";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"printer-ink-scam-exposed.md": {
	id: "printer-ink-scam-exposed.md";
  slug: "printer-ink-scam-exposed";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"razor-blade-subscription-alternatives.md": {
	id: "razor-blade-subscription-alternatives.md";
  slug: "razor-blade-subscription-alternatives";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"razor-blade-subscription-trap.md": {
	id: "razor-blade-subscription-trap.md";
  slug: "razor-blade-subscription-trap";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillable-household-cleaners-that-deliver-powerful-results.md": {
	id: "refillable-household-cleaners-that-deliver-powerful-results.md";
  slug: "refillable-household-cleaners-that-deliver-powerful-results";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillable-household-products-that-reduce-carbon-footprint-significantly.md": {
	id: "refillable-household-products-that-reduce-carbon-footprint-significantly.md";
  slug: "refillable-household-products-that-reduce-carbon-footprint-significantly";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillable-shampoo-brands-that-actually-reduce-plastic-use.md": {
	id: "refillable-shampoo-brands-that-actually-reduce-plastic-use.md";
  slug: "refillable-shampoo-brands-that-actually-reduce-plastic-use";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillable-shaving-cream-options-for-zero-waste-grooming.md": {
	id: "refillable-shaving-cream-options-for-zero-waste-grooming.md";
  slug: "refillable-shaving-cream-options-for-zero-waste-grooming";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillable-vs-bulk-cleaning-supplies-which-saves-more-plastic.md": {
	id: "refillable-vs-bulk-cleaning-supplies-which-saves-more-plastic.md";
  slug: "refillable-vs-bulk-cleaning-supplies-which-saves-more-plastic";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillable-vs-compostable-packaging-which-is-more-eco-friendly.md": {
	id: "refillable-vs-compostable-packaging-which-is-more-eco-friendly.md";
  slug: "refillable-vs-compostable-packaging-which-is-more-eco-friendly";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillable-vs-concentrated-cleaning-products-what-s-better.md": {
	id: "refillable-vs-concentrated-cleaning-products-what-s-better.md";
  slug: "refillable-vs-concentrated-cleaning-products-what-s-better";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillable-vs-concentrated-vs-powdered-cleaning-products-explained.md": {
	id: "refillable-vs-concentrated-vs-powdered-cleaning-products-explained.md";
  slug: "refillable-vs-concentrated-vs-powdered-cleaning-products-explained";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillable-vs-disposable-cotton-rounds-which-is-more-sustainable.md": {
	id: "refillable-vs-disposable-cotton-rounds-which-is-more-sustainable.md";
  slug: "refillable-vs-disposable-cotton-rounds-which-is-more-sustainable";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillable-vs-disposable-sponges-which-is-more-sustainable.md": {
	id: "refillable-vs-disposable-sponges-which-is-more-sustainable.md";
  slug: "refillable-vs-disposable-sponges-which-is-more-sustainable";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillable-vs-recyclable-packaging-what-consumers-should-know.md": {
	id: "refillable-vs-recyclable-packaging-what-consumers-should-know.md";
  slug: "refillable-vs-recyclable-packaging-what-consumers-should-know";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillable-vs-traditional-cleaning-products-cost-and-environmental-impact.md": {
	id: "refillable-vs-traditional-cleaning-products-cost-and-environmental-impact.md";
  slug: "refillable-vs-traditional-cleaning-products-cost-and-environmental-impact";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-article-01.md": {
	id: "refillwatch-article-01.md";
  slug: "refillwatch-article-01";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-article-02.md": {
	id: "refillwatch-article-02.md";
  slug: "refillwatch-article-02";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-article-03.md": {
	id: "refillwatch-article-03.md";
  slug: "refillwatch-article-03";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-article-04.md": {
	id: "refillwatch-article-04.md";
  slug: "refillwatch-article-04";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-article-05.md": {
	id: "refillwatch-article-05.md";
  slug: "refillwatch-article-05";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-article-06.md": {
	id: "refillwatch-article-06.md";
  slug: "refillwatch-article-06";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-article-07.md": {
	id: "refillwatch-article-07.md";
  slug: "refillwatch-article-07";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-article-08.md": {
	id: "refillwatch-article-08.md";
  slug: "refillwatch-article-08";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-article-09.md": {
	id: "refillwatch-article-09.md";
  slug: "refillwatch-article-09";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-article-10.md": {
	id: "refillwatch-article-10.md";
  slug: "refillwatch-article-10";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-guide-to-plastic-free-cleaning-solutions-at-home.md": {
	id: "refillwatch-guide-to-plastic-free-cleaning-solutions-at-home.md";
  slug: "refillwatch-guide-to-plastic-free-cleaning-solutions-at-home";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-insights-on-choosing-concentrates-for-household-cleaning.md": {
	id: "refillwatch-insights-on-choosing-concentrates-for-household-cleaning.md";
  slug: "refillwatch-insights-on-choosing-concentrates-for-household-cleaning";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-s-best-picks-for-sustainable-household-cleaning-products.md": {
	id: "refillwatch-s-best-picks-for-sustainable-household-cleaning-products.md";
  slug: "refillwatch-s-best-picks-for-sustainable-household-cleaning-products";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"refillwatch-top-refillable-household-products-for-zero-waste-living.md": {
	id: "refillwatch-top-refillable-household-products-for-zero-waste-living.md";
  slug: "refillwatch-top-refillable-household-products-for-zero-waste-living";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"reusable-water-bottles-best-value.md": {
	id: "reusable-water-bottles-best-value.md";
  slug: "reusable-water-bottles-best-value";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"reusable-water-bottles-savings.md": {
	id: "reusable-water-bottles-savings.md";
  slug: "reusable-water-bottles-savings";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"shampoo-bar-vs-liquid-cost-comparison.md": {
	id: "shampoo-bar-vs-liquid-cost-comparison.md";
  slug: "shampoo-bar-vs-liquid-cost-comparison";
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
"streaming-service-price-doubling.md": {
	id: "streaming-service-price-doubling.md";
  slug: "streaming-service-price-doubling";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"streaming-service-price-hikes.md": {
	id: "streaming-service-price-hikes.md";
  slug: "streaming-service-price-hikes";
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
"subscription-service-audit-stop-the-creep.md": {
	id: "subscription-service-audit-stop-the-creep.md";
  slug: "subscription-service-audit-stop-the-creep";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"top-eco-friendly-refillable-shampoo-brands-reviewed.md": {
	id: "top-eco-friendly-refillable-shampoo-brands-reviewed.md";
  slug: "top-eco-friendly-refillable-shampoo-brands-reviewed";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"top-refillable-deodorants-that-are-aluminum-and-plastic-free.md": {
	id: "top-refillable-deodorants-that-are-aluminum-and-plastic-free.md";
  slug: "top-refillable-deodorants-that-are-aluminum-and-plastic-free";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"top-refillable-hand-sanitizers-that-reduce-single-use-plastic.md": {
	id: "top-refillable-hand-sanitizers-that-reduce-single-use-plastic.md";
  slug: "top-refillable-hand-sanitizers-that-reduce-single-use-plastic";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"top-refillable-household-products-that-slash-single-use-plastic-waste.md": {
	id: "top-refillable-household-products-that-slash-single-use-plastic-waste.md";
  slug: "top-refillable-household-products-that-slash-single-use-plastic-waste";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"top-refillable-mouthwash-brands-that-reduce-plastic-use.md": {
	id: "top-refillable-mouthwash-brands-that-reduce-plastic-use.md";
  slug: "top-refillable-mouthwash-brands-that-reduce-plastic-use";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"using-refillable-concentrates-to-maximize-plastic-waste-reduction.md": {
	id: "using-refillable-concentrates-to-maximize-plastic-waste-reduction.md";
  slug: "using-refillable-concentrates-to-maximize-plastic-waste-reduction";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"walmart-water-price-hike-2024.md": {
	id: "walmart-water-price-hike-2024.md";
  slug: "walmart-water-price-hike-2024";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"walmart-water-price-increase-2024.md": {
	id: "walmart-water-price-increase-2024.md";
  slug: "walmart-water-price-increase-2024";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"walmart-water-price-surge.md": {
	id: "walmart-water-price-surge.md";
  slug: "walmart-water-price-surge";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"why-refillable-cleaning-products-are-safer-for-children-and-pets.md": {
	id: "why-refillable-cleaning-products-are-safer-for-children-and-pets.md";
  slug: "why-refillable-cleaning-products-are-safer-for-children-and-pets";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"why-refillable-cleaning-products-reduce-household-plastic-waste.md": {
	id: "why-refillable-cleaning-products-reduce-household-plastic-waste.md";
  slug: "why-refillable-cleaning-products-reduce-household-plastic-waste";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"why-refillable-household-products-are-ideal-for-tiny-homes.md": {
	id: "why-refillable-household-products-are-ideal-for-tiny-homes.md";
  slug: "why-refillable-household-products-are-ideal-for-tiny-homes";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"why-refillable-household-products-matter-for-ocean-plastic-pollution.md": {
	id: "why-refillable-household-products-matter-for-ocean-plastic-pollution.md";
  slug: "why-refillable-household-products-matter-for-ocean-plastic-pollution";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"why-refillable-products-are-better-for-reducing-carbon-footprint.md": {
	id: "why-refillable-products-are-better-for-reducing-carbon-footprint.md";
  slug: "why-refillable-products-are-better-for-reducing-carbon-footprint";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"why-refillable-products-are-essential-for-plastic-free-households.md": {
	id: "why-refillable-products-are-essential-for-plastic-free-households.md";
  slug: "why-refillable-products-are-essential-for-plastic-free-households";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"why-refillable-products-are-key-to-plastic-free-new-parents.md": {
	id: "why-refillable-products-are-key-to-plastic-free-new-parents.md";
  slug: "why-refillable-products-are-key-to-plastic-free-new-parents";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"why-refillable-products-help-reduce-microplastic-pollution.md": {
	id: "why-refillable-products-help-reduce-microplastic-pollution.md";
  slug: "why-refillable-products-help-reduce-microplastic-pollution";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"why-refilling-your-own-products-supports-local-zero-waste-shops.md": {
	id: "why-refilling-your-own-products-supports-local-zero-waste-shops.md";
  slug: "why-refilling-your-own-products-supports-local-zero-waste-shops";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"why-switching-to-refillable-makeup-removers-matters-for-plastic-waste.md": {
	id: "why-switching-to-refillable-makeup-removers-matters-for-plastic-waste.md";
  slug: "why-switching-to-refillable-makeup-removers-matters-for-plastic-waste";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"why-using-refillable-hand-soap-can-save-money-and-plastic.md": {
	id: "why-using-refillable-hand-soap-can-save-money-and-plastic.md";
  slug: "why-using-refillable-hand-soap-can-save-money-and-plastic";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"zero-waste-bathroom-essential-refillable-personal-care-products.md": {
	id: "zero-waste-bathroom-essential-refillable-personal-care-products.md";
  slug: "zero-waste-bathroom-essential-refillable-personal-care-products";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"zero-waste-bathroom-swaps-refillable-vs-single-use-products.md": {
	id: "zero-waste-bathroom-swaps-refillable-vs-single-use-products.md";
  slug: "zero-waste-bathroom-swaps-refillable-vs-single-use-products";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"zero-waste-cleaning-hacks-using-refillable-household-essentials.md": {
	id: "zero-waste-cleaning-hacks-using-refillable-household-essentials.md";
  slug: "zero-waste-cleaning-hacks-using-refillable-household-essentials";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"zero-waste-cleaning-with-refillable-products-what-you-need-to-know.md": {
	id: "zero-waste-cleaning-with-refillable-products-what-you-need-to-know.md";
  slug: "zero-waste-cleaning-with-refillable-products-what-you-need-to-know";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"zero-waste-living-refillable-personal-care-products-beginners-guide.md": {
	id: "zero-waste-living-refillable-personal-care-products-beginners-guide.md";
  slug: "zero-waste-living-refillable-personal-care-products-beginners-guide";
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
"b0846gfncq-estrogen-methyltestosterone-0-625-mg-1-25-mg-tab.md": {
	id: "b0846gfncq-estrogen-methyltestosterone-0-625-mg-1-25-mg-tab.md";
  slug: "b0846gfncq-estrogen-methyltestosterone-0-625-mg-1-25-mg-tab";
  body: string;
  collection: "products";
  data: InferEntrySchema<"products">
} & { render(): Render[".md"] };
"b0848q34f8-paroxetine-7-5-mg-cap.md": {
	id: "b0848q34f8-paroxetine-7-5-mg-cap.md";
  slug: "b0848q34f8-paroxetine-7-5-mg-cap";
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
"b099nzc4pb-estradiol-2xweekly-ab3-0-025-mg-patch.md": {
	id: "b099nzc4pb-estradiol-2xweekly-ab3-0-025-mg-patch.md";
  slug: "b099nzc4pb-estradiol-2xweekly-ab3-0-025-mg-patch";
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
"b0c7ztv376-veozah-45-mg-tab.md": {
	id: "b0c7ztv376-veozah-45-mg-tab.md";
  slug: "b0c7ztv376-veozah-45-mg-tab";
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
