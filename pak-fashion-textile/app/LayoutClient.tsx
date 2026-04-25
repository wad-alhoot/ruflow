"use client";

import Preloader from "@/components/park-fashion/Preloader";
import ScrollProgress from "@/components/park-fashion/ScrollProgress";
import CursorFollower from "@/components/park-fashion/CursorFollower";
import BackToTopCircle from "@/components/park-fashion/BackToTopCircle";
import WhatsAppChatWidget from "@/components/park-fashion/WhatsAppChatWidget";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <CursorFollower />
      {children}
      <BackToTopCircle />
      <WhatsAppChatWidget />
    </>
  );
}
