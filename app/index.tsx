// app/index.tsx
// Main portfolio screen. Orchestrates all sections with animated scroll tracking.

import React, { useRef, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import Navbar              from "../components/Navbar";
import HeroSection         from "../components/HeroSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ProjectsSection     from "../components/ProjectsSection";
import SkillsSection       from "../components/SkillsSection";
import AboutSection        from "../components/AboutSection";
import ContactSection      from "../components/ContactSection";
import Footer              from "../components/Footer";
import ScrollProgress      from "../components/ScrollProgress";
import FloatingNav         from "../components/FloatingNav";
import { useScrollSection } from "../hooks/useScrollSection";
import { useAnimatedHeader } from "../hooks/useAnimatedHeader";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SECTION_OFFSETS: Record<string, number> = {
  home:        0,
  projects:    920,
  skills:      1920,
  about:       2720,
  contact:     3440,
};

export default function PortfolioScreen() {
  const router    = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const scrollY   = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(4200);

  const { activeSection, handleScroll } = useScrollSection(
    Object.entries(SECTION_OFFSETS).map(([key, offset]) => ({
      key: key as any,
      offset,
    }))
  );

  const { onScroll: onHeaderScroll } = useAnimatedHeader();

  // ── Scroll handler ───────────────────────────────────────────────
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      scrollY.value = y;
      handleScroll(e);
      onHeaderScroll(y);
    },
    [handleScroll, onHeaderScroll, scrollY]
  );

  // ── Navigation ────────────────────────────────────────────────────────────
  const scrollToSection = useCallback((anchor: string) => {
    const offset = SECTION_OFFSETS[anchor] ?? 0;
    scrollRef.current?.scrollTo({ y: offset, animated: true });
  }, []);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  const onViewAllProjects = useCallback(() => {
    router.push("/projects");
  }, [router]);

  const onReadMoreAbout = useCallback(() => {
    router.push("/about");
  }, [router]);


  // ── Divider helper ────────────────────────────────────────────────────────
  const Divider = () => (
    <View
      style={{
        height: 1,
        backgroundColor: "#1a1a2e",
        marginHorizontal: 24,
      }}
    />
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#151f29ff" }}
      edges={["top"]}
    >
      {/* Scroll progress bar */}
      <ScrollProgress
        scrollY={scrollY}
        contentHeight={contentHeight}
        screenHeight={SCREEN_HEIGHT}
      />

      {/* Sticky navbar */}
      <Navbar onNavPress={scrollToSection} activeSection={activeSection} />

      {/* Main scrollable content */}
      <AnimatedScrollView
        ref={scrollRef as any}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(_w: number, h: number) => setContentHeight(h)}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <HeroSection onContactPress={() => scrollToSection("contact")} />

        <TestimonialsSection />

        <Divider />

        {/* Projects preview — "View all" navigates to /projects */}
        <ProjectsSection onViewAll={onViewAllProjects} preview />

        <Divider />

        <SkillsSection />

        <Divider />

        {/* About preview — "Read more" navigates to /about */}
        <AboutSection onReadMore={onReadMoreAbout} />

        <Divider />

        <ContactSection />

        <Footer />
      </AnimatedScrollView>

      {/* Back-to-top FAB */}
      <FloatingNav scrollY={scrollY} onPress={scrollToTop} />
    </SafeAreaView>
  );
}
