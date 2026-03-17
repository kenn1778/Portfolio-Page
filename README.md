# 📱 Mobile Developer Portfolio

A beautiful, animated, dark-themed portfolio app built with **Expo 54**, **React Native**, and **NativeWind (TailwindCSS)**. Designed to showcase your mobile development career — deployable to iOS, Android, and Web.

---

## ✨ Features

- 🌙 Sleek dark theme with cyan & indigo accent palette
- 🎬 Smooth entrance animations (Reanimated 3)
- 📊 Scroll-driven progress bar
- 🧭 Active-section navbar with hashtag-style links
- 🃏 Swipeable testimonials carousel
- 🗂️ Project cards with tech badges + live/code links
- 🏷️ Colour-coded skills by category
- 📬 Contact section with direct mailto / tel / social links
- ⬆️ Floating back-to-top button
- 📱 Fully mobile responsive (iOS, Android, Web)
- 🔤 Google Fonts: Syne + DM Sans

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Personalise your data
Open `data/portfolio.ts` and replace every placeholder value with your real information:
- `personalInfo` — name, title, bio, email, phone, socials
- `projects` — your real projects (add `liveUrl`, `codeUrl`, `image`)
- `testimonials` — references from colleagues
- `skills` — your actual tech stack

### 3. Replace placeholder images
Drop your images into `assets/images/`:
| File | Purpose |
|------|---------|
| `icon.png` | App icon (1024×1024 px) |
| `splash.png` | Splash screen (1284×2778 px) |
| `adaptive-icon.png` | Android adaptive icon foreground |
| `favicon.png` | Web favicon (48×48 px) |

### 4. Run the app
```bash
# Start dev server (scan QR with Expo Go)
npm start

# iOS simulator
npm run ios

# Android emulator
npm run android

# Web browser
npm run web
```

---

## 📦 Project Structure

```
my-portfolio/
├── app/
│   ├── _layout.tsx        # Root layout: fonts, splash, navigation
│   └── index.tsx          # Main portfolio screen
├── components/
│   ├── Navbar.tsx          # Sticky top nav with active section tracking
│   ├── HeroSection.tsx     # Full-height hero with animated orbs
│   ├── TestimonialsSection.tsx  # Horizontal scroll carousel
│   ├── ProjectsSection.tsx # Project cards with badges
│   ├── SkillsSection.tsx   # Colour-coded skill categories
│   ├── AboutSection.tsx    # Bio, avatar, current project
│   ├── ContactSection.tsx  # Email, phone, socials CTA
│   ├── Footer.tsx          # Socials + copyright
│   ├── AnimatedSection.tsx # Reusable entrance animation wrapper
│   ├── ScrollProgress.tsx  # Thin progress bar at top
│   └── FloatingNav.tsx     # Back-to-top FAB
├── data/
│   └── portfolio.ts        # ← ALL your content lives here
├── assets/
│   └── images/             # icon, splash, favicon
├── global.css              # Tailwind directives
├── tailwind.config.js      # Custom colours & fonts
├── metro.config.js         # NativeWind integration
├── babel.config.js         # Reanimated + NativeWind presets
└── app.json                # Expo config
```

---

## 🌐 Web Deployment (Netlify / Vercel)

### Build
```bash
npm run build:web
```
This generates a static site in the `dist/` folder.

### Netlify
1. Push your repo to GitHub
2. Connect repo on [netlify.com](https://netlify.com)
3. Build command: `npm run build:web`
4. Publish directory: `dist`

### Vercel
```bash
npx vercel --prod
```

---

## 📲 Mobile App Deployment

### EAS Build (recommended)
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform all
```

### Expo Go (dev preview)
Just run `npm start` and scan the QR code with the [Expo Go](https://expo.dev/go) app.

---

## 🎨 Customisation

### Change accent colour
Edit `tailwind.config.js` → `theme.extend.colors.accent` (default: `#22d3ee`).

### Add a new section
1. Create `components/YourSection.tsx`
2. Import it in `app/index.tsx`
3. Add an entry to `SECTION_OFFSETS` in `app/index.tsx`
4. Add a nav item to the `NAV_ITEMS` array in `components/Navbar.tsx`

---

## 🛠 Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| Expo | ~54.0 | Build & deployment platform |
| React Native | 0.77 | Cross-platform mobile framework |
| NativeWind | ^4.1 | TailwindCSS for React Native |
| Reanimated | ~3.16 | Smooth 60fps animations |
| Expo Router | ~4.0 | File-based navigation |
| Google Fonts | — | Syne + DM Sans |

---

## 📄 License

MIT — use freely for your personal portfolio.
