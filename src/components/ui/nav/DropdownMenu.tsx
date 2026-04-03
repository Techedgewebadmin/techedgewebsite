import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { navItems } from '@/config/navItems.json.ts';

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Listen for toggle event from Navbar
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ isOpen: boolean }>;
      setIsOpen(custom.detail.isOpen);
    };
    window.addEventListener('toggleMenu', handler as EventListener);
    return () => window.removeEventListener('toggleMenu', handler as EventListener);
  }, []);

  // Animate open/close
  useEffect(() => {
    if (!panelRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: -12, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(
        '[data-drop-item]',
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.2, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    if (!panelRef.current) { setIsOpen(false); return; }
    gsap.to(panelRef.current, {
      opacity: 0, y: -8, scale: 0.97, duration: 0.18, ease: 'power2.in',
      onComplete: () => {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('closeMenu'));
      },
    });
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    handleClose();

    // On homepage, scroll to section; otherwise navigate
    if (window.location.pathname === '/' && item.sectionId) {
      setTimeout(() => {
        const lenis = (window as any).__lenis;
        if (item.sectionId === 'home') {
          lenis ? lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(item.sectionId!);
          if (el) lenis ? lenis.scrollTo(el, { duration: 1.2 }) : el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 220);
    }
    // else: normal <a href> navigation
  };

  if (!isOpen) return null;

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <>
      {/* Backdrop — click outside to close */}
      <div
        className="fixed inset-0 z-30"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed top-20 right-4 md:right-14 z-50 w-56 md:w-64 bg-foreground rounded-2xl shadow-2xl overflow-hidden"
        style={{ opacity: 0 }}
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Close button */}
        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={handleClose}
            className="text-accent/60 hover:text-accent transition-colors text-xl leading-none"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Nav items */}
        <ul className="px-4 pb-5 pt-2 space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.href ||
              (currentPath === '/' && item.sectionId === 'home');
            return (
              <li key={item.title} data-drop-item style={{ opacity: 0 }}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (window.location.pathname === '/' && item.sectionId) {
                      e.preventDefault();
                    }
                    handleNavClick(item);
                  }}
                  className={`block px-3 py-2.5 rounded-xl text-base font-anton uppercase tracking-wide transition-all duration-200
                    ${isActive
                      ? 'bg-secondary/20 text-secondary'
                      : 'text-accent hover:bg-white/5 hover:text-secondary hover:translate-x-1'
                    }`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Divider + tagline */}
        <div className="border-t border-white/10 px-5 py-3">
          <p className="text-accent/40 text-xs font-grotesk">Excellence in Solar Engineering</p>
        </div>
      </div>
    </>
  );
};
