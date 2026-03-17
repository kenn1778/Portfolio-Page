// app/+html.tsx
// Web-only: injects custom <head> meta tags for SEO and social sharing.
// This file is only used during `expo export --platform web`.

import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";
import { personalInfo } from "../data/portfolio";

export default function HTML({ children }: PropsWithChildren) {
  const title       = `${personalInfo.name} | ${personalInfo.title}`;
  const description = personalInfo.tagline;
  const url         = "https://yourportfolio.com"; // ← update with your domain
  const image       = `${url}/og-image.png`;       // ← add an og-image.png to /public

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* ── Primary ──────────────────────────────────────────────── */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author"      content={personalInfo.name} />
        <meta name="keywords"    content="mobile developer, react native, expo, ios, android, portfolio" />
        <meta name="theme-color" content="#0f2c38ff" />

        {/* ── Open Graph ───────────────────────────────────────────── */}
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={url} />
        <meta property="og:title"       content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image"       content={image} />

        {/* ── Twitter Card ─────────────────────────────────────────── */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:url"         content={url} />
        <meta name="twitter:title"       content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image"       content={image} />

        {/* ── Canonical ────────────────────────────────────────────── */}
        <link rel="canonical" href={url} />

        {/* ── Fonts preload ─────────────────────────────────────────── */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ── Expo scroll reset ─────────────────────────────────────── */}
        <ScrollViewStyleReset />

        {/* ── Custom styles ─────────────────────────────────────────── */}
        <style>{`
          html, body, #root {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #283e53ff;
            overflow: hidden;
          }
          * {
            box-sizing: border-box;
          }
          /* Hide scrollbar on webkit (the RN scroll view handles scrolling) */
          ::-webkit-scrollbar { display: none; }
          body { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
