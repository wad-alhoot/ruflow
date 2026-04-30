"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/park-fashion/ProductCard";
import { Product } from "@/data/park-fashion-products";

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  onQuickView?: (product: Product) => void;
}

export default function ProductCarousel({ products, title, onQuickView }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {title && (
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
      )}

      {/* Carousel viewport */}
      <div className="relative group/carousel">
        {/* Navigation arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-10 h-10 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white shadow-lg shadow-[#2D6A4F]/20 flex items-center justify-center transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 disabled:opacity-30"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-10 h-10 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white shadow-lg shadow-[#2D6A4F]/20 flex items-center justify-center transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 disabled:opacity-30"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Embla viewport */}
        <div ref={emblaRef} className="overflow-hidden rounded-2xl">
          <div className="flex">
            {products.map((product, i) => (
              <div
                key={product.id}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] min-w-0 px-3"
              >
                <ProductCard product={product} index={0} onQuickView={onQuickView} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`transition-all duration-300 rounded-full ${
              index === selectedIndex
                ? "w-8 h-2.5 bg-[#2D6A4F]"
                : "w-2.5 h-2.5 bg-[#2D6A4F]/20 hover:bg-[#2D6A4F]/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
