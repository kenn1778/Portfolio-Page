// components/ScrollProgress.tsx
// Thin animated progress bar at the top of the screen that tracks scroll position.

import React from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  SharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface ScrollProgressProps {
  scrollY: SharedValue<number>;
  contentHeight: number;
  screenHeight: number;
}

export default function ScrollProgress({
  scrollY,
  contentHeight,
  screenHeight,
}: ScrollProgressProps) {
  const maxScroll = contentHeight - screenHeight;

  const barStyle = useAnimatedStyle(() => {
    const progress = maxScroll > 0 ? scrollY.value / maxScroll : 0;
    return {
      width: interpolate(progress, [0, 1], [0, width], "clamp"),
    };
  });

  return (
    <View
      style={{
        position: "absolute",
        top: 1,
        left: 1,
        right: 0,
        height: 2,
        zIndex: 999,
        backgroundColor: "#00ff0dff",
      }}
    >
      <Animated.View
        style={[
          barStyle,
          {
            height: 2,
            backgroundColor: "#02353dff",
            shadowColor: "#eec922ff",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
          },
        ]}
      />
    </View>
  );
}
