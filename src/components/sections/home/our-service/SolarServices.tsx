import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from "@/lib/utils";
import { DesignIcon, InstallationIcon, MaintenanceIcon, SuportIcon } from '@/icons/react-use/icons-for-react';
import { useRevealHover } from '@/animations/hooks/useRevealHover';

interface Service {
  title: string;
  description: string;
  image: string;
  icon: string;
}

interface Props {
  services: Service[];
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  design: DesignIcon,
  installation: InstallationIcon,
  maintenance: MaintenanceIcon,
  suport: SuportIcon
};

const AUTOPLAY_INTERVAL = 30000;

export const SolarServices = ({ services }: Props) => {
  const [activeService, setActiveService] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const isUserInteractionRef = useRef(false);

  // Function for restart autoplay (memoized)
  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    autoPlayRef.current = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, AUTOPLAY_INTERVAL);
  }, [services.length]);

  // Unified effect for autoplay
  useEffect(() => {
    resetAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [resetAutoPlay]);

  // Animations only when service changes
  useRevealHover({
    imageRef,
    contentRef,
    trigger: activeService  
  });

  // Handler optimized
  const handleServiceClick = useCallback((index: number) => {
    if (index === activeService) return; // Avoid unnecessary changes

    setActiveService(index);
    isUserInteractionRef.current = true;
    resetAutoPlay();

    // Reset flag after a short delay
    setTimeout(() => {
      isUserInteractionRef.current = false;
    }, 100);
  }, [activeService, resetAutoPlay]);

  // Get the icon component
  const IconComponent = iconMap[services[activeService]?.icon] || DesignIcon;

  return (
    <div className="space-y-8">

      {/* Top - Tabs Navigation */}
      <div className="flex flex-wrap w-full bg-white rounded-xl p-1 shadow-sm border-2 border-dashed border-muted">
        {services.map((service, index) => (
          <button
            key={service.title}
            onClick={() => handleServiceClick(index)}
            onMouseEnter={() => handleServiceClick(index)}
            className={cn(
              "flex-1 py-4 px-4 text-sm md:text-base font-grotesk font-semibold uppercase rounded-lg transition-all duration-300 text-center cursor-pointer",
              activeService === index
                ? "bg-secondary text-foreground shadow-sm"
                : "text-muted hover:bg-muted/10 hover:text-foreground"
            )}
          >
            {service.title}
          </button>
        ))}
      </div>

      {/* Bottom - Full Width Image with Overlay */}
      <div className="relative w-full h-[600px] rounded-xl overflow-hidden group">

        {/* Background Image */}
        <div ref={imageRef} className="absolute inset-0 w-full h-full">
          <img
            src={services[activeService].image}
            alt={services[activeService].title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center">
          <div
            ref={contentRef}
            className="max-w-xl bg-foreground/50 backdrop-blur-xl p-8 rounded-xl space-y-3"
          >
            <div className='p-4 rounded-full bg-white/70 w-fit'>
              <IconComponent width={50} height={50} className="text-foreground" />
            </div>
            <h3 className="text-3xl font-black text-accent-foreground">
              {services[activeService].title}
            </h3>

            <p className="text-lg text-accent-foreground leading-relaxed font-sans">
              {services[activeService].description}
            </p>

            {/* Progress bar inside the card */}
            <div className="pt-2">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary transition-all"
                  style={{
                    width: `${((activeService + 1) / services.length) * 100}%`,
                    transition: 'width 0.3s ease-out'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
