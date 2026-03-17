// hooks/useScrollSection.ts
// Tracks which portfolio section is currently in view based on scroll offset.

import { useState, useCallback, useRef } from "react";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";

export type SectionKey = "home" | "projects" | "skills" | "about" | "contact";

interface SectionOffset {
  key: SectionKey;
  offset: number;
}

// Default offsets — these get overridden via onLayout measurements in practice.
const DEFAULT_OFFSETS: SectionOffset[] = [
  { key: "home",     offset: 1   },
  { key: "projects", offset: 920  },
  { key: "skills",   offset: 1900 },
  { key: "about",    offset: 2700 },
  { key: "contact",  offset: 3400 },
];

export function useScrollSection(customOffsets?: SectionOffset[]) {
  const offsets = customOffsets ?? DEFAULT_OFFSETS;
  const [activeSection, setActiveSection] = useState<SectionKey>("home");
  const lastSection = useRef<SectionKey>("home");

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;

      // Walk from the bottom offset up; first match wins.
      const sorted = [...offsets].sort((a, b) => b.offset - a.offset);
      for (const { key, offset } of sorted) {
        if (y >= offset - 80) {
          if (lastSection.current !== key) {
            lastSection.current = key;
            setActiveSection(key);
          }
          return;
        }
      }
    },
    [offsets]
  );

  return { activeSection, handleScroll };
}
