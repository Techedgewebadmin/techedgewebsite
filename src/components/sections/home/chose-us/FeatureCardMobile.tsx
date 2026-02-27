import { useState, useRef } from 'react';
import { Icon } from '@iconify-icon/react';
import type { FeatureProps } from '@/config/features.json';
import { useCarouselAnimation } from '@/animations/hooks/useCarouselAnimation';

export const FeatureCardMobile = ({ features }: { features: FeatureProps[] }) => {
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
      Math.min(features.length - 1, prevIndex + 1)
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // drag/swipe handling
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
    const threshold = 30; // Minimum swipe distance to trigger a slide change

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Left Swipe - go to next
        goToNext();
      } else {
        // Right Swipe - go to previous
        goToPrevious();
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // Mouse Events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Tactil Events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <>
      <div
        className="relative h-[380px] cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Cards Stack */}
        <div className="relative w-auto h-full flex items-center justify-center align-middle">
          {features.map(({ icon, titleKey, descriptionKey }, index) => (
            <div
              key={titleKey}
              ref={(el) => { cardsRefs.current[index] = el; }}
              className="absolute w-full max-w-[220px] md:max-w-[260px] h-[320px] bg-accent-foreground rounded-lg"
              style={{
                transformOrigin: 'center center',
              }}
            >
              <div className="flex flex-col justify-between h-full p-5 select-none">

                <div
                  className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Icon icon={icon} className='text-foreground' width="22" height="22" />
                </div>

                <div>
                  <h3 className="text-lg md:text-2xl font-normal mb-4 font-mono">
                    {titleKey}
                  </h3>
                  <p className="text-muted text-sm font-sans leading-relaxed">
                    {descriptionKey}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-evenly px-4">
        {/* Dots Indicator */}
        <div className="flex gap-2">
          {features.map((_, index) => (
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

        {/* Arrow Buttons */}
        <div className="flex gap-3">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="cursor-pointer w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center text-foreground hover:text-accent-foreground hover:bg-foreground transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-600 disabled:hover:bg-transparent"
            aria-label="Previous testimonial"
          >
            <Icon icon="jam:arrow-left" width={24} height={24} />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === features.length - 1}
            className="cursor-pointer w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center text-foreground hover:text-accent-foreground hover:bg-foreground transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-600 disabled:hover:bg-transparent"
            aria-label="Next testimonial"
          >
            <Icon icon="jam:arrow-right" width={24} height={24} />
          </button>
        </div>
      </div>
    </>
  );
}
