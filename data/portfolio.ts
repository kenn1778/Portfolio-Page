// ─────────────────────────────────────────────────────────────────────────────
// data/portfolio.ts
// ─────────────────────────────────────────────────────────────────────────────
// Replace all placeholder values with your real information.
// ─────────────────────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Alozie Johnkennedy Izuchukwu",
  title: "Mobile App Developer",
  tagline:
    "Building seamless, performant, and beautiful cross-platform mobile experiences.",
  bio: "Detail-oriented mobile developer with a great passion for crafting intuitive UI, smooth animations, and dynamic user experiences. Specialising in React Native and Expo, with strong expertise in iOS and Android deployment.",
  email: "johnkennedyalozie177@gmail.com",
  phone: "+234 7086193675",
  location: "Lagos, Nigeria",
  linkedin: "https://www.linkedin.com/in/johnkennedy-alozie-060073158?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  github: "https://github.com/yourusername",
  twitter: "https://twitter.com/yourhandle",
  currentProject: "Your Current App",
  currentProjectUrl: "https://yourproject.com",
};

// ─────────────────────────────────────────────────────────────────────────────
// Skills
// ─────────────────────────────────────────────────────────────────────────────
export const skills = {
  Languages:   ["JavaScript", "TypeScript", "", "", ""],
  Frameworks:  ["React Native", "Expo", "", "Next.js", "Node.js", "Express"],
  Tools:       ["Git", "GitHub", "Xcode", "Android Studio", "VS Code", "", ""],
  Database:    ["Firebase", "SQLite", "MongoDB", "PostgreSQL", "Realm"],
  Others:      ["REST APIs", "GraphQL", "Push Notifications", "App Store", "Play Store", "CI/CD"],
};

// ─────────────────────────────────────────────────────────────────────────────
// Projects
// ─────────────────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  codeUrl?: string;
  image?: string; // local require() or remote URI string
}

export const projects: Project[] = [
  {
    id: "1",
    title: "FinTrack – Budget App",
    description:
      "A personal finance tracker that lets users monitor expenses, set budgets, and visualise spending habits with interactive charts.",
    stack: ["React Native", "Expo", "TypeScript", "Firebase", "Reanimated"],
    liveUrl: "https://yourapp.com",
    codeUrl: "https://github.com/yourusername/fintrack",
  },
  {
    id: "2",
    title: "ShopEase – E-Commerce",
    description:
      "A cross-platform shopping app featuring product browsing, cart management, Paystack payments, and real-time order tracking.",
    stack: ["React Native", "Expo Router", "Redux", "Paystack", "Node.js"],
    liveUrl: "https://shopease.app",
    codeUrl: "https://github.com/yourusername/shopease",
  },
  {
    id: "3",
    title: "FitPulse – Fitness Tracker",
    description:
      "A health and fitness app with workout plans, progress tracking, step counter integration, and motivational push notifications.",
    stack: ["Expo", "HealthKit", "SQLite", "TypeScript", "NativeWind"],
    liveUrl: "https://fitpulse.app",
    codeUrl: "https://github.com/yourusername/fitpulse",
  },
  {
    id: "4",
    title: "ChatBox – Real-time Chat",
    description:
      "A full-featured messaging app with real-time communication, read receipts, media sharing, and encrypted conversations.",
    stack: ["React Native", "Socket.io", "Node.js", "MongoDB", "Expo"],
    liveUrl: "https://chatbox.app",
    codeUrl: "https://github.com/yourusername/chatbox",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  avatar?: string; // local require() or remote URI string
  linkedin?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Michael Adeyemi",
    role: "Product Manager",
    location: "Lagos, Nigeria",
    text: "An exceptional mobile developer. Delivered a pixel-perfect, performant app ahead of schedule. The attention to animation and micro-interaction detail was remarkable — our users noticed immediately.",
    linkedin: "https://linkedin.com/in/michaeladeyemi",
  },
  {
    id: "2",
    name: "Sandra Okonkwo",
    role: "Engineering Lead",
    location: "Abuja, Nigeria",
    text: "One of the most reliable and technically strong developers I've worked with. Takes feedback constructively, iterates fast, and never compromises on code quality. A true asset to any team.",
    linkedin: "https://linkedin.com/in/sandraokonkwo",
  },
  {
    id: "3",
    name: "James Nwosu",
    role: "CTO, TechStart",
    location: "Port Harcourt, Nigeria",
    text: "Brought our React Native app from concept to production in record time. Great communicator, proactive problem-solver, and the UI they built genuinely wows our clients every time.",
    linkedin: "https://linkedin.com/in/jamesnwosu",
  },
  {
    id: "4",
    name: "Amina Bello",
    role: "Co-founder, AppLab",
    location: "Kano, Nigeria",
    text: "Working with them was a delight. The codebase is clean, well-documented, and easy to extend. They reduced our QA cycles by half through rigorous testing and attention to edge cases.",
    linkedin: "https://linkedin.com/in/aminabello",
  },
];
