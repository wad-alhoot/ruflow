import type { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";

const servicesData: Record<
  string,
  {
    title: string;
    description: string;
    features: { title: string; detail: string }[];
    process: { step: string; detail: string }[];
  }
> = {
  "sublimation-printing": {
    title: "Sublimation Printing",
    description:
      "Our industrial-grade sublimation printing delivers vibrant, permanent full-color graphics on polyester fabrics, ceramics, metals, and specialty substrates. Using state-of-the-art heat-press and calender technology, we produce photographic-quality results that withstand repeated washing and heavy use — ideal for sportswear, promotional merchandise, and home textiles.",
    features: [
      {
        title: "Full-Color Precision",
        detail:
          "High-resolution CMYK printing with color-matching to ensure brand consistency across every batch.",
      },
      {
        title: "Multi-Substrate Support",
        detail:
          "Print on polyester fabric, ceramic tiles, aluminum sheets, and other polymer-coated surfaces.",
      },
      {
        title: "Wash & Fade Resistant",
        detail:
          "Sublimation dye bonds at the molecular level, producing prints that never crack, peel, or fade.",
      },
      {
        title: "Rapid Turnaround",
        detail:
          "Streamlined production workflow allows us to deliver large orders within tight deadlines.",
      },
    ],
    process: [
      {
        step: "Artwork Review",
        detail:
          "Submit your design files; our team checks resolution, color profiles, and print-readiness.",
      },
      {
        step: "Sample Proof",
        detail:
          "We produce a printed sample for your approval before committing to the full production run.",
      },
      {
        step: "Bulk Printing",
        detail:
          "Approved designs go into production on our high-speed sublimation calenders.",
      },
      {
        step: "Quality Check & Dispatch",
        detail:
          "Every piece is inspected for color accuracy and defects, then securely packed for shipping.",
      },
    ],
  },
  "custom-apparel": {
    title: "Custom Apparel Manufacturing",
    description:
      "From concept to finished garment, we handle the entire apparel manufacturing process. Whether you need sublimated jerseys for a football league, custom tracksuits for a corporate event, or embroidered polo shirts for your team, our vertically integrated facility handles pattern-making, cutting, sewing, printing, and finishing under one roof.",
    features: [
      {
        title: "End-to-End Production",
        detail:
          "Pattern drafting, fabric sourcing, cutting, stitching, printing, and packaging — all in-house.",
      },
      {
        title: "Custom Branding",
        detail:
          "Logos, names, numbers, and sponsor placements positioned exactly to your specifications.",
      },
      {
        title: "Wide Fabric Selection",
        detail:
          "Choose from polyester, mesh, interlock, piqué, fleece, and more to match your product requirements.",
      },
      {
        title: "Low MOQ Options",
        detail:
          "Flexible minimum order quantities starting from as few as 50 pieces for custom runs.",
      },
    ],
    process: [
      {
        step: "Design Consultation",
        detail:
          "Share your concept or mockup; our designers refine it into a production-ready technical pack.",
      },
      {
        step: "Sampling",
        detail:
          "We produce physical samples in your chosen fabric and print technique for approval.",
      },
      {
        step: "Production",
        detail:
          "Approved samples move to cutting, sewing, and sublimation printing lines.",
      },
      {
        step: "Finishing & Shipping",
        detail:
          "Garments are pressed, folded, poly-bagged, and labeled before dispatch to your warehouse.",
      },
    ],
  },
  "bulk-production": {
    title: "Bulk Production",
    description:
      "When you need thousands of identical, high-quality pieces delivered on schedule, our bulk production service is built for you. Equipped with automated cutting machines, multi-head embroidery stations, and large-format sublimation calenders, we maintain consistency and precision across high-volume runs while keeping per-unit costs competitive.",
    features: [
      {
        title: "Scalable Capacity",
        detail:
          "Produce from 500 to 50,000+ units per order without sacrificing quality or lead time.",
      },
      {
        title: "Consistent Quality",
        detail:
          "Automated cutting and standardized SOPs ensure every piece matches the approved sample.",
      },
      {
        title: "Competitive Pricing",
        detail:
          "Volume-based pricing tiers with transparent cost breakdowns — no hidden charges.",
      },
      {
        title: "Dedicated Account Manager",
        detail:
          "A single point of contact tracks your order, provides updates, and resolves any issues fast.",
      },
    ],
    process: [
      {
        step: "Order Planning",
        detail:
          "We review quantities, sizes, colorways, and timelines to create a detailed production plan.",
      },
      {
        step: "Material Sourcing",
        detail:
          "Fabrics, inks, and trims are procured and quality-tested before production begins.",
      },
      {
        step: "Mass Production",
        detail:
          "Automated cutting, stitching lines, and sublimation printing run in parallel for efficiency.",
      },
      {
        step: "Inspection & Logistics",
        detail:
          "AQL-standard inspection, carton packing, and coordinated shipping to your destination.",
      },
    ],
  },
  "design-services": {
    title: "Design Services",
    description:
      "Don't have a finished design? Our in-house creative team helps you go from a rough idea to a polished, print-ready artwork. We specialize in jersey mockups, uniform layouts, sublimation patterns, and brand identity for sports teams, corporate clients, and e-commerce sellers looking for standout products.",
    features: [
      {
        title: "Jersey & Uniform Design",
        detail:
          "Custom jersey templates with player names, numbers, logos, and sponsor placement guides.",
      },
      {
        title: "Pattern & Repeat Design",
        detail:
          "Seamless all-over sublimation patterns for sportswear, activewear, and home textiles.",
      },
      {
        title: "3D Mockups",
        detail:
          "Photorealistic 3D garment mockups so you can visualize the final product before production.",
      },
      {
        title: "Brand Identity",
        detail:
          "Logo design, color palette development, and brand guidelines for new sportswear labels.",
      },
    ],
    process: [
      {
        step: "Creative Brief",
        detail:
          "Tell us your vision — colors, references, branding elements, and any specific requirements.",
      },
      {
        step: "Concept Drafts",
        detail:
          "Our designers produce 2-3 initial concepts for your review and feedback.",
      },
      {
        step: "Revisions & Finalization",
        detail:
          "We iterate based on your feedback until the design is exactly right.",
      },
      {
        step: "Production Files",
        detail:
          "Final artwork delivered in print-ready formats (AI, PDF, PNG) with color specifications.",
      },
    ],
  },
};

const slugs = Object.keys(servicesData);

export function generateStaticParams() {
  return slugs.map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const data = servicesData[service];
  if (!data) {
    return { title: "Service Not Found — Pak Fashion Textile" };
  }
  return {
    title: `${data.title} — Pak Fashion Textile`,
    description: data.description.slice(0, 160),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const data = servicesData[service];
  return <ServiceDetailClient slug={service} data={data} />;
}
