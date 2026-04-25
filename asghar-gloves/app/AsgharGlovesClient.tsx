"use client";

import Navbar from "@/components/asghar-gloves/Navbar";
import Hero from "@/components/asghar-gloves/Hero";
import ScaleCounter from "@/components/asghar-gloves/ScaleCounter";
import IndustriesGrid from "@/components/asghar-gloves/IndustriesGrid";
import ProductCategoriesGrid from "@/components/asghar-gloves/ProductCategoriesGrid";
import ManufacturingStory from "@/components/asghar-gloves/ManufacturingStory";
import CertificationsWall from "@/components/asghar-gloves/CertificationsWall";
import TrustLogos from "@/components/asghar-gloves/TrustLogos";
import AboutBrand from "@/components/asghar-gloves/AboutBrand";
import ContactCTA from "@/components/asghar-gloves/ContactCTA";
import Footer from "@/components/asghar-gloves/Footer";

export default function AsgharGlovesClient() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ScaleCounter />
        <TrustLogos />
        <IndustriesGrid />
        <ProductCategoriesGrid />
        <ManufacturingStory />
        <CertificationsWall />
        <AboutBrand />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
