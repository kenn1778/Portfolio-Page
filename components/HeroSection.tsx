// components/HeroSection.tsx
// Full-height hero with name, title, bio, and CTA.

import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInLeft,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { personalInfo } from "../data/portfolio";

const { height } = Dimensions.get("window");

// Floating decorative orb that pulses gently
function GlowOrb({
  top,
  left,
  size,
  color,
  delay,
}: {
  top: number;
  left?: number;
  right?: number;
  size: number;
  color: string;
  delay: number;
}) {
  const opacity = useSharedValue(0.15);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.4, { duration: 2400 + delay, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        animStyle,
        {
          position: "absolute",
          top,
          left,
          right: left === undefined ? 0 : undefined,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        } as any,
      ]}
    />
  );
}

interface HeroSectionProps {
  onContactPress?: () => void;
}

export default function HeroSection({ onContactPress }: HeroSectionProps) {
  return (
    <View
      style={{ minHeight: height * 0.92 }}
      className="justify-center px-6 pt-24 pb-16 relative overflow-hidden"
    >
      {/* Decorative glow orbs */}
      <GlowOrb top={-60} left={-40}  size={260} color="#ff7b00ff" delay={0}    />
      <GlowOrb top={60} left={225}  size={60} color="#924904ff" delay={0}    />
      <GlowOrb top={200} left={200}  size={130} color="#ff0000ff" delay={600}  />
      <GlowOrb top={200} left={110}  size={90} color="#ffffffff" delay={600}  />
      <GlowOrb top={400} left={-20}  size={140} color="#3f3333ff" delay={1200} />
      <GlowOrb top={400} left={120}  size={100} color="#4d4c4aff" delay={1200} />
      <GlowOrb top={400} left={220}  size={80} color="#bbb9b6ff" delay={1200} />

      {/* Grid texture overlay */}
      <View
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
        } as any}
      />

      {/* Content */}
      <Animated.View entering={FadeInLeft.duration(700).delay(200).springify()}>
        <Text
          className="text-accent text-sm mb-3 tracking-widest uppercase"
          style={{ fontFamily: "DMSans_500Medium",color: "#ffffffff" }}
        >
          Available for hire
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInLeft.duration(700).delay(350).springify()}>
        <Text
          className="text-primary text-4xl leading-tight mb-2"
          style={{ fontFamily: "Syne_700Bold", fontSize: 42, lineHeight: 50 ,color: "#ff7b00ff"}}
        >
          {personalInfo.name}
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInLeft.duration(700).delay(480).springify()}>
        <Text
          className="text-accent text-xl mb-5"
          style={{ fontFamily: "Syne_600SemiBold",color: "#ffffffff" }}
        >
          {personalInfo.title}
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInLeft.duration(700).delay(600).springify()}>
        <Text
          className="text-secondary text-base leading-7 mb-8"
          style={{ fontFamily: "DMSans_400Regular", maxWidth: 480 ,color: "#989987ff"}}
        >
          {personalInfo.tagline}
        </Text>
      </Animated.View>

      {/* CTA Buttons */}
      <Animated.View
        entering={FadeInDown.duration(600).delay(750).springify()}
        className="flex-row gap-3 flex-wrap mb-1"
      >
        <TouchableOpacity
          onPress={onContactPress}
          activeOpacity={0.8}
          style={{
            backgroundColor: "#ff7300ff",
            paddingHorizontal: 28,
            paddingVertical: 14,
            borderRadius: 8,
          }}
        >
          <Text
            style={{ fontFamily: "DMSans_700Bold", color: "#ffffffff", fontSize: 15 }}
          >
            Contact me!
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL(personalInfo.github)}
          activeOpacity={0.8}
          style={{
            borderWidth: 1,
            borderColor: "#db7807ff",
            paddingHorizontal: 28,
            paddingVertical: 14,
            borderRadius: 8,
          }}
        >
          <Text
            style={{ fontFamily: "DMSans_500Medium", color: "#ffffffff", fontSize: 15 }}
          >
            View GitHub
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Floating quote */}
      <Animated.View
        entering={FadeInDown.duration(700).delay(900).springify()}
        className="mt-14"
        style={{
          borderLeftWidth: 2,
          borderLeftColor: "#ec7f01ff",
          paddingLeft: 16,
          maxWidth: 460,
        }}
      >
        <Text
          className="text-muted italic text-sm leading-6"
          style={{ fontFamily: "DMSans_400Regular", color: "#f88f05ff" }}
        >
          "Code is like humor. When you have to explain it, it's bad."
        </Text>
        <Text
          className="text-accent text-xs mt-2"
          style={{ fontFamily: "DMSans_500Medium",color: "#ff0000ff" }}
        >
          — Cory House
        </Text>
      </Animated.View>
    </View>
  );
}
