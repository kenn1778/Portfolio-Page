// components/ContactSection.tsx
// Contact info with email, phone, social links and a mailto shortcut.

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import SectionHeader from "./SectionHeader";
import AnimatedSection from "./AnimatedSection";
import { personalInfo } from "../data/portfolio";

interface ContactLinkProps {
  icon: string;
  label: string;
  value: string;
  onPress: () => void;
  delay: number;
}

function ContactLink({ icon, label, value, onPress, delay }: ContactLinkProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(delay).springify()}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#1c232bff",
          borderWidth: 1,
          borderColor: "#ffffffff",
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          gap: 14,
        }}
      >
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>{icon}</Text>
        </View>
        <View className="flex-1">
          <Text
            className="text-muted text-xs uppercase tracking-wider mb-0.5"
            style={{ fontFamily: "DMSans_500Medium" }}
          >
            {label}
          </Text>
          <Text
            className="text-accent text-sm"
            style={{ fontFamily: "DMSans_500Medium" }}
            numberOfLines={1}
          >
            {value}
          </Text>
        </View>
        <Text className="text-muted" style={{ fontSize: 16 }}>
          ↗
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function ContactSection() {
  return (
    <View
      className="py-10 px-6 color-white"
      style={{ backgroundColor: "rgba(12, 12, 20, 0.6)" }}
    >
      <SectionHeader
        title="<Contact />"
        subtitle="Let's build something great together"
      />

      <AnimatedSection delay={100} direction="down" className="mb-8">
        <Text
          className="text-secondary text-base leading-7"
          style={{ fontFamily: "DMSans_400Regular", maxWidth: 460 ,color: "#ff7b00ff"}}
        >
          I'm open to exciting mobile development projects, freelance
          opportunities, and full-time roles. If you have an idea or a challenge,
          don't hesitate to reach out — let's talk.
        </Text>
      </AnimatedSection>

      <ContactLink
        icon="✉️"
        label="Email"
        value={personalInfo.email}
        onPress={() => Linking.openURL(`mailto:${personalInfo.email}`)}
        delay={150}
      />
      <ContactLink
        icon="📱"
        label="Phone / WhatsApp"
        value={personalInfo.phone}
        onPress={() => Linking.openURL(`tel:${personalInfo.phone}`)}
        delay={220}
      />
      <ContactLink
        icon="💼"
        label="LinkedIn"
        value="Connect on LinkedIn"
        onPress={() => Linking.openURL(personalInfo.linkedin)}
        delay={290}
      />
      <ContactLink
        icon="🐙"
        label="GitHub"
        value="Browse my repositories"
        onPress={() => Linking.openURL(personalInfo.github)}
        delay={360}
      />
      {personalInfo.twitter && (
        <ContactLink
          icon="🐦"
          label="Twitter / X"
          value="Follow me"
          onPress={() => Linking.openURL(personalInfo.twitter)}
          delay={430}
        />
      )}

      {/* Big CTA */}
      <Animated.View
        entering={FadeInDown.duration(700).delay(500).springify()}
        className="mt-6"
      >
        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:${personalInfo.email}`)}
          activeOpacity={0.85}
          style={{
            backgroundColor: "#032c47ff",
            borderRadius: 12,
            paddingVertical: 18,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "DMSans_700Bold",
              color: "#ffffffff",
              fontSize: 16,
            }}
          >
            Reach out →
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
