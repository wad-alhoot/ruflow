// ─── Asghar Gloves — Brand & company constants ─────────────────────
// Source: /docs/brand-copy.txt + user-confirmed data (2026-04-25)
// Note: PLACEHOLDERS marked — replace with real data when provided

export const company = {
  name: "Asghar Gloves",
  shortName: "Asghar",
  monogram: "AG",
  tagline: "Engineered for Industry. Crafted for Safety.",
  foundedYear: 2010,
  yearsExperience: 16,
  formalizedYear: 2020,

  city: "Faisalabad",
  country: "Pakistan",
  address: "Faisalabad, Punjab, Pakistan", // PLACEHOLDER — full street TBD
  timezone: "PKT (UTC+5)",

  // PLACEHOLDER contacts — user to provide
  phone: "+92 300 0000000",
  whatsapp: "923000000000",
  email: "info@asgharglovesindustries.com",
  salesEmail: "sales@asgharglovesindustries.com",
  exportEmail: "export@asgharglovesindustries.com",

  website: "https://asgharglovesindustries.com",

  // Scale claims — PLACEHOLDERS where not confirmed
  stats: {
    yearsExperience: 16,
    countriesServed: 25,      // PLACEHOLDER
    monthlyCapacity: 500000,  // pairs/month — PLACEHOLDER
    productLines: 60,         // SKU count — PLACEHOLDER
  },

  copy: {
    journey: {
      heading: "Our Journey",
      body: "At Asghar Gloves, our story is built on a foundation of hard work and commitment to safety. We began our operations in 2010 in the industrial heart of Pakistan, Faisalabad, with a clear mission: to manufacture high-quality protective and industrial gloves that professionals can trust.",
    },
    growth: {
      heading: "Growth and Excellence",
      body: "For over a decade, we have mastered the art of glove manufacturing, focusing on durability, grip, and comfort. In 2020, we took a significant step forward by formalizing our business and becoming a registered tax-paying entity, aligning ourselves with international trade standards. This transition marked our evolution from a local manufacturer to a brand ready to serve the global market.",
    },
    whyUs: {
      heading: "Why Us?",
      body: "Today, Asghar Gloves stands for reliability. With 16 years of manufacturing experience, we combine traditional craftsmanship with modern requirements to ensure every pair of gloves provides maximum protection. Whether it's industrial safety or specialized hand protection, we deliver quality that speaks for itself.",
    },
  },

  values: [
    {
      title: "Durability",
      body: "Every pair engineered for the life of the job — stitched, tested, and reinforced for real industrial wear.",
    },
    {
      title: "Grip & Comfort",
      body: "Ergonomic palm patterning and breathable linings so your hands work longer and feel less.",
    },
    {
      title: "Protection",
      body: "From hot-mill to cut-resistant, every glove is purpose-built for a specific hazard profile.",
    },
    {
      title: "Integrity",
      body: "Registered, compliant, audit-ready — transparency is our export advantage.",
    },
  ],
};

export type Company = typeof company;
