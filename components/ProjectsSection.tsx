// components/ProjectsSection.tsx
// Grid / stack of project cards with tech badges and action links.

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import SectionHeader from "./SectionHeader";
import { projects, Project } from "../data/portfolio";

function TechBadge({ label }: { label: string }) {
  return (
    <View
      style={{
        backgroundColor: "rgba(34, 211, 238, 0.07)",
        borderWidth: 1,
        borderColor: "rgba(34, 211, 238, 0.18)",
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 3,
        marginRight: 6,
        marginBottom: 6,
      }}
    >
      <Text
        style={{
          color: "#ee2922ff",
          fontSize: 11,
          fontFamily: "DMSans_500Medium",
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function ProjectCard({ item, index }: { item: Project; index: number }) {
  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(index * 100).springify()}
      style={{
        backgroundColor: "#111120",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#ff8800ff",
        marginBottom: 16,
        overflow: "hidden",
      }}
    >
      {/* Colourful top stripe */}
      <View
        style={{
          height: 3,
          backgroundColor: index % 2 === 0 ? "#ff8800ff" : "#00ff15ff",
        }}
      />

      <View style={{ padding: 20 }}>
        {/* Title */}
        <Text
          className="text-primary text-lg mb-2"
          style={{ fontFamily: "Syne_700Bold",color: "#ff7b00ff" }}
        >
          {item.title}
        </Text>

        {/* Description */}
        <Text
          className="text-secondary text-sm leading-6 mb-4"
          style={{ fontFamily: "DMSans_400Regular",color: "#354042ff" }}
        >
          {item.description}
        </Text>

        {/* Tech stack */}
        <View className="flex-row flex-wrap mb-4">
          {item.stack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </View>

        {/* Action buttons */}
        <View className="flex-row gap-3">
          {item.codeUrl && (
            <TouchableOpacity
              onPress={() => Linking.openURL(item.codeUrl!)}
              activeOpacity={0.7}
              style={{
                borderWidth: 1,
                borderColor: "#1a1a2e",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 6,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Text
                style={{
                  color: "#3e444dff",
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
                backgroundColor: "rgba(34, 211, 238, 0.1)",
                borderWidth: 1,
                borderColor: "#00ff15ff",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  color: "#ac8404ff",
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

interface ProjectsSectionProps {
  onViewAll?: () => void;
  preview?: boolean;
}

export default function ProjectsSection({ onViewAll, preview = false }: ProjectsSectionProps) {
  const displayed = preview ? projects.slice(0, 3) : projects;

  return (
    <View className="py-16 px-6">
      <SectionHeader
        title="Projects"
        subtitle="Here are some of my recent projects"
      />

      {displayed.map((project, index) => (
        <ProjectCard key={project.id} item={project} index={index} />
      ))}

      {preview && onViewAll && (
        <Animated.View entering={FadeInDown.duration(500).delay(380).springify()}>
          <TouchableOpacity
            onPress={onViewAll}
            activeOpacity={0.7}
            style={{
              borderWidth: 1,
              borderColor: "#ff6600ff",
              borderRadius: 10,
              paddingVertical: 14,
              alignItems: "center",
              marginTop: 4,
              backgroundColor: "rgba(34,211,238,0.04)",
            }}
          >
            <Text
              style={{
                fontFamily: "DMSans_500Medium",
                color: "#ffffffff",
                fontSize: 14,
              }}
            >
              View more projects ~~&gt;
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}
