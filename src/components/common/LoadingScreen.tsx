import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const MIN_LOADING_TIME = 800;
const MAX_LOADING_TIME = 4000;

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoAnim = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    let minTime = false;
    let videoReady = false;
    let hidden = false; // Prevent multiple calls

    /** Logo breathing animation */
    if (logoRef.current) {
      logoAnim.current = gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.3,
        }
      );
    }

    /** Try hiding when both conditions meet */
    const tryHide = () => {
      if (!minTime || !videoReady || hidden || !loaderRef.current) return;
      hidden = true;

      logoAnim.current?.kill();

      const tl = gsap.timeline();

      // Dispatch event when fade-out animation starts
      tl.add(() => {
        window.dispatchEvent(new CustomEvent("app:ready"));
      });

      // Fade-out and slide-up animations
      tl.to(logoRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.25,
        ease: "power2.in",
      });

      tl.to(
        loaderRef.current,
        {
          y: "-100%",
          duration: 0.75,
          ease: "power3.inOut",
          onComplete: () => {
            // Unmount component
            setIsLoading(false);
          },
        },
        "-=0.1"
      );
    };

    /** Min time */
    const minTimer = setTimeout(() => {
      minTime = true;
      tryHide();
    }, MIN_LOADING_TIME);

    /** Max time fallback */
    const maxTimer = setTimeout(() => {
      minTime = true;
      videoReady = true;
      tryHide();
    }, MAX_LOADING_TIME);

    /** Detect video */
    const checkVideo = () => {
      const video = document.querySelector("video");

      if (!video) {
        videoReady = true;
        tryHide();
        return;
      }

      if (video.readyState >= 2) {
        videoReady = true;
        tryHide();
      } else {
        video.addEventListener(
          "loadeddata",
          () => {
            videoReady = true;
            tryHide();
          },
          { once: true }
        );
      }
    };

    checkVideo();
    const recheckTimer = setTimeout(checkVideo, 120);

    /** Cleanup */
    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      clearTimeout(recheckTimer);
      logoAnim.current?.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 bg-secondary flex items-center justify-center"
    >
      <img
        ref={logoRef}
        src="/images/logo.webp"
        alt="Loading..."
        className="w-32 md:w-40 h-auto"
      />
    </div>
  );
};
