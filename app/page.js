"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import styles from "./page.module.css";
import Personas from "@/components/Personas";
import JourneyIntro from "@/components/JourneyIntro";
import JourneyStage from "@/components/JourneyStage";
import MarketData from "@/components/MarketData";
import Footer from "@/components/Footer";

// ---------------------------------------------------------------------------
// Asset paths
// ---------------------------------------------------------------------------
const ASSETS = {
  bg: "/assets/ldv-accelerator-bg-only.png",
  vehicles: "/assets/ldv-accelerator-fg-only.png",
  logo: "/assets/speed-logo.png",
};

// ---------------------------------------------------------------------------
// Navigation — objects with label + href so both sides work identically
// ---------------------------------------------------------------------------
const NAV_LEFT = [
  { label: "Intro", href: "#" },
  { label: "Personas", href: "#personas" },
];

const NAV_RIGHT = [
  { label: "Journey", href: "#journey" },
  { label: "Market", href: "#market" },
];

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default function Home() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const navRef = useRef(null);
  const subtitleRef = useRef(null);
  const headlineWrapperRef = useRef(null);
  const vehiclesRef = useRef(null);
  const scrollRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 });

      // 1 — Background Ken-Burns: scale 1.05 → 1
      gsap.set(bgRef.current, { scale: 1.05 });
      tl.to(bgRef.current, {
        scale: 1, duration: 2.2, ease: "power2.out",
      }, 0);

      // 2 — Nav: slide down + fade in
      gsap.set(navRef.current, { autoAlpha: 0, y: -16 });
      tl.to(navRef.current, {
        autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
      }, 0.3);

      // 3 — Subtitle: slide up + fade in
      gsap.set(subtitleRef.current, { autoAlpha: 0, y: 28 });
      tl.to(subtitleRef.current, {
        autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
      }, 0.65);

      // 4 — Headline wrapper (never animate the background-clip:text element directly)
      gsap.set(headlineWrapperRef.current, { autoAlpha: 0, y: 40 });
      tl.to(headlineWrapperRef.current, {
        autoAlpha: 1, y: 0, duration: 1.0, ease: "power4.out",
      }, 0.85);

      // 5 — Vehicles: slide up from below
      gsap.set(vehiclesRef.current, { autoAlpha: 0, y: 60 });
      tl.to(vehiclesRef.current, {
        autoAlpha: 1, y: 0, duration: 1.3, ease: "power3.out",
      }, 1.0);

      // 6 — Scroll indicator: fade in last
      gsap.set(scrollRef.current, { autoAlpha: 0 });
      tl.to(scrollRef.current, {
        autoAlpha: 1, duration: 0.8, ease: "power2.out",
      }, 1.6);
    },
    { scope: heroRef }
  );

  return (
    <>
      <main ref={heroRef} className={styles.hero}>

        {/* Background */}
        <div ref={bgRef} className={styles.bgWrapper}>
          <Image
            src={ASSETS.bg}
            alt=""
            fill
            priority
            quality={90}
            className={styles.bgImage}
            sizes="100vw"
          />
          <div className={styles.bgOverlay} aria-hidden="true" />
        </div>

        {/* Navigation */}
        <nav ref={navRef} className={styles.nav} aria-label="Main navigation">
          <div className={styles.navGroup}>
            {NAV_LEFT.map((item) => (
              <a key={item.label} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </div>

          <div className={styles.navLogo}>
            <Image
              src={ASSETS.logo}
              alt="Speed Accelerator"
              width={120}
              height={48}
              priority
              className={styles.navLogoImage}
            />
          </div>

          <div className={styles.navGroup}>
            {NAV_RIGHT.map((item) => (
              <a key={item.label} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero Copy */}
        <div className={styles.textBlock}>
          <p ref={subtitleRef} className={styles.subtitle}>
            Speed Accelerator Showcase for LDV Automotive
          </p>

          {/*
            headlineWrapper is the GSAP target.
            .headline uses background-clip: text — never animate opacity on it directly
            or the text will disappear after the tween due to a browser compositing bug.
          */}
          <div ref={headlineWrapperRef} className={styles.headlineWrapper}>
            <h1 className={styles.headline}>
              <span>The New Faces</span>
              <span className={styles.headlineLine2}>Of Utility</span>
            </h1>
          </div>
        </div>

        {/* Foreground Vehicles */}
        <div ref={vehiclesRef} className={styles.fgWrapper} aria-hidden="true">
          <Image
            src={ASSETS.vehicles}
            alt="LDV T60 Max, Deliver 9, and Terron 9"
            width={1800}
            height={700}
            quality={95}
            className={styles.fgImage}
            sizes="100vw"
          />
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollRef} className={styles.scrollIndicator} aria-label="Scroll down">
          <span>Scroll down</span>
          <span className={styles.scrollChevron} aria-hidden="true">
            <svg viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1L7 7L13 1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

      </main>

      <Personas />
      <JourneyIntro />
      <JourneyStage />
      <MarketData />
      <Footer />
    </>
  );
}