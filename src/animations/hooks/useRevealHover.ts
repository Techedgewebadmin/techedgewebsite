import { gsap } from 'gsap';
import { useEffect } from 'react';

interface Props {
  imageRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  trigger: number | string;
}

export function useRevealHover({ imageRef, contentRef, trigger }: Props) {
   useEffect(() => {
      if (!imageRef.current || !contentRef.current) return;
      
      const tl = gsap.timeline();
      
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }
      ).fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.8" // Overlap animations
      );
  
      return () => {
        tl.kill();
      };
    }, [imageRef, contentRef, trigger]);
}
