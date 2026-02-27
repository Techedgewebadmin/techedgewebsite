import { useEffect } from "react";
import gsap from "gsap";

interface CarouselAnimationOptions {
  active?: gsap.TweenVars;
  prev?: gsap.TweenVars;
  next?: gsap.TweenVars;
  hidden?: gsap.TweenVars;
  duration?: number;
}

export function useCarouselAnimation(
  items: (HTMLDivElement | null)[],
  currentIndex: number,
  options: CarouselAnimationOptions = {}
) {
  const {
    active = { x: 0, scale: 1, opacity: 1, zIndex: 30 },
    prev = { x: "-20%", scale: 0.9, opacity: 0.5, zIndex: 10 },
    next = { x: "20%", scale: 0.9, opacity: 0.5, zIndex: 10 },
    hidden = { opacity: 0, scale: 0.7, zIndex: 0 },
    duration = 0.6,
  } = options;

  useEffect(() => {
    items.forEach((card, index) => {
      if (!card) return;

      const offset = index - currentIndex;

      let animation: gsap.TweenVars;

      if (offset === 0) animation = active;
      else if (offset === -1) animation = prev;
      else if (offset === 1) animation = next;
      else animation = hidden;

      gsap.to(card, {
        ...animation,
        duration,
        ease: "power3.out",
      });
    });
  }, [items, currentIndex]);
}
