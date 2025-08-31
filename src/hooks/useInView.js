import { useEffect, useRef, useState } from "react";

export default function useInView({
  root = null,
  rootMargin = "0px",
  threshold = 0.15,
  once = true,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) obs.unobserve(e.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { root, rootMargin, threshold }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [root, rootMargin, threshold, once]);

  return { ref, inView };
}