export interface Industry {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
}

export const industries: Industry[] = [
  {
    slug: "oil-and-gas",
    name: "Oil & Gas",
    description: "Chemical-resistant grip for upstream, midstream, and downstream operations.",
    icon: "Droplets",
  },
  {
    slug: "construction",
    name: "Construction",
    description: "Cut, puncture, and abrasion protection for every trade on site.",
    icon: "HardHat",
  },
  {
    slug: "automotive",
    name: "Automotive",
    description: "Mechanic's grip in oil and solvent — dexterity without compromise.",
    icon: "Wrench",
  },
  {
    slug: "steel-and-foundry",
    name: "Steel & Foundry",
    description: "Hot-mill and heat-resistant protection for molten-metal environments.",
    icon: "Flame",
  },
  {
    slug: "warehousing-logistics",
    name: "Warehousing & Logistics",
    description: "High-grip dotted gloves for palletizing and pick-pack operations.",
    icon: "Package",
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    description: "Rugged cotton protection for harvest, pruning, and greenhouse work.",
    icon: "Sprout",
  },
  {
    slug: "electronics-assembly",
    name: "Electronics & Assembly",
    description: "Lint-free, low-residue inspection gloves for precision environments.",
    icon: "Cpu",
  },
  {
    slug: "food-processing",
    name: "Food Processing",
    description: "Hygienic cotton and polyester liners for food-handling adjacency.",
    icon: "UtensilsCrossed",
  },
];
