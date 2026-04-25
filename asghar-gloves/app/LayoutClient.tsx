"use client";

import Preloader from "@/components/asghar-gloves/Preloader";
import ScrollProgress from "@/components/asghar-gloves/ScrollProgress";
import CursorFollower from "@/components/asghar-gloves/CursorFollower";
import BackToTopCircle from "@/components/asghar-gloves/BackToTopCircle";
import WhatsAppButton from "@/components/asghar-gloves/WhatsAppButton";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <CursorFollower />
      {children}
      <BackToTopCircle />
      <WhatsAppButton />
    </>
  );
}
