// app/projects.tsx
// Dedicated full projects listing page with filter by tech stack.

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInLeft,
  ZoomIn,
} from "react-native-reanimated";
import { projects, Project } from "../data/portfolio";

const { width } = Dimensions.get("window");

// ── Collect all unique tech tags ─────────────────────────────────────────────
const ALL_TAGS = ["All", ...Array.from(new Set(projects.flatMap((p) => p.stack)))];

// ── Tech badge ───────────────────────────────────────────────────────────────
function TechBadge({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <View
      style={{
        backgroundColor: accent
          ? "rgba(12, 217, 248, 0.12)"
          : "rgba(10, 212, 243, 0.05)",
        borderWidth: 1,
        borderColor: accent ? "#09d3f1ff" : "rgba(34, 211, 238, 0.15)",
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 3,
        marginRight: 6,
        marginBottom: 6,
      }}
    >
      <Text
        style={{
          color: "#22d3ee",
          fontSize: 11,
          fontFamily: "DMSans_500Medium",
        }}
      >
        {label}
      </Text>
    </View>
  );
}

// ── Project card ─────────────────────────────────────────────────────────────
const ACCENT_COLORS = ["#22d3ee", "#818cf8", "#34d399", "#fbbf24", "#f87171"];

function ProjectCard({ item, index }: { item: Project; index: number }) {
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <Animated.View
      entering={FadeInDown.duration(550).delay(index * 90).springify()}
      style={{
        backgroundColor: "#111120",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#1a1a2e",
        marginBottom: 16,
        overflow: "hidden",
      }}
    >
      {/* Top accent stripe */}
      <View style={{ height: 3, backgroundColor: accentColor }} />

      {/* Number badge */}
      <View
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: "rgba(255,255,255,0.04)",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#1a1a2e",
        }}
      >
        <Text
          style={{
            color: "#475569",
            fontSize: 11,
            fontFamily: "DMSans_500Medium",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </Text>
      </View>

      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontFamily: "Syne_700Bold",
            color: "#f1f5f9",
            fontSize: 18,
            marginBottom: 8,
            paddingRight: 40,
          }}
        >
          {item.title}
        </Text>

        <Text
          style={{
            fontFamily: "DMSans_400Regular",
            color: "#94a3b8",
            fontSize: 14,
            lineHeight: 22,
            marginBottom: 14,
          }}
        >
          {item.description}
        </Text>

        {/* Tech stack */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}>
          {item.stack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: "#1a1a2e",
            marginBottom: 14,
          }}
        />

        {/* Action buttons */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          {item.codeUrl && (
            <TouchableOpacity
              onPress={() => Linking.openURL(item.codeUrl!)}
              activeOpacity={0.7}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#1a1a2e",
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#94a3b8",
                  fontSize: 13,
                  fontFamily: "DMSans_500Medium",
                }}
              >
                Code &gt;=
              </Text>
            </TouchableOpacity>
          )}
          {item.liveUrl && (
            <TouchableOpacity
              onPress={() => Linking.openURL(item.liveUrl!)}
              activeOpacity={0.7}
              style={{
                flex: 1,
                backgroundColor: "rgba(34, 211, 238, 0.08)",
                borderWidth: 1,
                borderColor: "#22d3ee",
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#22d3ee",
                  fontSize: 13,
                  fontFamily: "DMSans_500Medium",
                }}
              >
                Live &lt;~&gt;
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
}

// ── Filter pill ───────────────────────────────────────────────────────────────
function FilterPill({
  label,
  active,
  onPress,
  index,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  index: number;
}) {
  return (
    <Animated.View entering={ZoomIn.duration(350).delay(index * 40).springify()}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          paddingHorizontal: 14,
          paddingVertical: 7,
          borderRadius: 20,
          backgroundColor: active ? "#22d3ee" : "#111120",
          borderWidth: 1,
          borderColor: active ? "#22d3ee" : "#1a1a2e",
          marginRight: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 12,
            color: active ? "#050508" : "#94a3b8",
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function ProjectsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.stack.includes(activeFilter));
  }, [activeFilter]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#050508" }} edges={["top"]}>
      {/* Header bar */}
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

        <View>
          <Text
            style={{
              fontFamily: "Syne_700Bold",
              color: "#f1f5f9",
              fontSize: 20,
            }}
          >
            <Text style={{ color: "#22d3ee" }}>#</Text>projects
          </Text>
          <Text
            style={{
              fontFamily: "DMSans_400Regular",
              color: "#475569",
              fontSize: 12,
            }}
          >
            {filteredProjects.length} of {projects.length} projects
          </Text>
        </View>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {/* Filter pills */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(150).springify()}
          style={{ paddingTop: 20, paddingBottom: 8 }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {ALL_TAGS.slice(0, 14).map((tag, i) => (
              <FilterPill
                key={tag}
                label={tag}
                active={activeFilter === tag}
                onPress={() => setActiveFilter(tag)}
                index={i}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Project count */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(200)}
          style={{ paddingHorizontal: 20, paddingVertical: 12 }}
        >
          <Text
            style={{
              fontFamily: "DMSans_400Regular",
              color: "#475569",
              fontSize: 13,
            }}
          >
            Showing{" "}
            <Text style={{ color: "#22d3ee" }}>{filteredProjects.length}</Text>{" "}
            project{filteredProjects.length !== 1 ? "s" : ""}
            {activeFilter !== "All" ? ` filtered by "${activeFilter}"` : ""}
          </Text>
        </Animated.View>

        {/* Cards */}
        <View style={{ paddingHorizontal: 20 }}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} item={project} index={index} />
            ))
          ) : (
            <Animated.View
              entering={FadeInDown.duration(500).springify()}
              style={{ alignItems: "center", paddingVertical: 60 }}
            >
              <Text style={{ fontSize: 48, marginBottom: 16 }}>🔍</Text>
              <Text
                style={{
                  fontFamily: "Syne_700Bold",
                  color: "#475569",
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                No projects found
              </Text>
              <Text
                style={{
                  fontFamily: "DMSans_400Regular",
                  color: "#1a1a2e",
                  fontSize: 14,
                }}
              >
                Try a different filter
              </Text>
              <TouchableOpacity
                onPress={() => setActiveFilter("All")}
                activeOpacity={0.7}
                style={{ marginTop: 16 }}
              >
                <Text
                  style={{
                    fontFamily: "DMSans_500Medium",
                    color: "#22d3ee",
                    fontSize: 14,
                  }}
                >
                  Clear filter →
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
