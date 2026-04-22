"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./JourneyStage.module.css";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// DATA - all 5 stages
// ─────────────────────────────────────────────────────────────────────────────
const STAGES = [
  {
    id: "stage-1",
    caption: "STAGE 1 - The Itch - 3-6 WEEKS",
    body: "While scrolling Instagram renovation reels, Liam starts noticing the sleek utes parked in the background.",
    bodyBold: "It\'s a slow realization, not an urgent need.",
    friction: "Liam feels the \'ute culture\' isn\'t for him.",
    emotional: 55,
    rational: 30,
    quote: "\"Maybe we should look at something bigger next year?\"",
    solutionLabel: "SOLUTION",
    solutionText: "Content that speaks to",
    solutionBold: "lifestyle identity,",
    solutionEnd: "not specs.",
    mockup: "/assets/stage-2-ig-story.png",
    mockupAlt: "LDV lifestyle content mockup",
  },
  {
    id: "stage-2",
    caption: "STAGE 2 - Window Shopping - 6 WEEKS",
    body: "Daydreaming meets option-paralysis. Dinner time now features YouTube vehicle reviews.",
    bodyBold: "They are running purely on aesthetic gut instinct, getting excited about the deck they could build.",
    friction: "The sheer volume of trim levels and options is completely paralyzing.",
    emotional: 70,
    rational: 40,
    quote: "\"This one looks cool.\"",
    solutionLabel: "SOLUTION",
    solutionText: "Visual configurators",
    solutionBold: "that let couples",
    solutionEnd: "agree on a look.",
    mockup: "/assets/stage-2-visual-configurator.png",
    mockupAlt: "LDV visual configurator mockup",
  },
  {
    id: "stage-3",
    caption: "STAGE 3 - Kicking Tyres - 4 WEEKS",
    body: "Reality hits the spreadsheet. As they step onto the dealership lot, the dreaming stops.",
    bodyBold: "They are actively weighing a shortlist, but hidden costs are suddenly shredding their meticulously planned budget.",
    friction: "Feeling pressured by salespeople while overwhelmed by advice from owner forums.",
    emotional: 50,
    rational: 75,
    quote: "\"This one looks cool.\"",
    solutionLabel: "SOLUTION",
    solutionText: "",
    solutionBold: "Low-pressure",
    solutionEnd: "test drive programs",
    mockup: "/assets/stage-2-test-drive-form.png",
    mockupAlt: "LDV test drive booking mockup",
  },
  {
    id: "stage-4",
    caption: "STAGE 4 - Signing on - 2 WEEKS",
    body: "The crucible of commitment. Sitting in the finance office, every single dollar is heavily scrutinized.",
    bodyBold: "They oscillate wildly between euphoric high-fives and quiet buyer\'s remorse on the drive home.",
    friction: "Intense negotiation anxiety and feeling rushed into accessory decisions.",
    emotional: 85,
    rational: 90,
    quote: "\"Let\'s just get this done.\"",
    solutionLabel: "SOLUTION",
    solutionText: "",
    solutionBold: "Named support person",
    solutionEnd: "to reduce anxiety during wait time.",
    mockup: "/assets/stage-2-welcome-email.png",
    mockupAlt: "LDV named support onboarding mockup",
  },
  {
    id: "stage-5",
    caption: "STAGE 5 - Road Testing Life - FIRST 6 MONTHS",
    body: "The sensitive honeymoon phase. The ute has arrived, and they are proudly using it for every project they imagined.",
    bodyBold: "But trust is fragile - a minor service surprise feels catastrophic.",
    friction: "The feature-discovery curve is taking longer than expected.",
    emotional: 75,
    rational: 65,
    quote: "\"Was this the right call?\"",
    solutionLabel: "SOLUTION",
    solutionText: "",
    solutionBold: "Welcome-experience app",
    solutionEnd: "with feature tutorials.",
    mockup: "/assets/stage-2-welcome-app.png",
    mockupAlt: "LDV welcome experience app mockup",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STAGE BLOCK - one per stage, self-contained with its own refs
// ─────────────────────────────────────────────────────────────────────────────
function StageBlock({ stage }) {
  const stageDetailRef = useRef(null);
  const frictionRef = useRef(null);
  const metricsRef = useRef(null);
  const quoteRef = useRef(null);
  const solutionRef = useRef(null);
  const emotionalNumRef = useRef(null);
  const rationalNumRef = useRef(null);

  useEffect(() => {
    const fadeUp = (el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            once: true,
          },
        }
      );
    };

    const rollCounter = (el, target) => {
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => { el.innerText = Math.round(obj.val); },
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          once: true,
        },
      });
    };

    fadeUp(stageDetailRef.current);
    fadeUp(frictionRef.current);
    fadeUp(metricsRef.current);
    fadeUp(quoteRef.current);
    fadeUp(solutionRef.current);
    rollCounter(emotionalNumRef.current, stage.emotional);
    rollCounter(rationalNumRef.current, stage.rational);

    return () => ScrollTrigger.getAll().forEach(() => { });
  }, [stage.emotional, stage.rational]);

  return (
    <div className={styles.stageBlock}>

      {/* Stage caption + body */}
      <div className={styles.stageDetail}>
        <div ref={stageDetailRef} className={styles.stageInner}>
          <p className={styles.stageCaption}>{stage.caption}</p>
          <p className={styles.stageBody}>
            {stage.body}{" "}
            <strong>{stage.bodyBold}</strong>
          </p>
        </div>
      </div>

      {/* Data split */}
      <div className={styles.dataSplit}>

        <div ref={frictionRef} className={styles.frictionCol}>
          <p className={styles.frictionLabel}>FRICTION</p>
          <h2 className={styles.frictionHeadline}>{stage.friction}</h2>
        </div>

        <div className={styles.metricsCol}>
          <div ref={metricsRef} className={styles.metrics}>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>EMOTIONAL LEVEL</span>
              <div className={styles.metricValue}>
                <span ref={emotionalNumRef} className={styles.metricNum}>0</span>
                <span className={styles.metricDenom}>/100</span>
              </div>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>RATIONAL LEVEL</span>
              <div className={styles.metricValue}>
                <span ref={rationalNumRef} className={styles.metricNum}>0</span>
                <span className={styles.metricDenom}>/100</span>
              </div>
            </div>
          </div>

          <h3 ref={quoteRef} className={styles.quote}>{stage.quote}</h3>
        </div>

      </div>

      {/* Solution */}
      <div className={styles.solution}>
        <div ref={solutionRef} className={styles.solutionInner}>
          <div className={styles.videoWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stage.mockup}
              alt={stage.mockupAlt}
              className={styles.videoMockup}
            />
          </div>
          <div className={styles.solutionText_block}>
            <p className={styles.solutionLabel}>{stage.solutionLabel}</p>
            <h2 className={styles.solutionText}>
              {stage.solutionText && <>{stage.solutionText} </>}
              <strong>{stage.solutionBold}</strong>
              {stage.solutionEnd && <> {stage.solutionEnd}</>}
            </h2>
          </div>
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function JourneyStage() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        introRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 60%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className={styles.section} id="journey-stage">

      {/* ── Persona intro - appears once at the top ── */}
      <div className={styles.intro}>
        <div ref={introRef} className={styles.introInner}>
          <h2 className={styles.introText}>
            <strong>Liam &amp; Chloe.</strong> They traded city convenience
            for a suburban fixer-upper, and their hatchback is holding back
            their DIY ambitions.
          </h2>
        </div>
      </div>

      {/* ── All 5 stages ── */}
      {STAGES.map((stage) => (
        <StageBlock key={stage.id} stage={stage} />
      ))}

    </section>
  );
}