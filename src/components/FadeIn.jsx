import React from "react";
import useInView from "../hooks/useInView";

export default function FadeIn({
  as: Tag = "div",
  children,
  className = "",
  animate = "fade-in-up",
  delay = 0,
  threshold = 0.15,
  once = false,
  ...rest
}) {
  const { ref, inView } = useInView({ threshold, once });

  const animClass =
    animate === "fade-in"
      ? "motion-safe:animate-fade-in"
      : "motion-safe:animate-fade-in-up";

  const initialClasses =
    animate === "fade-in-up" ? "opacity-0 translate-y-4" : "opacity-0";

  return (
    <Tag
      ref={ref}
      className={[
        initialClasses,
        "motion-reduce:opacity-100 motion-reduce:translate-y-0",
        inView ? animClass : "",
        className,
      ].join(" ")}
      style={inView ? { animationDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}