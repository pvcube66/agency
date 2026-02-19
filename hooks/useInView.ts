"use client";

import { useEffect, useRef, useState } from "react";

// Global observer map to share observers across components with same options
const observerMap = new Map<string, IntersectionObserver>();

interface UseSharedInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useSharedInView({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: UseSharedInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create unique key for this observer configuration
    const key = `${threshold}-${rootMargin}`;
    
    // Get or create shared observer
    let observer = observerMap.get(key);
    
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement & { _onInView?: (inView: boolean) => void };
            target._onInView?.(entry.isIntersecting);
          });
        },
        { threshold, rootMargin }
      );
      observerMap.set(key, observer);
    }

    // Store callback on element
    (element as HTMLElement & { _onInView?: (inView: boolean) => void })._onInView = (inView: boolean) => {
      if (inView) {
        setIsInView(true);
        if (triggerOnce && observer) {
          observer.unobserve(element);
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    };

    observer.observe(element);

    return () => {
      if (observer) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export function useTypewriter(text: string, speed: number = 50, startDelay: number = 0) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const { ref, isInView } = useSharedInView({ threshold: 0.5, triggerOnce: true });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || isComplete) return;
    
    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsComplete(true);
      return;
    }

    let index = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [isInView, text, speed, startDelay, prefersReducedMotion, isComplete]);

  return { displayText, isComplete, ref };
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    let rafId: number;
    let lastScrollY = 0;

    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
        
        if (Math.abs(scrollProgress - lastScrollY) > 0.001) {
          setProgress(scrollProgress);
          lastScrollY = scrollProgress;
        }
        rafId = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return progress;
}

// Hook for optimized RAF-based animations
export function useRAF(callback: (time: number) => void, active: boolean = true) {
  const callbackRef = useRef(callback);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

    let lastTime = 0;
    const animate = (time: number) => {
      // Throttle to ~60fps
      if (time - lastTime >= 16) {
        callbackRef.current(time);
        lastTime = time;
      }
      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [active]);
}

// Hook for intersection-based lazy loading
export function useLazyLoad<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, []);

  return { ref, isVisible };
}
