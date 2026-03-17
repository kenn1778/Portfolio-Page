// app/about.tsx
// Expanded about / résumé page with experience timeline, education, and full bio.

import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import { personalInfo, skills } from "../data/portfolio";

// ── Experience timeline entry ─────────────────────────────────────────────────
interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  stack: string[];
}

// TODO: Replace with your real experience
const EXPERIENCE: Experience[] = [
  {
    role: "Senior Mobile Developer",
    company: "Your Company",
    period: "2023 – Present",
    description:
      "Lead developer for cross-platform mobile applications. Architected and shipped several React Native apps from zero to production on both App Store and Play Store.",
    stack: ["React Native", "Expo", "TypeScript", "Firebase"],
  },
  {
    role: "React Native Developer",
    company: "Previous Company",
    period: "2021 – 2023",
    description:
      "Built and maintained consumer-facing mobile apps with 50k+ downloads. Reduced app startup time by 40% through lazy loading and bundle splitting optimisations.",
    stack: ["React Native", "Redux", "Node.js", "PostgreSQL"],
  },
  {
    role: "Frontend Developer",
    company: "Startup Studio",
    period: "2019 – 2021",
    description:
      "Developed responsive web applications and transitioned the team into mobile-first development using React Native. Mentored two junior developers.",
    stack: ["React", "Next.js", "JavaScript", "TailwindCSS"],
  },
];

// ── Education ─────────────────────────────────────────────────────────────────
const EDUCATION = [
  {
    degree: "B.Sc. Computer Science",
    institution: "University of Lagos",
    period: "2015 – 2019",
    detail: "First Class Honours. Final-year project: Cross-platform mobile framework benchmarking.",
  },
];

// ── Stat pill ─────────────────────────────────────────────────────────────────
function StatPill({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(delay).springify()}
      style={{
        flex: 1,
        backgroundColor: "#111120",
        borderWidth: 1,
        borderColor: "#1a1a2e",
        borderRadius: 14,
        padding: 16,
        alignItems: "center",
        minWidth: 90,
      }}
    >
      <Text
        style={{
          fontFamily: "Syne_700Bold",
          color: "#22d3ee",
          fontSize: 28,
          lineHeight: 32,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: "DMSans_400Regular",
          color: "#475569",
          fontSize: 11,
          textAlign: "center",
          marginTop: 4,
        }}
      >
        {label}
      </Text>
    </Animated.View>
  );
}

// ── Timeline dot + line ───────────────────────────────────────────────────────
function TimelineDot({ accent = false }: { accent?: boolean }) {
  return (
    <View
      style={{
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: accent ? "#22d3ee" : "#1a1a2e",
        borderWidth: 2,
        borderColor: accent ? "#22d3ee" : "#1a1a2e",
        marginTop: 6,
        marginRight: 14,
        flexShrink: 0,
      }}
    />
  );
}

// ── Experience card ───────────────────────────────────────────────────────────
function ExperienceCard({
  item,
  index,
  isLast,
}: {
  item: Experience;
  index: number;
  isLast: boolean;
}) {
  return (
    <Animated.View
      entering={FadeInLeft.duration(600).delay(index * 120).springify()}
      style={{ flexDirection: "row", paddingLeft: 4 }}
    >
      {/* Timeline line + dot */}
      <View style={{ alignItems: "center" }}>
        <TimelineDot accent={index === 0} />
        {!isLast && (
          <View
            style={{
              width: 1,
              flex: 1,
              backgroundColor: "#1a1a2e",
              marginTop: 4,
              marginBottom: -8,
            }}
          />
        )}
      </View>

      {/* Content */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#111120",
          borderRadius: 14,
          borderWidth: 1,
          borderColor: "#1a1a2e",
          padding: 16,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "Syne_700Bold",
              color: "#f1f5f9",
              fontSize: 15,
            }}
          >
            {item.role}
          </Text>
          <Text
            style={{
              fontFamily: "DMSans_400Regular",
              color: "#475569",
              fontSize: 12,
            }}
          >
            {item.period}
          </Text>
        </View>

        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            color: "#22d3ee",
            fontSize: 13,
            marginBottom: 10,
          }}
        >
          {item.company}
        </Text>

        <Text
          style={{
            fontFamily: "DMSans_400Regular",
            color: "#94a3b8",
            fontSize: 13,
            lineHeight: 20,
            marginBottom: 12,
          }}
        >
          {item.description}
        </Text>

        {/* Stack chips */}
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {item.stack.map((tech) => (
            <View
              key={tech}
              style={{
                backgroundColor: "rgba(34,211,238,0.06)",
                borderWidth: 1,
                borderColor: "rgba(34,211,238,0.15)",
                borderRadius: 4,
                paddingHorizontal: 8,
                paddingVertical: 3,
                marginRight: 6,
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  color: "#22d3ee",
                  fontSize: 11,
                  fontFamily: "DMSans_500Medium",
                }}
              >
                {tech}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#050508" }} edges={["top"]}>
      {/* Header */}
      <Animated.View
        entering={FadeInLeft.duration(500).springify()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: "#1a1a2e",
          backgroundColor: "rgba(5,5,8,0.9)",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: "#111120",
            borderWidth: 1,
            borderColor: "#1a1a2e",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 14,
          }}
        >
          <Text style={{ color: "#94a3b8", fontSize: 18 }}>←</Text>
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "Syne_700Bold", color: "#f1f5f9", fontSize: 20 }}
        >
          <Text style={{ color: "#22d3ee" }}>#</Text>about-me
        </Text>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
      >
        {/* Avatar + name block */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(100).springify()}
          style={{ alignItems: "center", paddingVertical: 32 }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#111120",
              borderWidth: 2,
              borderColor: "#22d3ee",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              shadowColor: "#22d3ee",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.4,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            <Text
              style={{
                fontFamily: "Syne_700Bold",
                fontSize: 40,
                color: "#22d3ee",
              }}
            >
              {personalInfo.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Syne_700Bold",
              color: "#f1f5f9",
              fontSize: 22,
              marginBottom: 4,
            }}
          >
            {personalInfo.name}
          </Text>
          <Text
            style={{
              fontFamily: "DMSans_500Medium",
              color: "#22d3ee",
              fontSize: 14,
            }}
          >
            {personalInfo.title}
          </Text>
          <Text
            style={{
              fontFamily: "DMSans_400Regular",
              color: "#475569",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            📍 {personalInfo.location}
          </Text>
        </Animated.View>

        {/* Stats row */}
        <View
          style={{ flexDirection: "row", gap: 10, marginBottom: 28 }}
        >
          <StatPill value="5+" label="Years experience" delay={200} />
          <StatPill value="20+" label="Apps shipped"    delay={280} />
          <StatPill value="10+" label="Happy clients"   delay={360} />
        </View>

        {/* Bio */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(300).springify()}
          style={{ marginBottom: 32 }}
        >
          <Text
            style={{
              fontFamily: "Syne_700Bold",
              color: "#f1f5f9",
              fontSize: 18,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "#22d3ee" }}>#</Text> Bio
          </Text>
          <Text
            style={{
              fontFamily: "DMSans_400Regular",
              color: "#94a3b8",
              fontSize: 14,
              lineHeight: 24,
              marginBottom: 12,
            }}
          >
            {personalInfo.bio}
          </Text>
          <Text
            style={{
              fontFamily: "DMSans_400Regular",
              color: "#94a3b8",
              fontSize: 14,
              lineHeight: 24,
            }}
          >
            Outside of coding I enjoy reading about software architecture, contributing to
            open-source tools, and mentoring junior developers breaking into mobile engineering.
          </Text>
        </Animated.View>

        {/* Experience */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(400).springify()}
          style={{ marginBottom: 8 }}
        >
          <Text
            style={{
              fontFamily: "Syne_700Bold",
              color: "#f1f5f9",
              fontSize: 18,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "#22d3ee" }}>#</Text> Experience
          </Text>

          {EXPERIENCE.map((exp, index) => (
            <ExperienceCard
              key={exp.company + exp.period}
              item={exp}
              index={index}
              isLast={index === EXPERIENCE.length - 1}
            />
          ))}
        </Animated.View>

        {/* Education */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(500).springify()}
          style={{ marginBottom: 32 }}
        >
          <Text
            style={{
              fontFamily: "Syne_700Bold",
              color: "#f1f5f9",
              fontSize: 18,
              marginBottom: 16,
            }}
          >
            <Text style={{ color: "#22d3ee" }}>#</Text> Education
          </Text>

          {EDUCATION.map((edu) => (
            <View
              key={edu.degree}
              style={{
                backgroundColor: "#111120",
                borderRadius: 14,
                borderWidth: 1,
                borderColor: "#1a1a2e",
                padding: 16,
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Syne_700Bold",
                    color: "#f1f5f9",
                    fontSize: 15,
                  }}
                >
                  {edu.degree}
                </Text>
                <Text
                  style={{
                    fontFamily: "DMSans_400Regular",
                    color: "#475569",
                    fontSize: 12,
                  }}
                >
                  {edu.period}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "DMSans_500Medium",
                  color: "#22d3ee",
                  fontSize: 13,
                  marginBottom: 6,
                }}
              >
                {edu.institution}
              </Text>
              <Text
                style={{
                  fontFamily: "DMSans_400Regular",
                  color: "#94a3b8",
                  fontSize: 13,
                  lineHeight: 20,
                }}
              >
                {edu.detail}
              </Text>
            </View>
          ))}
        </Animated.View>

        {/* Download CV CTA */}
        <Animated.View entering={FadeInDown.duration(600).delay(600).springify()}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:${personalInfo.email}?subject=CV Request`)}
            activeOpacity={0.85}
            style={{
              backgroundColor: "#0c6803ff",
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "DMSans_700Bold",
                color: "#050508",
                fontSize: 15,
              }}
            >
              Request my CV →
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
