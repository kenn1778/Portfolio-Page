// hooks/useAnimatedHeader.ts
// Returns an animated style that hides/shows the header based on scroll direction.

import { useRef } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const HEADER_HEIGHT = 60;
const SCROLL_UP_THRESHOLD = 10;

export function useAnimatedHeader() {
  const scrollY     = useSharedValue(0);
  const prevScrollY = useRef(0);
  const headerShown = useSharedValue(1); // 1 = visible, 0 = hidden

  const onScroll = (y: number) => {
    const diff = y - prevScrollY.current;

    if (y < 80) {
      // Always show near the top
      headerShown.value = withTiming(1, { duration: 200 });
    } else if (diff > SCROLL_UP_THRESHOLD) {
      // Scrolling down — hide
      headerShown.value = withTiming(0, { duration: 200 });
    } else if (diff < -SCROLL_UP_THRESHOLD) {
      // Scrolling up — show
      headerShown.value = withTiming(1, { duration: 200 });
    }

    prevScrollY.current = y;
    scrollY.value = y;
  };

  const headerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          headerShown.value,
          [0, 1],
          [-HEADER_HEIGHT, 0]
        ),
      },
    ],
  }));

  return { scrollY, onScroll, headerStyle };
}
