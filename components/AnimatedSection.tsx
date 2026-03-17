// components/AnimatedSection.tsx
// Wraps any content in a smooth fade + slide entrance animation.

import React from "react";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
} from "react-native-reanimated";

type Direction = "down" | "left" | "right" | "zoom";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}

export default function AnimatedSection({
  children,
  delay = 0.5,
  direction = "down",
  className,
}: AnimatedSectionProps) {
  const entering = (() => {
    const base =
      direction === "left"
        ? FadeInLeft
        : direction === "right"
        ? FadeInRight
        : direction === "zoom"
        ? ZoomIn
        : FadeInDown;

    return base.duration(600).delay(delay).springify().damping(14);
  })();

  return (
    <Animated.View entering={entering} className={className}>
      {children}
    </Animated.View>
  );
}
