import { useLayoutEffect, useRef, useState } from 'react';
import type { Process } from '@/config/workProcess.json';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface Props {
  processes: Process[];
}

export const WorkProcessScroll = ({ processes }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    // Guard for SSR
    if (typeof window === "undefined") return;
    
    if (!containerRef.current || !rightColumnRef.current) return;

    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Register plugin inside the context
      gsap.registerPlugin(ScrollTrigger);

      const sections = gsap.utils.toArray<HTMLElement>('.process-step');

      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    }, containerRef); // Scope to the container

    // Cleanup more robust
    return () => {
      ctx.revert(); // Revert all animations in the context
    };
  }, [processes]); // Add dependency if processes can change

  return (
    <div ref={containerRef} className="relative flex flex-col lg:flex-row">
      
      {/* Left Column - Sticky */}
      <div 
        className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 flex-col justify-center p-12 xl:p-24 z-10"
      >
        <div className="relative w-full h-full flex flex-col justify-center">
          
          {/* Animated Number */}
          <div className="overflow-hidden mb-8">
            <div className="relative h-[120px] md:h-[160px]">
               {processes.map((process, index) => (
                 <span
                    key={process.number}
                    className={`absolute top-0 left-0 text-9xl md:text-[10rem] font-anton leading-none transition-transform duration-700 ease-in-out ${
                      index === activeIndex ? 'translate-y-0 opacity-100' : index < activeIndex ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0'
                    }`}
                 >
                   {process.number}
                 </span>
               ))}
            </div>
          </div>

          {/* Animated Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
             {processes.map((process, index) => (
               <img
                 key={process.title}
                 src={process.image}
                 alt={process.title}
                 className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                   index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                 }`}
               />
             ))}
          </div>

        </div>
      </div>

      {/* Right Column - Scrollable Content */}
      <div ref={rightColumnRef} className="w-full lg:w-1/2">
        {processes.map((process, index) => (
          <div 
            key={process.number}
            className="process-step min-h-[80vh] lg:min-h-screen flex flex-col justify-center p-8 md:p-12 lg:p-24 lg:border-l-2 border-dashed border-muted/40"
          >
            {/* Mobile Number & Image */}
            <div className="lg:hidden mb-8 space-y-6">
               <span className="text-6xl font-anton text-foreground block">{process.number}</span>
               <div className="w-full aspect-video rounded-xl overflow-hidden">
                 <img src={process.image} alt={process.title} className="w-full h-full object-cover" />
               </div>
            </div>

            <div className={`transition-all duration-700 delay-100 ${index === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-10'}`}>
              <span className="text-sm font-grotesk font-semibold uppercase tracking-wider text-muted mb-4 block">
                Process {process.number}
              </span>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-anton uppercase leading-10 lg:leading-16 mb-6 underline decoration-secondary decoration-4 underline-offset-4">
                {process.title}
              </h3>
              <p className="text-base md:text-xl text-muted font-sans leading-relaxed max-w-lg">
                {process.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
