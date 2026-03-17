// components/Navbar.tsx
// Fixed top navigation bar with backdrop blur effect.

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

type NavItem = { label: string; anchor: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home",     anchor: "home" },
  { label: "Projects", anchor: "projects" },
  { label: "Skills",   anchor: "skills" },
  { label: "About",    anchor: "about" },
  { label: "Contact",  anchor: "contact" },
];

interface NavbarProps {
  onNavPress?: (anchor: string) => void;
  activeSection?: string;
}

export default function Navbar({ onNavPress, activeSection = "home" }: NavbarProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(100)}
      className="absolute top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(25, 35, 43, 0.85)",
        borderBottomWidth: 1,
        borderBottomColor: "#ffae00ff",
      }}
    >
      <View className="flex-row items-center justify-between px-5 py-4">
        {/* Logo */}
        <Text
          className="text-accent text-lg"
          style={{ fontFamily: "Syne_700Bold" ,color: "#ff5e00ff" }}
        >
          &lt;JK /&gt;
        </Text>

        {/* Nav links – horizontal scroll on small screens */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 4 }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.anchor;
            return (
              <TouchableOpacity
                key={item.anchor}
                onPress={() => onNavPress?.(item.anchor)}
                className="px-3 py-1 rounded-full"
                style={{
                  backgroundColor: isActive
                    ? "rgba(4, 238, 63, 0.1)"
                    : "transparent",
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    fontFamily: "DMSans_500Medium",
                    color: isActive ? "#5eff00ff" : "#94a3b8",
                    fontSize: 13,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </Animated.View>
  );
}
