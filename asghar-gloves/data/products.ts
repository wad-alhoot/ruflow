// ─── Product categories — mirrors Arshad Gloves catalog structure ──
// Confirmed by user: same category set as arshadgloves.com for now
// Each category is a high-level family; individual SKUs can be added per category later.

export interface ProductCategory {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  features: string[];
  useCases: string[];
  materials: string[];
  image: string;
  accent: string; // for card theming
}

export const productCategories: ProductCategory[] = [
  {
    slug: "interlock-bleach",
    name: "Interlock Bleach Gloves",
    shortName: "Interlock Bleach",
    description:
      "Bright white interlock knit cotton gloves, bleached for uniform color. Lightweight and breathable — ideal for inspection, handling, and dry-industrial tasks.",
    features: ["100% combed cotton", "Bleached white finish", "Knit wrist", "Lint-free grip"],
    useCases: ["Inspection", "Packaging", "Electronics assembly", "Light handling"],
    materials: ["Interlock cotton"],
    image: "/images/gloves/interlock-bleach.jpg",
    accent: "#F1F5F9",
  },
  {
    slug: "interlock-natural",
    name: "Interlock Natural Gloves",
    shortName: "Interlock Natural",
    description:
      "Unbleached natural-color interlock cotton gloves. Softer hand-feel and lower chemical footprint for general-purpose industrial wear.",
    features: ["Unbleached cotton", "Soft hand-feel", "Knit wrist", "Breathable"],
    useCases: ["General purpose", "Warehousing", "Gardening", "Light assembly"],
    materials: ["Interlock cotton"],
    image: "/images/gloves/interlock-natural.jpg",
    accent: "#FEF3C7",
  },
  {
    slug: "jersey-gloves",
    name: "Jersey Gloves",
    shortName: "Jersey",
    description:
      "Heavy-weight jersey cotton with brushed interior. Durable, warm, and comfortable — a staple for construction, utilities, and workshop applications.",
    features: ["Brushed jersey cotton", "Reinforced seams", "Knit or gauntlet cuff", "Excellent abrasion resistance"],
    useCases: ["Construction", "Utilities", "Automotive workshop", "Cold handling"],
    materials: ["Jersey cotton"],
    image: "/images/gloves/jersey.jpg",
    accent: "#E0E7FF",
  },
  {
    slug: "drill-dotted",
    name: "Drill Dotted Gloves",
    shortName: "Drill Dotted",
    description:
      "Heavy-weight cotton drill gloves with PVC-dotted palm for enhanced grip. Industrial workhorse for warehousing and material handling.",
    features: ["Cotton drill body", "PVC dot pattern palm", "Knit wrist", "High-grip finish"],
    useCases: ["Warehousing", "Logistics", "Pallet handling", "Light metal work"],
    materials: ["Cotton drill + PVC dots"],
    image: "/images/gloves/drill-dotted.jpg",
    accent: "#FEE2E2",
  },
  {
    slug: "terry-gloves",
    name: "Terry Gloves",
    shortName: "Terry",
    description:
      "Looped terry-knit cotton with superior heat resistance and shock absorption. Engineered for hot-surface handling and vibration damping.",
    features: ["Terry loop construction", "Heat resistant up to 250°C*", "Cushioned palm", "Heavy cuff options"],
    useCases: ["Kitchen / bakery", "Metal foundries", "Hot tool handling", "Glass industry"],
    materials: ["Terry cotton loop"],
    image: "/images/gloves/terry.jpg",
    accent: "#FED7AA",
  },
  {
    slug: "seamless-gloves",
    name: "Seamless Gloves",
    shortName: "Seamless",
    description:
      "Knitted seamless liner in nylon, polyester, or cotton. Dextrous, lightweight, and the foundation for dipped and coated glove lines.",
    features: ["13-gauge seamless knit", "Elasticated cuff", "Superior fit", "Dip-ready substrate"],
    useCases: ["Electronics", "Fine assembly", "Quality inspection", "Base for coated gloves"],
    materials: ["Nylon / polyester / cotton"],
    image: "/images/gloves/seamless.jpg",
    accent: "#DBEAFE",
  },
  {
    slug: "canvas-double-palm",
    name: "Canvas Double Palm Gloves",
    shortName: "Canvas Double Palm",
    description:
      "Heavy-duty canvas with a reinforced double-palm for maximum abrasion resistance. Built for the toughest material handling jobs.",
    features: ["Heavy canvas", "Double-layer palm", "Gauntlet cuff", "High abrasion resistance"],
    useCases: ["Steel yards", "Heavy construction", "Rigging", "Rough material handling"],
    materials: ["Canvas cotton"],
    image: "/images/gloves/canvas-double-palm.jpg",
    accent: "#D1FAE5",
  },
  {
    slug: "hot-mill",
    name: "Hot Mill Gloves",
    shortName: "Hot Mill",
    description:
      "Triple-layer heavy cotton hot mill gloves, burlap-lined for extreme heat resistance. The industry standard for steel, aluminum, and foundry work.",
    features: ["Triple-layer construction", "Burlap-lined palm", "Thick heat-resistant weave", "Extended cuff"],
    useCases: ["Steel mills", "Aluminum casting", "Foundries", "Kiln & furnace work"],
    materials: ["Heavy cotton + burlap"],
    image: "/images/gloves/hot-mill.jpg",
    accent: "#FECACA",
  },
  {
    slug: "nitrile-latex-dipping",
    name: "Nitrile & Latex Dipped Gloves",
    shortName: "Nitrile / Latex Dipped",
    description:
      "Seamless liners dipped in nitrile or latex for superior grip and chemical resistance. Multiple finishes available (smooth, crinkle, foam, sandy).",
    features: ["Nitrile or natural latex coating", "Multiple finishes", "Chemical resistance", "Excellent wet/dry grip"],
    useCases: ["Automotive", "Oil & gas", "Chemical handling", "General industry"],
    materials: ["Polyester/nylon liner + nitrile or latex"],
    image: "/images/gloves/nitrile-dipped.jpg",
    accent: "#FCE7F3",
  },
  {
    slug: "nylon-inspection",
    name: "Nylon Inspection Gloves",
    shortName: "Nylon Inspection",
    description:
      "Lightweight seamless nylon gloves for high-dexterity tasks. Lint-free and ideal for precision inspection and quality control.",
    features: ["Seamless knit nylon", "Lint-free", "High dexterity", "Elasticated cuff"],
    useCases: ["Electronics QC", "Jewelry", "Optical", "Clean handling"],
    materials: ["100% nylon"],
    image: "/images/gloves/nylon-inspection.jpg",
    accent: "#E9D5FF",
  },
  {
    slug: "polyester",
    name: "Polyester Gloves",
    shortName: "Polyester",
    description:
      "Knit polyester gloves — affordable, durable, machine-washable. A high-volume workhorse for packing, handling, and general light-duty tasks.",
    features: ["100% polyester", "Machine washable", "Lint-free", "Knit wrist"],
    useCases: ["Packing", "Food-handling support", "Gardening", "General light duty"],
    materials: ["100% polyester"],
    image: "/images/gloves/polyester.jpg",
    accent: "#CFFAFE",
  },
  {
    slug: "yellow-chore",
    name: "Yellow Chore Gloves",
    shortName: "Yellow Chore",
    description:
      "Iconic yellow cotton chore gloves — rugged, inexpensive, and ready for rough work. A proven classic for utility and agriculture.",
    features: ["Heavy cotton", "Bright yellow — high visibility", "Reinforced seams", "Gauntlet or knit cuff"],
    useCases: ["Utility work", "Agriculture", "Rough construction", "General chores"],
    materials: ["Heavy cotton"],
    image: "/images/gloves/yellow-chore.jpg",
    accent: "#FEF9C3",
  },
];

/* * Heat-resistance figures are illustrative — verify per batch against
   independent lab testing before publishing as a specification. */

export const featuredProducts = productCategories.slice(0, 6);
