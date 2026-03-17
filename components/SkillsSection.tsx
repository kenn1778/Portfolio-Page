// components/SkillsSection.tsx
// Categorised skills displayed as badge grids.

import React from "react";
import { View, Text, ScrollView } from "react-native";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import SectionHeader from "./SectionHeader";
import { skills } from "../data/portfolio";

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Languages:  { bg: "rgba(12, 217, 248, 0.06)",  border: "rgba(12, 217, 248, 0.2)",  text: "#0bd3f1ff" },
  Frameworks: { bg: "rgba(129, 140, 248, 0.06)", border: "rgba(129, 140, 248, 0.2)", text: "#818cf8" },
  Tools:      { bg: "rgba(52, 211, 153, 0.06)",  border: "rgba(52, 211, 153, 0.2)",  text: "#34d399" },
  Database:   { bg: "rgba(251, 191, 36, 0.06)",  border: "rgba(251, 191, 36, 0.2)",  text: "#fbbf24" },
  Others:     { bg: "rgba(248, 113, 113, 0.06)", border: "rgba(248, 113, 113, 0.2)", text: "#f87171" },
};

function SkillBadge({
  label,
  color,
  delay,
}: {
  label: string;
  color: (typeof CATEGORY_COLORS)[string];
  delay: number;
}) {
  return (
    <Animated.View
      entering={ZoomIn.duration(400).delay(delay).springify()}
      style={{
        backgroundColor: color.bg,
        borderWidth: 1,
        borderColor: color.border,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      <Text
        style={{
          color: color.text,
          fontSize: 13,
          fontFamily: "DMSans_500Medium",
        }}
      >
        {label}
      </Text>
    </Animated.View>
  );
}

function CategoryBlock({
  category,
  items,
  cardIndex,
}: {
  category: string;
  items: string[];
  cardIndex: number;
}) {
  const color = CATEGORY_COLORS[category] ?? CATEGORY_COLORS["Others"];

  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(cardIndex * 120).springify()}
      style={{
        backgroundColor: "#111120",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#1a1a2e",
        padding: 18,
        marginBottom: 14,
      }}
    >
      <Text
        className="mb-4"
        style={{
          fontFamily: "Syne_700Bold",
          color: color.text,
          fontSize: 14,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        {category}
      </Text>

      <View className="flex-row flex-wrap">
        {items.map((skill, idx) => (
          <SkillBadge
            key={skill}
            label={skill}
            color={color}
            delay={cardIndex * 120 + idx * 50}
          />
        ))}
      </View>
    </Animated.View>
  );
}

export default function SkillsSection() {
  return (
    <View
      className="py-16 px-6"
      style={{ backgroundColor: "rgba(12, 12, 20, 0.6)" }}
    >
      <SectionHeader
        title="Skills"
        subtitle="Technologies I work with daily"
      />
      {Object.entries(skills).map(([category, items], index) => (
        <CategoryBlock
          key={category}
          category={category}
          items={items}
          cardIndex={index}
        />
      ))}
    </View>
  );
}
