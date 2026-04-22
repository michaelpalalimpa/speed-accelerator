"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./Personas.module.css";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "ute",
    label: "UTE Intenders",
    themeClass: styles.themeLight,        // --ldv-orange-50 bg
    cardThemeClass: styles.cardBackLight, // card-back bg
    personas: [
      {
        id: "ute-1",
        name: "First Home Renovator",
        image: "/assets/UTE-first-home-renovator.png",
        quote: "'I want to tackle our own renovations and build our future, but I do not want a vehicle that feels like a tradie workhorse on the grocery run.'",
        trigger: " Calculating the accumulated costs of hire vehicles and removalists.",
        barrier: "'Intimidated by traditional ute culture and partner practicality concerns.'",
        goal: "Build long-term financial independence through DIY projects.",
        channels: "Instagram/TikTok DIY creators, Reddit (r/AusFinance).",
      },
      {
        id: "ute-2",
        name: "Weekend Adventurer",
        image: "/assets/UTE-the-weekend-adventurer.png",
        quote: "'My weekends are for chasing trails, but I need something that fits my gear without making me look like a lifted-ute cliché.'",
        trigger: "A new pursuit requiring more cargo or outgrowing their current SUV.",
        barrier: "Fear of the bro stigma and concerns over fuel economy.",
        goal: "Live a richer life through adventure access and spontaneity.",
        channels: "Adventure YouTube, Strava, AllTrails, ticketed trail events.",
      },
      {
        id: "ute-3",
        name: "Hobby Farmer",
        image: "/assets/UTE-the-hobby-farmer.png",
        quote: "'This tree-change is a dream, but I need a reliable hauler that doesn't require a mechanic's degree to understand the spec sheet.'",
        trigger: "An incident like getting bogged, or a new rural project requiring hauling.",
        barrier: "Overwhelmed by spec sheets, tow ratings, and dealer service access.",
        goal: "Fulfill a tree change dream and earn credibility with rural neighbors.",
        channels: "Hobby farmer Facebook groups, landcare podcasts, rural dealer workshops.",
      },
    ],
  },
  {
    id: "suv",
    label: "Large SUV Intenders",
    themeClass: styles.themeMid,
    cardThemeClass: styles.cardBackMid,
    personas: [
      {
        id: "suv-1",
        name: "Blended Household",
        image: "/assets/SUV-blended-household.png",
        quote: "'We need a unified solution that stops the arguments over legroom, without feeling like we're driving a bus.'",
        trigger: "A teenager refusing to fold into the third row, or shifting co-parenting schedules.",
        barrier: "Complex seating requirements and negotiating tastes between two drivers.",
        goal: "Reduce household transport friction and find a vehicle everyone feels ownership of.",
        channels: "Modern parenting podcasts, family blogger Reels, school Facebook groups.",
      },
      {
        id: "suv-2",
        name: "Road Trip Romantic",
        image: "/assets/SUV-road-trip-romantic.png",
        quote: "'We want cabin comfort for a two-day interstate drive, not twelve cup holders for kids we don't have.'",
        trigger: "A bucket-list trip approaching or feeling boxed-in by a sedan on long drives.",
        barrier: "Overwhelmed by family SUV marketing that entirely misses their use case.",
        goal: "Accumulate shared travel experiences comfortably and spontaneously.",
        channels: "Travel blog newsletters, regional tourism YouTube, audiobooks.",
      },
      {
        id: "suv-3",
        name: "Teen Driver's Parent",
        image: "/assets/SUV-teen-driver-parent.png",
        quote: "'I need a safe, smart investment for us now that won't be too indulgent when we hand the keys to our teenager.'",
        trigger: "Teen passing the learner's test or shocking insurance quotes.",
        barrier: "Split priorities between a current family driver and a future teen driver.",
        goal: "Protect their child with a safe vehicle while making a smart multi-year investment.",
        channels: "P-plate parenting groups, driver safety content, school newsletters.",
      },
    ],
  },
  {
    id: "van",
    label: "Van Intenders",
    themeClass: styles.themeDark,
    cardThemeClass: styles.cardBackDark,
    personas: [
      {
        id: "van-1",
        name: "Creative Studio Operator",
        image: "/assets/VAN-creative-studio-operator.png",
        quote: "'My van is my mobile studio; it needs to protect my gear and project absolute professionalism when I pull up to a client.'",
        trigger: "A larger contract requiring on-location gear, or realizing tax lease benefits.",
        barrier: "Equipment security and fearing a van signals tradie instead of creative.",
        goal: "Project a professional brand and scale the business without renting trucks.",
        channels: "Creative industry Instagram, YouTube gear reviews, Discord communities.",
      },
      {
        id: "van-2",
        name: "Community Support Provider",
        image: "/assets/VAN-Community-support-provider.png",
        quote: "'I need reliable, accessible transport that fits tight funding margins so I can provide dignified care without downtime.'",
        trigger: "A new client with heavier mobility equipment or aging vehicle reliability issues.",
        barrier: "Tight budgets from funding constraints and strict accessibility requirements.",
        goal: "Deliver consistent, dignified care while managing the business sustainably.",
        channels: "NDIS provider networks, allied health associations, LinkedIn.",
      },
      {
        id: "van-3",
        name: "Pop-Up Entrepreneur",
        image: "/assets/VAN-Pop-up-entrepreneur.png",
        quote: "'I am setting up shop dozens of times a year; I need a vehicle that reduces my physical fatigue and scales with my business.'",
        trigger: "Invitations to more market events or a quiet mid-week slot becoming recurring.",
        barrier: "Highly variable cash flow and setup/pack-down times affecting profit.",
        goal: "Scale into a sustainable primary income while reducing physical fatigue.",
        channels: "Small-business Instagram, market organizer groups, Shopify newsletters.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PERSONA CARD
// ─────────────────────────────────────────────────────────────────────────────

function PersonaCard({ persona, cardBackClass }) {
  return (
    <div className={styles.cardScene}>
      <div className={styles.card}>

        {/* FRONT */}
        <div className={styles.cardFront}>
          <div className={styles.cardImageWrapper}>
            <Image
              src={persona.image}
              alt={persona.name}
              fill
              sizes="(max-width: 768px) 90vw, 30vw"
              className={styles.cardImage}
            />
          </div>
          <div className={styles.cardFrontOverlay}>
            <p className={styles.cardHoverHint}>Hover for more info</p>
            <h4 className={styles.cardName}>{persona.name}</h4>
            <p className={styles.cardQuote}>{persona.quote}</p>
          </div>
        </div>

        {/* BACK */}
        <div className={`${styles.cardBack} ${cardBackClass}`}>
          <div className={styles.cardBackInner}>
            <h4 className={styles.cardBackName}>{persona.name}</h4>
            <div className={styles.cardBackDivider} />
            <div className={styles.cardBackRow}>
              <span className={styles.cardBackLabel}>Trigger</span>
              <p className={styles.cardBackValue}>{persona.trigger}</p>
            </div>
            <div className={styles.cardBackRow}>
              <span className={styles.cardBackLabel}>Barrier</span>
              <p className={styles.cardBackValue}>{persona.barrier}</p>
            </div>
            <div className={styles.cardBackRow}>
              <span className={styles.cardBackLabel}>Goal</span>
              <p className={styles.cardBackValue}>{persona.goal}</p>
            </div>
            <div className={styles.cardBackRow}>
              <span className={styles.cardBackLabel}>Channels</span>
              <p className={styles.cardBackValue}>{persona.channels}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function Personas() {
  const sectionRef = useRef(null);
  // We pin the pinTrack divs (full-width), not the visual card inside
  const trackRefs = useRef([]);
  trackRefs.current = [];

  const addTrackRef = (el) => {
    if (el && !trackRefs.current.includes(el)) {
      trackRefs.current.push(el);
    }
  };

  useGSAP(
    () => {
      const tracks = trackRefs.current;
      if (!tracks.length) return;

      tracks.forEach((track, i) => {
        ScrollTrigger.create({
          trigger: track,
          start: "top top",
          // Hold the pin until every subsequent track has scrolled past
          end: () => `+=${(tracks.length - i - 1) * track.offsetHeight}`,
          pin: true,
          pinSpacing: false,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className={styles.personas} id="personas">

      {/* Section Header */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>The Humans Behind the Wheel</h2>
        <p className={styles.headerSubtext}>
          Beyond the demographics, these are the new intenders driving category growth.
        </p>
      </div>

      {/* Stacking blocks — pinTrack is full-width (GSAP target),
          categoryBlock inside is the narrower visual card */}
      {CATEGORIES.map((cat) => (
        <div
          key={cat.id}
          ref={addTrackRef}
          className={styles.pinTrack}
        >
          <div className={`${styles.categoryBlock} ${cat.themeClass}`}>
            <div className={styles.categoryInner}>
              <h3 className={styles.categoryTitle}>{cat.label}</h3>
              <div className={styles.cardGrid}>
                {cat.personas.map((persona) => (
                  <PersonaCard
                    key={persona.id}
                    persona={persona}
                    cardBackClass={cat.cardThemeClass}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

    </section>
  );
}