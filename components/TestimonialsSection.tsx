// components/TestimonialsSection.tsx
// Horizontally scrollable testimonial cards with navigation buttons.

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import Animated, { FadeInRight, FadeInUp } from "react-native-reanimated";
import SectionHeader from "./SectionHeader";
import { testimonials, Testimonial } from "../data/portfolio";

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.min(width - 48, 340);
const GAP = 16;
const SNAP_INTERVAL = CARD_WIDTH + GAP;

function TestimonialCard({
  item,
  index,
}: {
  item: Testimonial;
  index: number;
}) {
  return (
    <Animated.View
      entering={FadeInRight.duration(600).delay(index * 120).springify()}
      style={{ width: CARD_WIDTH, marginRight: GAP }}
    >
      <View
        style={{
          backgroundColor: "#121a24ff",
          borderRadius: 16,
          padding: 22,
          borderWidth: 1,
          borderColor: "#ff2600ff",
          flex: 1,
        }}
      >
        {/* Quote mark */}
        <Text
          style={{
            fontSize: 48,
            lineHeight: 40,
            color: "#ee8522ff",
            fontFamily: "Syne_700Bold",
            opacity: 0.4,
            marginBottom: 8,
          }}
        >
          "
        </Text>

        <Text
          className="text-secondary text-sm leading-6 mb-5"
          style={{ fontFamily: "DMSans_400Regular" ,color: "#345263ff"}}
        >
          {item.text}
        </Text>

        {/* Author */}
        <View className="flex-row items-center gap-3">
          {/* Avatar placeholder */}
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "#1a1a2e",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1.5,
              borderColor: "#ffa600ff",
            }}
          >
            <Text
              style={{
                color: "#ff5e00ff",
                fontSize: 16,
                fontFamily: "Syne_700Bold",
              }}
            >
              {item.name.charAt(0)}
            </Text>
          </View>

          <View className="flex-1">
            <TouchableOpacity
              onPress={() => item.linkedin && Linking.openURL(item.linkedin)}
              activeOpacity={0.7}
            >
              <Text
                className="text-primary text-sm"
                style={{ fontFamily: "DMSans_700Bold",color: "#fcfcfcff" }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
            <Text
              className="text-muted text-xs mt-0.5"
              style={{ fontFamily: "DMSans_400Regular" ,color: "#2bff00ff"}}
            >
              {item.role}
            </Text>
            <Text
              className="text-accent text-xs"
              style={{ fontFamily: "DMSans_400Regular",color: "#ff7b00ff" }}
            >
              {item.location}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default function TestimonialsSection() {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SNAP_INTERVAL);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= testimonials.length) return;
    scrollRef.current?.scrollTo({
      x: index * SNAP_INTERVAL,
      animated: true,
    });
    setActiveIndex(index);
  };

  return (
    <View className="py-16 px-6">
      <SectionHeader
        title="Testimonials"
        subtitle="What colleagues and clients say"
      />

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 24 }}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {testimonials.map((item, index) => (
          <TestimonialCard key={item.id} item={item} index={index} />
        ))}
      </ScrollView>

      {/* Navigation Buttons */}
      <Animated.View 
        entering={FadeInUp.delay(400).duration(800)}
        className="flex-row items-center justify-center mt-8 gap-4"
      >
        <TouchableOpacity
          onPress={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: activeIndex === 0 ? "#1a1a2e" : "#22d3ee20",
            borderWidth: 1,
            borderColor: activeIndex === 0 ? "#1a1a2e" : "#ee6d22ff",
            alignItems: "center",
            justifyContent: "center",
            opacity: activeIndex === 0 ? 0.5 : 1,
          }}
          activeOpacity={0.7}
        >
          <Text style={{ color: "#22d3ee", fontSize: 20, fontWeight: "600" }}>
            ←
          </Text>
        </TouchableOpacity>

        <View className="flex-row gap-1.5">
          {testimonials.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: i === activeIndex ? "#22d3ee" : "#1a1a2e",
              }}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === testimonials.length - 1}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: activeIndex === testimonials.length - 1 ? "#1a1a2e" : "#22d3ee20",
            borderWidth: 1,
            borderColor: activeIndex === testimonials.length - 1 ? "#1a1a2e" : "#22d3ee",
            alignItems: "center",
            justifyContent: "center",
            opacity: activeIndex === testimonials.length - 1 ? 0.5 : 1,
          }}
          activeOpacity={0.7}
        >
          <Text style={{ color: "#22d3ee", fontSize: 20, fontWeight: "600" }}>
            →
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
