// components/AboutSection.tsx
// About me section with bio, current project, and profile illustration.

import React from "react";
import { View, Text, TouchableOpacity, Linking, Image } from "react-native";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import SectionHeader from "./SectionHeader";
import AnimatedSection from "./AnimatedSection";
import { personalInfo } from "../data/portfolio";

// SVG-style avatar placeholder rendered in RN (now with profile image)
function AvatarBlock() {
  return (
    <Animated.View
      entering={FadeInRight.duration(700).delay(300).springify()}
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 32,
      }}
    >
      <View
        style={{
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: "#111120",
          borderWidth: 2,
          borderColor: "#f17a0bff",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#ffffffff",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.35,
          shadowRadius: 24,
          elevation: 10,
          overflow: "hidden", // Ensure image stays rounded
        }}
      >
        <Image
          source={require("../assets/images/Pofile-Image.jpg")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>

      {/* Decorative ring */}
      <View
        style={{
          position: "absolute",
          width: 210,
          height: 210,
          borderRadius: 105,
          borderWidth: 1,
          borderColor: "rgba(34,211,238,0.15)",
          borderStyle: "dashed",
        }}
      />
      <View
        style={{
          position: "absolute",
          width: 240,
          height: 240,
          borderRadius: 120,
          borderWidth: 1,
          borderColor: "rgba(129,140,248,0.1)",
        }}
      />
    </Animated.View>
  );
}

interface AboutSectionProps {
  onReadMore?: () => void;
}

export default function AboutSection({ onReadMore }: AboutSectionProps) {
  return (
    <View className="py-16 px-6">
      <SectionHeader
        title="About-Me"
        subtitle="A little background on who I am"
      />

      <AvatarBlock />

      <AnimatedSection delay={200} direction="down" className="mt-10">
        <Text
          className="text-primary text-xl mb-4"
          style={{ fontFamily: "Syne_700Bold",color: "#ff5100ff" }}
        >
          Hello, I'm {personalInfo.name.split(" ")[0]}!
        </Text>

        <Text
          className="text-secondary text-base leading-7 mb-4"
          style={{ fontFamily: "DMSans_400Regular",color: "#ffffffff" }}
        >
          {personalInfo.bio}
        </Text>

        <Text
          className="text-secondary text-base leading-7 mb-6"
          style={{ fontFamily: "DMSans_400Regular",color: "#ff7b00ff" }}
        >
          I'm constantly exploring new mobile patterns, design systems, and
          performance techniques to push my craft forward. I care deeply about
          developer experience as much as user experience.
        </Text>

        {/* Location badge */}
        <View
          className="flex-row items-center gap-2 mb-8"
          style={{
            backgroundColor: "#111120",
            borderWidth: 1,
            borderColor: "#1a1a2e",
            borderRadius: 8,
            paddingHorizontal: 14,
            paddingVertical: 10,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ fontSize: 16 }}>📍</Text>
          <Text
            className="text-secondary text-sm"
            style={{ fontFamily: "DMSans_500Medium" }}
          >
            {personalInfo.location}
          </Text>
        </View>

        {/* Currently working on */}
        <View
          style={{
            backgroundColor: "rgba(34, 211, 238, 0.05)",
            borderWidth: 1,
            borderColor: "rgba(247, 150, 5, 0.2)",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <Text
            className="text-muted text-xs uppercase tracking-widest mb-2"
            style={{ fontFamily: "DMSans_500Medium",color: "#ffe600ff" }}
          >
            Currently working on
          </Text>
          <TouchableOpacity
            onPress={() =>
              personalInfo.currentProjectUrl &&
              Linking.openURL(personalInfo.currentProjectUrl)
            }
            activeOpacity={0.7}
          >
            <Text
              className="text-accent text-base"
              style={{ fontFamily: "Syne_700Bold" ,color: "#ffffffff"}}
            >
              {personalInfo.currentProject} ↗
            </Text>
          </TouchableOpacity>
        </View>

        {/* Read More */}
        {onReadMore && (
          <TouchableOpacity
            onPress={onReadMore}
            activeOpacity={0.7}
            style={{
              borderWidth: 1,
              borderColor: "#f7a000ff",
              borderRadius: 10,
              paddingVertical: 14,
              alignItems: "center",
              marginTop: 16,
              backgroundColor: "rgba(34,211,238,0.04)",
            }}
          >
            <Text
              style={{
                fontFamily: "DMSans_500Medium",
                color: "#ee6322ff",
                fontSize: 14,
              }}
            >
              Read more about me →
            </Text>
          </TouchableOpacity>
        )}
      </AnimatedSection>
    </View>
  );
}
