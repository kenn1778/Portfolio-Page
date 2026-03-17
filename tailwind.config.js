/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./data/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // ── Background layers ──────────────────────────────────────────
        background: "#050508",
        surface:    "#0c0c14",
        card:       "#111120",
        border:     "#1a1a2e",
        // ── Brand accent ───────────────────────────────────────────────
        accent:     "#22d3ee",   // cyan-400  – primary highlight
        indigo:     "#818cf8",   // indigo-400 – secondary accent
        // ── Typography ─────────────────────────────────────────────────
        primary:    "#f1f5f9",
        secondary:  "#94a3b8",
        muted:      "#475569",
        // ── Tags / badges ──────────────────────────────────────────────
        tag:        "#0d2231",
        "tag-text": "#22d3ee",
      },
      fontFamily: {
        syne:    ["Syne_700Bold"],
        "syne-m":["Syne_600SemiBold"],
        "syne-r":["Syne_400Regular"],
        dm:      ["DMSans_400Regular"],
        "dm-m":  ["DMSans_500Medium"],
        "dm-b":  ["DMSans_700Bold"],
      },
    },
  },
  plugins: [],
};
