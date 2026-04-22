"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const line1Ref  = useRef(null);
  const line2Ref  = useRef(null);

  useGSAP(() => {
    [line1Ref, line2Ref].forEach((ref, i) => {
      gsap.fromTo(ref.current,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1, y: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className={styles.footer}>
      <p ref={line1Ref} className={styles.line1}>
        SPEED ACCELERATOR SHOWCASE FOR LDV AUTOMOTIVE
      </p>
      <p ref={line2Ref} className={styles.line2}>
        MJSPALALIMPA
      </p>
    </footer>
  );
}
