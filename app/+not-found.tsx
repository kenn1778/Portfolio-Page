// app/+not-found.tsx
// Displayed when expo-router cannot match a route.

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#1e2d3dff" }}
      edges={["top"]}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 32,
        }}
      >
        {/* Big 404 */}
        <Animated.Text
          entering={ZoomIn.duration(600).springify()}
          style={{
            fontFamily: "Syne_700Bold",
            fontSize: 96,
            color: "#1a1a2e",
            lineHeight: 96,
            marginBottom: 8,
          }}
        >
          404
        </Animated.Text>

        {/* Accent line */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(200).springify()}
          style={{
            width: 60,
            height: 3,
            backgroundColor: "#0bc0f7ff",
            borderRadius: 2,
            marginBottom: 24,
          }}
        />

        <Animated.Text
          entering={FadeInDown.duration(500).delay(300).springify()}
          style={{
            fontFamily: "Syne_700Bold",
            color: "#faf6e3ff",
            fontSize: 22,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Page not found
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.duration(500).delay(400).springify()}
          style={{
            fontFamily: "DMSans_400Regular",
            color: "#475569",
            fontSize: 14,
            textAlign: "center",
            lineHeight: 22,
            marginBottom: 40,
          }}
        >
          Looks like this route doesn't exist.{"\n"}Let's get you back on track.
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.duration(500).delay(500).springify()}
          style={{ width: "100%" }}
        >
          <TouchableOpacity
            onPress={() => router.replace("/")}
            activeOpacity={0.85}
            style={{
              backgroundColor: "#00ddffff",
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "DMSans_700Bold",
                color: "#163b53ff",
                fontSize: 15,
              }}
            >
              ← Back to portfolio
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
