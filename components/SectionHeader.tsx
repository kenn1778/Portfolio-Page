// components/SectionHeader.tsx
// Reusable section heading in the "#section-name" style.

import React from "react";
import { View, Text } from "react-native";
import AnimatedSection from "./AnimatedSection";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <AnimatedSection delay={100} direction="left" className="mb-8">
      <Text
        className="text-primary text-3xl"
        style={{ fontFamily: "Syne_700Bold", fontSize: 32 }}
      >
        <Text style={{ color: "#031f24ff" }}>#</Text>
        {title}
      </Text>
      {subtitle && (
        <Text
          className="text-secondary text-sm mt-2"
          style={{ fontFamily: "DMSans_400Regular" }}
        >
          {subtitle}
        </Text>
      )}
      {/* Decorative underline */}
      <View className="flex-row mt-3 gap-1">
        <View style={{ width: 40, height: 2, backgroundColor: "#f70505ff", borderRadius: 1 }} />
        <View style={{ width: 10, height: 2, backgroundColor: "#ffc400ff", borderRadius: 1 }} />
      </View>
    </AnimatedSection>
  );
}
