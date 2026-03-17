// components/Footer.tsx
// Simple footer with name, tagline, social links and copyright.

import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import AnimatedSection from "./AnimatedSection";
import { personalInfo } from "../data/portfolio";

const SOCIALS = [
  { label: "GitHub",   url: personalInfo.github   },
  { label: "LinkedIn", url: personalInfo.linkedin  },
  { label: "Twitter",  url: personalInfo.twitter   },
  { label: "Email",    url: `mailto:${personalInfo.email}` },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <AnimatedSection
      delay={100}
      direction="down"
    >
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#ff7300ff",
          paddingHorizontal: 24,
          paddingVertical: 32,
          backgroundColor: "#0c0c14",
        }}
      >
        {/* Logo */}
        <Text
          className="text-accent text-xl mb-1"
          style={{ fontFamily: "Syne_700Bold",color: "#ff1e00ff" }}
        >
          &lt;{personalInfo.name.split(" ")[0]} /&gt;
        </Text>

        <Text
          className="text-secondary text-sm mb-6 "
          style={{ fontFamily: "DMSans_400Regular",color: "#00ff00ff" }}
        >
          {personalInfo.title}
        </Text>

        {/* Social row */}
        <View className="flex-row flex-wrap gap-4 mb-8">
          {SOCIALS.filter((s) => s.url).map((social) => (
            <TouchableOpacity
              key={social.label}
              onPress={() => Linking.openURL(social.url)}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  fontFamily: "DMSans_500Medium",
                  color: "#ff7b00ff",
                  fontSize: 13,
                }}
              >
                {social.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: "#00ff40ff",
            marginBottom: 16,
          }}
        />

        {/* Copyright */}
        <View className="flex-row justify-between flex-wrap gap-2">
          <Text
            className="text-muted text-xs"
            style={{ fontFamily: "DMSans_400Regular" }}
          >
            © Copyright {year}, {personalInfo.name}
          </Text>
          <Text
            className="text-muted text-xs"
            style={{ fontFamily: "DMSans_400Regular",color: "#51ff00ff" }}
          >
            The measure of a man, What he does with power !
          </Text>
        </View>
      </View>
    </AnimatedSection>
  );
}
