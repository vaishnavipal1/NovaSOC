"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    /* =============================
       HERO TITLE ANIMATION
    ============================== */
    gsap.from(".hero-title", {
      opacity: 0,
      y: -40,
      duration: 1.4,
      ease: "power3.out",
    });

    /* =============================
       SUBTEXT ANIMATION
    ============================== */
    gsap.from(".hero-subtext", {
      opacity: 0,
      y: 25,
      delay: 0.4,
      duration: 1.2,
      ease: "power3.out",
    });

    /* =============================
       FEATURE BOX ANIMATION (FIXED)
    ============================== */
    gsap.fromTo(
      ".feature-box",
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.25,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#features",
          start: "top 80%",
          once: true, // animation only runs once and stays visible
        },
      }
    );

    /* =============================
       BACKGROUND PARALLAX
    ============================== */
    gsap.to(".hero-bg", {
      y: 120,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        scrub: 1, // smooth movement with scroll
      },
    });
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* MOVING BACKGROUND */}
      <div className="hero-bg"></div>

      {/* ========== HERO SECTION ========== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-6 text-center">

        <h1 className="hero-title typing-title text-7xl font-extrabold text-cyan-400 mb-10">
          Welcome to NovaSOC
        </h1>

        <p className="hero-subtext text-2xl text-gray-300 max-w-3xl">
          AI-powered Cyber Defense with Real-Time Cloud Monitoring,<br />
          Threat Detection & Automated Incident Response.
        </p>

      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="relative z-10 py-20 bg-black/80 text-center">
        <h2 className="text-6xl font-bold mb-12">Why NovaSOC?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-20 max-w-6xl mx-auto">
          {[
            "Threat Detection",
            "Cloud Security",
            "Log Monitoring",
            "Incident Response",
            "Automation & Alerts",
            "User Behavior Analytics",
          ].map((feature, i) => (
            <div
              key={i}
              className="feature-box p-8 bg-gray-900/70 border border-cyan-400 rounded-xl text-xl 
              hover:scale-105 hover:shadow-[0_0_25px_#00eaff] transition"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
