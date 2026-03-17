// components/FloatingNav.tsx
// Small floating action button in the bottom-right corner for scrolling to top.

import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  SharedValue,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

interface FloatingNavProps {
  scrollY: SharedValue<number>;
  onPress: () => void;
}

export default function FloatingNav({ scrollY, onPress }: FloatingNavProps) {
  const btnStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 200], [0, 1], "clamp"),
    transform: [
      {
        scale: interpolate(scrollY.value, [0, 200], [0.6, 1], "clamp"),
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        btnStyle,
        {
          position: "absolute",
          bottom: 32,
          right: 24,
          zIndex: 100,
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: "#ffffffff",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#ffffffff",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <Text style={{ color: "#050508", fontSize: 20, fontWeight: "700" }}>
          ↑
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
