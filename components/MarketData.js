"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MarketData.module.css";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const MOMENTUM_ROWS = [
  { label: "Female identifying UTE intenders", left: 14, right: 29 },
  { label: "Buyers who first researched online", left: 68, right: 91 },
  { label: "Intenders who test drove >1 brand", left: 82, right: 54 },
  { label: "Intenders open to non-legacy brands", left: 31, right: 67 },
];

const RESEARCH_SEGMENTS = [
  { pct: 34, label: "Long form video", color: "var(--ldv-orange-900)", textColor: "var(--ldv-orange-50)" },
  { pct: 19, label: "Peer & community forums", color: "var(--ldv-orange-700)", textColor: "var(--ldv-orange-50)" },
  { pct: 14, label: "Print & radio", color: "var(--ldv-orange-500)", textColor: "var(--ldv-orange-50)" },
  { pct: 12, label: "Short-form social", color: "var(--ldv-orange-400)", textColor: "var(--ldv-orange-50)" },
  { pct: 9, label: "Paid comparison sites", color: "var(--ldv-orange-300)", textColor: "var(--ldv-orange-50)" },
  { pct: 7, label: "Brand-owned websites", color: "var(--ldv-orange-200)", textColor: "var(--ldv-gray-700)" },
  { pct: 5, label: "In-person dealer visits", color: "var(--ldv-gray-100)", textColor: "var(--ldv-gray-700)" },
];

const RESEARCH_CARDS = [
  {
    tag: "Short form social",
    body: "Driven by viral moments and lifestyle imagery. Younger buyers are finding the segment here.",
    bg: "var(--ldv-orange-500)",
    textColor: "var(--ldv-orange-50)",
    tagTextColor: "var(--ldv-orange-900)",
  },
  {
    tag: "Long-form video",
    body: "Deep dives into specs and real-world testing. Long-form video is the new Virtual Test Drive.",
    bg: "var(--ldv-orange-900)",
    textColor: "var(--ldv-orange-50)",
    tagTextColor: "var(--ldv-orange-900)",
  },
  {
    tag: "Peer & community forums",
    body: "Validation through peers and forums. Regional buyers, in particular, look for social proof.",
    bg: "var(--ldv-orange-700)",
    textColor: "var(--ldv-orange-50)",
    tagTextColor: "var(--ldv-orange-900)",
  },
  {
    tag: "In person dealer visits",
    body: "The dealership visit. The decision is usually made before arrival. It is a check-box exercise.",
    bg: "var(--ldv-gray-100)",
    textColor: "var(--ldv-gray-800)",
    tagTextColor: "var(--ldv-gray-700)",
  },
];

const INVESTMENT_CARDS = [
  { label: "AWARENESS", pct: 35, sub: "Long-form video, CTV, social", bg: "var(--ldv-orange-500)" },
  { label: "CONSIDERATION", pct: 40, sub: "Short-form social, influencer", bg: "var(--ldv-orange-600)" },
  { label: "CONVERSION", pct: 20, sub: "Retargeting, comparison tools", bg: "var(--ldv-orange-700)" },
  { label: "RETENTION & ADVOCACY", pct: 35, sub: "Owner community, referral", bg: "var(--ldv-orange-900)" },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function fadeUp(el, delay = 0) {
  if (!el) return;
  gsap.fromTo(el,
    { autoAlpha: 0, y: 36 },
    {
      autoAlpha: 1, y: 0, duration: 1, delay, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 70%", once: true },
    }
  );
}

function rollNum(el, target, suffix = "") {
  if (!el) return;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target, duration: 1.6, ease: "power2.out",
    onUpdate: () => { el.innerText = Math.round(obj.val) + suffix; },
    scrollTrigger: { trigger: el, start: "top 72%", once: true },
  });
}

function expandBar(el, targetPct) {
  if (!el) return;
  gsap.fromTo(el,
    { width: "0%" },
    {
      width: targetPct + "%", duration: 1.5, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 75%", once: true },
    }
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({ year2023, year2026, label, badge }) {
  const numRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    fadeUp(cardRef.current);
    const target = parseInt(String(year2026).split("/")[0]);
    rollNum(numRef.current, target);
  }, { scope: cardRef });

  const old2023 = String(year2023);
  const new2026 = String(year2026);
  const isSlash = new2026.includes("/");

  return (
    <div ref={cardRef} className={styles.statCard}>
      {/* Green growth badge */}
      {badge && (
        <div className={styles.statBadgeRow}>
          <span className={styles.statBadge}>&darr; {badge}</span>
        </div>
      )}

      {/* Inline year comparison: 2023 [old strikethrough]  2026 [new big] */}
      <div className={styles.statCompareLine}>
        <span className={styles.statOldYear}>2023</span>
        <span className={styles.statOldNum}>{old2023}</span>
        <span className={styles.statNewYear}>2026</span>
        {isSlash ? (
          <span className={styles.statBig}>
            <span ref={numRef} className={styles.statNum}>0</span>
            <span className={styles.statSlash}>/{new2026.split("/")[1]}</span>
          </span>
        ) : (
          <span ref={numRef} className={styles.statNum}>0</span>
        )}
      </div>

      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

function MomentumRow({ row, index }) {
  const leftBarRef = useRef(null);
  const rightBarRef = useRef(null);
  const leftNumRef = useRef(null);
  const rightNumRef = useRef(null);
  const rowRef = useRef(null);

  useGSAP(() => {
    fadeUp(rowRef.current, index * 0.1);
    // Bars expand outward from the axis centre
    gsap.fromTo(leftBarRef.current,
      { width: "0%" },
      {
        width: row.left + "%", duration: 1.5, ease: "power3.out",
        scrollTrigger: { trigger: rowRef.current, start: "top 72%", once: true }
      }
    );
    gsap.fromTo(rightBarRef.current,
      { width: "0%" },
      {
        width: row.right + "%", duration: 1.5, ease: "power3.out",
        scrollTrigger: { trigger: rowRef.current, start: "top 72%", once: true }
      }
    );
    rollNum(leftNumRef.current, row.left, "%");
    rollNum(rightNumRef.current, row.right, "%");
  }, { scope: rowRef });

  return (
    <div ref={rowRef} className={styles.momentumRow}>
      {/* Single joined bar track — left grey grows rightward from centre, right orange grows rightward */}
      <div className={styles.barTrack}>
        {/* Left half: grey bar grows toward centre (right-aligned in left half) */}
        <div className={styles.barHalfLeft}>
          <div ref={leftBarRef} className={styles.barLeft} style={{ width: 0 }}>
            <span ref={leftNumRef} className={styles.barLabel}>0%</span>
          </div>
        </div>
        {/* Centre axis line */}
        <div className={styles.momentumAxis} />
        {/* Right half: orange bar grows away from centre (left-aligned in right half) */}
        <div className={styles.barHalfRight}>
          <div ref={rightBarRef} className={styles.barRight} style={{ width: 0 }}>
            <span ref={rightNumRef} className={`${styles.barLabel} ${styles.barLabelRight}`}>0%</span>
          </div>
        </div>
      </div>
      <p className={styles.momentumLabel}>{row.label}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function MarketData() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const momentumRef = useRef(null);
  const researchRef = useRef(null);
  const investRef = useRef(null);
  const quoteRef = useRef(null);

  // Research card refs (for stagger animation)
  const researchCardRefs = useRef([]);
  researchCardRefs.current = [];

  // Stacked bar segment refs
  const segRefs = useRef([]);
  segRefs.current = [];

  // Investment card refs (for stagger animation)
  const investCardRefs = useRef([]);
  investCardRefs.current = [];

  // Investment number refs
  const investNumRefs = useRef([]);
  investNumRefs.current = [];

  useGSAP(() => {
    fadeUp(headerRef.current);
    fadeUp(momentumRef.current);
    fadeUp(researchRef.current);
    fadeUp(investRef.current);

    // Stagger fade-up for research cards
    researchCardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1, y: 0,
          duration: 0.85,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        }
      );
    });
    // Writing animation — each word slides up from behind its clip mask
    if (quoteRef.current) {
      const wordInners = quoteRef.current.querySelectorAll("." + styles.quoteWordInner);
      gsap.fromTo(
        wordInners,
        { y: "105%" },
        {
          y: "0%",
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.045,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );
    }

    // Expand stacked bar segments
    segRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { width: "0%" },
        {
          width: RESEARCH_SEGMENTS[i].pct + "%",
          duration: 1.5,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        }
      );
    });

    // Stagger fade-up for investment cards
    investCardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1, y: 0,
          duration: 0.9,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 72%", once: true },
        }
      );
    });

    // Roll investment percentages
    investNumRefs.current.forEach((el, i) => {
      if (!el) return;
      rollNum(el, INVESTMENT_CARDS[i].pct, "%");
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.section} id="market">

      {/* ── 1. HEADER ── */}
      <div ref={headerRef} className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.headerTitle}>The Market<br />is Moving.</h1>
          <p className={styles.headerSub}>
            Traditional market-share tables don&apos;t tell the whole story.
            These momentum signals describe shifts in buyer behavior that shape
            how a challenger brand should position itself.
          </p>
        </div>
        <div className={styles.headerCards}>
          <StatCard year2023={41} year2026={35} label="AVERAGE AGE OF FIRST TIME UTE BUYERS" badge="Younger" />
          <StatCard year2023={18} year2026={11} label="AVERAGE RESEARCH WINDOW IN WEEKS" badge="Faster" />
          <StatCard year2023="58/42" year2026="64/36" label="METRO VS REGIONAL INTENDER MIX" badge="More urban" />
        </div>
      </div>

      {/* ── 2. MOMENTUM CHART ── */}
      <div ref={momentumRef} className={styles.momentumSection}>
        <h2 className={styles.sectionTitle}>Audience momentum signals</h2>
        <div className={styles.momentumYears}>
          <span className={styles.yearLabel2023}>2023</span>
          <div className={styles.yearDivider} />
          <span className={styles.yearLabel2026}>2026</span>
        </div>
        {MOMENTUM_ROWS.map((row, i) => (
          <MomentumRow key={row.label} row={row} index={i} />
        ))}
      </div>

      {/* ── 3. RESEARCH TIME ── */}
      <div ref={researchRef} className={styles.researchSection}>
        <h2 className={styles.sectionTitle}>Where Intenders spend research time</h2>

        {/* Stacked bar */}
        <div className={styles.stackedBarTrack}>
          {RESEARCH_SEGMENTS.map((seg, i) => (
            <div
              key={seg.label}
              ref={(el) => { segRefs.current[i] = el; }}
              className={styles.stackedSegment}
              style={{ backgroundColor: seg.color, width: 0 }}
            >
              <span className={styles.stackedPct} style={{ color: seg.textColor }}>{seg.pct}%</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className={styles.legend}>
          {RESEARCH_SEGMENTS.map((seg) => (
            <div key={seg.label} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ backgroundColor: seg.color }} />
              <span className={styles.legendLabel}>{seg.label}</span>
            </div>
          ))}
        </div>

        {/* Text cards */}
        <div className={styles.researchCards}>
          {RESEARCH_CARDS.map((card) => (
            <div
              key={card.tag}
              ref={(el) => { researchCardRefs.current[RESEARCH_CARDS.indexOf(card)] = el; }}
              className={styles.researchCard}
              style={{ backgroundColor: card.bg }}
            >
              <span className={styles.researchTag} style={{ color: card.tagTextColor }}>{card.tag}</span>
              <p className={styles.researchBody} style={{ color: card.textColor }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. INVESTMENT ── */}
      <div ref={investRef} className={styles.investSection}>
        <h2 className={styles.sectionTitle}>Investment Allocation Framework</h2>
        <p className={styles.investSub}>Percentages are illustrative and would be tuned per campaign.</p>
        <div className={styles.investCards}>
          {INVESTMENT_CARDS.map((card, i) => (
            <div
              key={card.label}
              ref={(el) => { investCardRefs.current[i] = el; }}
              className={styles.investCard}
              style={{ backgroundColor: card.bg }}
            >
              <span className={styles.investLabel}>{card.label}</span>
              <div className={styles.investNum}>
                <span ref={(el) => { investNumRefs.current[i] = el; }}>0%</span>
              </div>
              <p className={styles.investSub2}>{card.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. FOOTER QUOTE — word-by-word reveal ── */}
      <div className={styles.footerQuote} id="quote-block">
        <p ref={quoteRef} className={styles.quoteText}>
          {/* Split into individual word spans for the writing animation */}
          {"The dealership is no longer where intenders discover.".split(" ").map((word, i) => (
            <span key={"q1-" + i} className={styles.quoteWord}>
              <span className={styles.quoteWordInner}>{word}</span>
            </span>
          ))}
          {" "}
          {"It is where they confirm a decision they already made on a screen.".split(" ").map((word, i) => (
            <span key={"q2-" + i} className={styles.quoteWord}>
              <span className={`${styles.quoteWordInner} ${styles.quoteWordBold}`}>{word}</span>
            </span>
          ))}
        </p>
      </div>

    </section>
  );
}