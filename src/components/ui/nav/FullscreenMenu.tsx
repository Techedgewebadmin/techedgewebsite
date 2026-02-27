import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Icon } from '@iconify-icon/react';
import { socialLinks, contactInfo } from '@/config/socialLinks.json';
import { navItems } from '@/config/navItems.json';
import { t } from '@/lib/utils';

// Focusable elements according to WCAG
const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

export const FullscreenMenu = () => {

  // STATE
  const [isOpen, setIsOpen] = useState(false);

  // REFS
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<Element | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // pathname detection (SSR safe)
  const [currentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  // ============================================================================
  // BODY SCROLL LOCK
  // ============================================================================

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Detect scrollbar width to avoid layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };

  }, [isOpen]);

  // ============================================================================
  // INTERNAL FOCUS TRAP
  // ============================================================================

  const handleFocusTrap = (e: KeyboardEvent) => {
    if (!menuRef.current || e.key !== 'Tab') return;

    const focusable = menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };


  // ============================================================================
  // EVENT FROM ASTRO toggleMenu
  // ============================================================================

  useEffect(() => {

    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ isOpen: boolean }>;

      if (custom.detail.isOpen) {
        triggerElementRef.current = document.activeElement;
      }

      setIsOpen(custom.detail.isOpen);
    };

    window.addEventListener('toggleMenu', handler as EventListener);

    return () => {
      window.removeEventListener('toggleMenu', handler as EventListener);
    };

  }, []);


  // ============================================================================
  // CLOSE MENU WITH ANIMATION
  // ============================================================================

  const handleClose = () => {

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    if (!menuRef.current || !overlayRef.current) {
      setIsOpen(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);

        window.dispatchEvent(new CustomEvent('closeMenu'));

        if (triggerElementRef.current instanceof HTMLElement) {
          triggerElementRef.current.focus();
        }
      }
    });

    timelineRef.current = tl;

    tl.to('[data-menu-link]', {
      opacity: 0,
      x: -50,
      duration: 0.2,
      stagger: 0.05,
      ease: 'power2.out'
    });

    tl.to('[data-menu-socials], [data-menu-footer]', {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out'
    }, '-=0.2');

    tl.to(menuRef.current, {
      y: '-100%',
      duration: 0.3,
      ease: 'power3.out'
    }, '-=0.2');

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3
    }, '-=0.4');
  };


  // ============================================================================
  // OPEN MENU ANIMATION + ESC + TRAP
  // ============================================================================

  useEffect(() => {

    if (!isOpen || !menuRef.current || !overlayRef.current) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        closeButtonRef.current?.focus();
      }
    });

    timelineRef.current = tl;

    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    });

    tl.fromTo(
      menuRef.current,
      { y: '-100%' },
      { y: '0%', duration: 0.4, ease: 'power3.out' },
      '-=0.2'
    );

    tl.fromTo(
      '[data-menu-link]',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.1 },
      '-=0.3'
    );

    tl.fromTo(
      '[data-menu-socials]',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.2 },
      '-=0.3'
    );

    tl.fromTo(
      '[data-menu-footer]',
      { opacity: 0 },
      { opacity: 1, duration: 0.2 },
      '-=0.2'
    );

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
      handleFocusTrap(e);
    };

    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
      timelineRef.current?.kill();
      timelineRef.current = null;
    };

  }, [isOpen]);


  // ============================================================================
  // RENDER
  // ============================================================================

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-title"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-foreground opacity-0"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={menuRef}
        className="absolute inset-0 bg-muted overflow-y-auto"
        style={{ transform: 'translateY(-100%)' }}
      >
        <div className="min-h-dvh flex flex-col px-6 sm:px-8 md:px-16 lg:px-24 py-8 md:py-12">

          {/* CLOSE */}
          <div className="flex justify-end mb-6 md:mb-8">
            <button
              ref={closeButtonRef}
              onClick={handleClose}
              className="cursor-pointer size-10 md:size-12 rounded-full flex items-center justify-center"
              aria-label="Close menu"
            >
              <Icon icon="ph:x" className="text-4xl md:text-6xl text-background hover:text-secondary transition-colors" />
            </button>
          </div>

          {/* NAV */}
          <nav className="flex-1 flex flex-col lg:flex-row items-start lg:items-center">
            <h2 id="menu-title" className="sr-only">Navigation menu</h2>

            <ul className="w-full max-w-4xl space-y-1 md:space-y-2 mb-8 lg:mb-0">
              {navItems.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <li
                    key={item.title}
                    data-menu-link
                    style={{ opacity: 0 }}
                  >
                    <a
                      href={item.href}
                      onClick={handleClose}
                      className="group flex items-center gap-3 md:gap-6 py-2 md:py-4 transition-all duration-300"
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <div className={`size-2 md:size-3 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-secondary scale-100'
                          : 'bg-transparent border-2 border-muted scale-0 group-hover:scale-100 group-hover:border-secondary'
                      }`} />

                      <span className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-anton uppercase transition-all duration-300 ${
                        isActive
                          ? 'text-secondary'
                          : 'text-accent group-hover:text-foreground group-hover:translate-x-2 md:group-hover:translate-x-4'
                      }`}>
                        {item.title}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <ul
              data-menu-socials
              className="opacity-0 hidden md:flex lg:flex-col gap-4 lg:gap-2 lg:flex-1 lg:text-end flex-wrap"
              aria-label="Social links"
            >
              {socialLinks.map((s) => (
                <li key={s.label} className="font-grotesk uppercase">
                  <a
                    href={s.href}
                    className="text-background hover:text-secondary transition-colors text-sm md:text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            data-menu-footer
            className="opacity-0 mt-auto pt-8 md:pt-12 border-t border-muted/20"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 md:gap-8">

              <div className="flex items-center gap-2">
                <span className="text-background text-sm md:text-base">{t('company.name')}</span>
                <span className="bg-background w-px h-3" />
                <span className="text-background text-sm md:text-base">{new Date().getFullYear()}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-background hover:text-secondary transition-colors text-sm md:text-base"
                >
                  {contactInfo.email}
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
