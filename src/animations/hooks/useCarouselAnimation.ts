import { gsap } from 'gsap';
import { useEffect } from 'react';

export function useCarouselAnimation(
  cards: (HTMLDivElement | null)[],
  currentIndex: number
) {
  useEffect(() => {
    cards.forEach((card, i) => {
      if (!card) return;
      const offset = i - currentIndex;
      gsap.to(card, {
        x: `${offset * 100}%`,
        opacity: offset === 0 ? 1 : 0.4,
        scale: offset === 0 ? 1 : 0.92,
        duration: 0.45,
        ease: 'power2.out',
      });
    });
  }, [cards, currentIndex]);
}
