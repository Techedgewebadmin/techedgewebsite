import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import type { CollectionEntry } from 'astro:content';
import { ArrowIcon } from '@/icons/react-use/icons-for-react';

interface Props {
  projects: CollectionEntry<'projects'>[];
}

export const ProjectListHover = ({ projects }: Props) => {
  const [activeProject, setActiveProject] = useState<CollectionEntry<'projects'> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const revealPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', moveCursor);

    // Animation loop - follow mouse Y position
    const updatePosition = () => {
      if (!revealRef.current || !containerRef.current || !activeProject) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const relativeY = cursorRef.current.y - containerRect.top;

      // Parallax offset based on cursor (only X axis for subtle movement)
      const centerX = window.innerWidth / 4;
      const parallaxX = (cursorRef.current.x - centerX) * 0.2;

      // Smooth interpolation for Y position (follows mouse)
      const targetY = relativeY;
      revealPosRef.current.y += (targetY - revealPosRef.current.y) * 0.1;

      // Smooth interpolation for X parallax
      revealPosRef.current.x += (parallaxX - revealPosRef.current.x) * 0.1;

      gsap.set(revealRef.current, {
        x: revealPosRef.current.x,
        top: revealPosRef.current.y,
        yPercent: -50,
      });

      requestAnimationFrame(updatePosition);
    };

    const animationId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(animationId);
    };
  }, [activeProject]);

  const handleMouseEnter = (project: CollectionEntry<'projects'>) => {
    setActiveProject(project);
  };

  const handleContainerEnter = () => {
    // Show container when entering the list area
    if (revealRef.current) {
      gsap.to(revealRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: 'power2.out',
      });
    }
  };

  const handleContainerLeave = () => {
    if (revealRef.current) {
      gsap.to(revealRef.current, {
        opacity: 0,
        duration: 0.1,
        ease: 'power2.out',
        overwrite: true,
      });
    }
    setActiveProject(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative max-w-7xl mx-auto"
      onMouseEnter={handleContainerEnter}
      onMouseLeave={handleContainerLeave}
    >

      {/* Floating Reveal Container - Absolute Positioned */}
      <div
        ref={revealRef}
        className="absolute right-[10%] w-[400px] xl:w-[550px] aspect-video pointer-events-none z-50 opacity-0 hidden lg:block"
        style={{ top: 0 }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-sm bg-black">
          {/* Current Image */}
          {activeProject && (
            <div ref={imageRef} className="absolute inset-0">
              <img
                src={activeProject.data.image.src}
                alt={activeProject.data.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-end text-accent-foreground">
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-white/30 pb-4">
                    <div>
                      <p className="text-base font-mono uppercase text-secondary mb-1 font-semibold">
                        {activeProject.data.location}
                      </p>
                      <p className="text-base text-accent-foreground">
                        {activeProject.data.capacity}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg text-accent-foreground font-sans line-clamp-3 drop-shadow-lg">
                    {activeProject.data.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project List */}
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <a
            key={project.id}
            className="px-4 md:px-6 group relative border-b-2 border-muted/50 border-dashed py-6 md:py-8 cursor-pointer transition-colors"
            onMouseEnter={() => handleMouseEnter(project)}
            href={`/projects/${project.id}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-8">
                <span className="text-base md:text-xl font-grotesk text-muted group-hover:text-foreground group-hover:bg-secondary p-1 md:p-2 rounded-md transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg md:text-2xl xl:text-4xl font-grotesk  text-foreground group-hover:translate-x-4 transition-transform duration-300 relative z-10">
                  {project.data.title}
                </h3>
              </div>
              <ArrowIcon width={48} height={48} className='text-secondary rotate-45' />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
