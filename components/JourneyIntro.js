"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

import styles from "./JourneyIntro.module.css";

gsap.registerPlugin(ScrollTrigger, Draggable);

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING IMAGE CONFIG
// depth = parallax multiplier (higher = more movement on mouse move)
// 

const FLOAT_IMAGES = [
  {
    id: "f1",
    src: "/assets/ldv-deliver-9-bus.webp",
    alt: "LDV vehicle 1",
    posClass: styles.floatTopCenter,
    depth: 18,
  },
  {
    id: "f2",
    src: "/assets/ldv-et60-ute-1.webp",
    alt: "LDV vehicle 2",
    posClass: styles.floatMidLeft,
    depth: 28,
  },
  {
    id: "f3",
    src: "/assets/ldv-my25-d90-suv.webp",
    alt: "LDV vehicle 3",
    posClass: styles.floatMidRight,
    depth: 22,
  },
  {
    id: "f4",
    src: "/assets/ldv-t60-max-ute-2.webp",
    alt: "LDV vehicle 4",
    posClass: styles.floatBottomLeft,
    depth: 32,
  },
  {
    id: "f5",
    src: "/assets/ldv-t60-max-ute-1.webp",
    alt: "LDV vehicle 5",
    posClass: styles.floatBottomCenter,
    depth: 14,
  },
  {
    id: "f6",
    src: "/assets/ldv-terron-9-evolve-1.webp",
    alt: "LDV vehicle 6",
    posClass: styles.floatBottomRight,
    depth: 26,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function JourneyIntro() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRefs = useRef({});

  // Track which images are currently being dragged so parallax
  // doesn't fight the drag position
  const draggingRef = useRef(new Set());

  // ── Scroll entrance + Draggable init ─────────────────────────────────
  useGSAP(
    () => {
      // 1. Text entrance
      gsap.set(textRef.current, { autoAlpha: 0, y: 40 });
      gsap.to(textRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // 2. Image entrance — staggered scale + fade
      const imgEls = FLOAT_IMAGES.map((img) => imgRefs.current[img.id]).filter(Boolean);
      gsap.set(imgEls, { autoAlpha: 0, scale: 0.82 });
      gsap.to(imgEls, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // 3. Make each image draggable within the section bounds
      FLOAT_IMAGES.forEach((img) => {
        const el = imgRefs.current[img.id];
        if (!el) return;

        Draggable.create(el, {
          type: "x,y",
          bounds: sectionRef.current,
          inertia: true,           // smooth coast-to-stop after release
          onDragStart() {
            draggingRef.current.add(img.id);
            // Bring dragged card to front
            gsap.set(el, { zIndex: 10 });
          },
          onDragEnd() {
            draggingRef.current.delete(img.id);
            gsap.set(el, { zIndex: "" });
          },
        });
      });
    },
    { scope: sectionRef }
  );

  // ── Mouse parallax ────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    const nx = (e.clientX / window.innerWidth) - 0.5;
    const ny = (e.clientY / window.innerHeight) - 0.5;

    FLOAT_IMAGES.forEach((img) => {
      // Skip images currently being dragged
      if (draggingRef.current.has(img.id)) return;
      const el = imgRefs.current[img.id];
      if (!el) return;
      gsap.to(el, {
        x: -nx * img.depth,
        y: -ny * img.depth,
        duration: 0.9,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    FLOAT_IMAGES.forEach((img) => {
      if (draggingRef.current.has(img.id)) return;
      const el = imgRefs.current[img.id];
      if (!el) return;
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  }, []);

  // ── Markup ────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className={styles.journeyIntro}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="journey"
    >
      {/* Floating images */}
      <div className={styles.floatLayer} aria-hidden="true">
        {FLOAT_IMAGES.map((img) => (
          <div
            key={img.id}
            className={`${styles.floatItem} ${img.posClass}`}
            ref={(el) => { imgRefs.current[img.id] = el; }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className={styles.floatImage}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Central text */}
      <div ref={textRef} className={styles.textBlock}>
        <h2 className={styles.headline}>The Path to Purchase</h2>
        <p className={styles.body}>
          Mapping a 5-stage customer decision journey for the First-Home
          Renovator, moving from initial curiosity through to confident
          ownership.
        </p>
      </div>
    </section>
  );
}