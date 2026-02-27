import { useState, useRef } from 'react';
import { Icon } from '@iconify-icon/react';
import { testimonials } from '@/config/testimonials.json';
import { useCarouselAnimation } from '@/animations/hooks/useCarouselAnimation';

export const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  useCarouselAnimation(cardsRefs.current, currentIndex);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      Math.max(0, prevIndex - 1)
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(testimonials.length - 1, prevIndex + 1)
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Drag/Swipe Logic
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto pt-6 md:pt-12 ">

      {/* Carousel Container */}
      <div
        className="relative h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-distant mb-6 md:mb-12"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            ref={(el) => { cardsRefs.current[index] = el; }}
            className="absolute w-full max-w-[300px] md:max-w-[600px] h-[400px] bg-accent-foreground rounded-lg p-8 border-2 border-dashed border-muted"
          >
            <div className="flex flex-col h-full justify-around select-none">

              {/* Quote Icon */}
              <div className="text-secondary">
                <Icon icon="mdi:format-quote-open" width={52} height={52} />
              </div>

              {/* Quote Text */}
              <p className="text-foreground text-base md:text-lg font-sans leading-relaxed line-clamp-6">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="size-10 rounded-full overflow-hidden bg-white/10 shrink-0">
                  <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-foreground font-anton text-lg tracking-wide">{testimonial.author}</h4>
                  <p className="text-muted text-xs font-sans uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
      {/* Navigation Controls */}
      <div className="flex items-center justify-evenly px-4">
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'w-8 bg-secondary'
                : 'w-2 bg-foreground hover:bg-gray-500'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="cursor-pointer w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center text-foreground hover:text-accent-foreground hover:bg-foreground transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-600 disabled:hover:bg-transparent"
            aria-label="Previous testimonial"
          >
            <Icon icon="ph:arrow-left" width={24} height={24} />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === testimonials.length - 1}
            className="cursor-pointer w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center text-foreground hover:text-accent-foreground hover:bg-foreground transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-600 disabled:hover:bg-transparent"
            aria-label="Next testimonial"
          >
            <Icon icon="ph:arrow-right" width={24} height={24} />
          </button>
        </div>
      </div>

    </div>
  );
};
