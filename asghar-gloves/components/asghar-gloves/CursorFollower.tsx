"use client";

import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;
    };

    let raf: number;
    const loop = () => {
      const p = pos.current;
      p.x += (p.targetX - p.x) * 0.12;
      p.y += (p.targetY - p.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${p.x - 10}px, ${p.y - 10}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[60] w-5 h-5 rounded-full pointer-events-none mix-blend-difference"
      style={{
        background:
          "radial-gradient(circle, rgba(245,158,11,0.6) 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
