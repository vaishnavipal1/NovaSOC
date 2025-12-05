"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
 useEffect(() => {
  const ctx = gsap.context(() => {

    /* HERO TITLE */
    gsap.from(".hero-title", {
      opacity: 0,
      y: -30,
      duration: 1.2,
      ease: "power3.out",
    });

    /* SUBTITLE */
    gsap.from(".hero-subtext", {
      opacity: 0,
      y: 20,
      delay: 0.2,
      duration: 1.1,
      ease: "power3.out",
    });

    /* BACKGROUND FLOATING EFFECT */
    gsap.to(".hero-bg-inner", {
      x: 25,
      y: 15,
      scale: 1.05,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    /* REMOVE FEATURE CARD ANIMATIONS — ALWAYS VISIBLE */
    // ❌ Removed gsap.from(".feature-box", ...) completely

    /* LEFT REVEALS */
    gsap.utils.toArray(".reveal-left").forEach((el) => {
      gsap.from(el, {
        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    /* RIGHT REVEALS */
    gsap.utils.toArray(".reveal-right").forEach((el) => {
      gsap.from(el, {
        x: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
    /* FEATURE BOXES – animate once and stay visible permanently */
gsap.fromTo(
  ".feature-box",
  {
    opacity: 0,
    y: 60,
  },
  {
    opacity: 1,
    y: 0,
    duration: 2.3,
    ease: "power3.out",
    stagger: 0.25,
    scrollTrigger: {
      trigger: "#features",
      start: "top 85%",
      toggleActions: "play none none none", // NEVER reverse or hide
    },
  }
);


    /* PARALLAX */
    gsap.to(".hero-bg", {
      y: 80,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-bg",
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

  });

  return () => ctx.revert();
 }, []);

 return (
  <main className="relative min-h-screen bg-black text-white overflow-x-hidden">

    {/* HERO SECTION */}
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-20">

      {/* Background */}
      <div className="hero-bg absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="hero-bg-inner absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/assets/bg-chip.jpg')",
            filter: "brightness(0.35) saturate(0.9)",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Foreground */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h1 className="hero-title text-6xl md:text-7xl font-extrabold text-cyan-400 leading-tight">
          Welcome to <span className="text-white">NovaSOC</span>
        </h1>

        <p className="hero-subtext mt-6 text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto">
          AI-powered Cyber Defense with Real-Time Cloud Monitoring.<br />
          Threat Detection • Automation • Incident Response
        </p>
      </div>
    </section>

    {/* WHY NOVASOC */}
    <section id="features" className="relative z-10 py-20 bg-black/90">
      <h2 className="text-center text-5xl md:text-6xl font-bold mb-12">
        Why NovaSOC?
      </h2>

      {/* FEATURE CARDS — ALWAYS VISIBLE */}
      <div className="grid max-w-6xl mx-auto px-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {[
          { title: "Threat Detection", desc: "AI-driven threat modeling and detection of sophisticated attacks." },
          { title: "Cloud Security", desc: "Monitor cloud posture, misconfigurations & drift in real-time." },
          { title: "Log Intelligence", desc: "Centralized logs with anomaly detection and risk scoring." },
          { title: "Incident Response", desc: "Automated playbooks and accelerated triage workflows." },
          { title: "Automation & Alerts", desc: "Reduce noise and focus on high-priority threats." },
          { title: "User Behavior Analytics", desc: "Detect insider threats and abnormal user behavior." },
        ].map((f, i) => (
          <div
            key={i}
            className="feature-box p-8 bg-gray-900/60 border border-cyan-400 rounded-2xl 
            shadow-[0_0_25px_#00eaff80] hover:shadow-[0_0_40px_#00eaff] backdrop-blur-lg
            transition-all hover:scale-105"
          >
            <h3 className="text-2xl font-semibold mb-2 text-white">{f.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{f.desc}</p>
          </div>
        ))}

      </div>
    </section>

    {/* SECTION 1 */}
    <section className="py-24 bg-black/80">
      <div className="grid max-w-7xl mx-auto px-6 grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div className="reveal-left">
          <h3 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6">
            Next-Gen SOC Intelligence
          </h3>

          <p className="text-gray-300 text-lg mb-6">
            NovaSOC uses machine learning, anomaly detection and behavior analytics
            to stop attacks before they begin.
          </p>

          <ul className="text-gray-400 space-y-3 text-md">
            <li>• Real-time monitoring of thousands of data points</li>
            <li>• Predictive threat scoring powered by ML models</li>
            <li>• Autonomous workflows that reduce analyst workload</li>
          </ul>

          <button className="mt-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg text-black font-bold shadow-lg">
            Explore Intelligence Suite →
          </button>
        </div>

        <img
          src="/assets/section1.png"
          className="reveal-right rounded-xl shadow-[0_0_30px_#00eaff60] max-h-[420px]"
          alt="SOC Intelligence"
        />
      </div>
    </section>

    {/* SECTION 2 */}
    <section className="py-24 bg-black/95">
      <div className="grid max-w-7xl mx-auto px-6 grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <img
          src="/assets/section2.png"
          className="reveal-left rounded-xl shadow-[0_0_30px_#00eaff60] max-h-[420px]"
          alt="Monitor Detect Respond"
        />

        <div className="reveal-right">
          <h3 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6">
            Monitor • Detect • Respond
          </h3>

          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            NovaSOC provides unmatched visibility and automated workflow engines to
            respond to threats instantly.
          </p>

          <ul className="text-gray-400 space-y-3 text-md">
            <li>• Automated playbooks for rapid containment</li>
            <li>• Analyst assist mode for guided remediation</li>
            <li>• Unified dashboard for cloud, network, and user telemetry</li>
          </ul>

          <button className="mt-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg text-black font-bold shadow-lg">
            View Monitoring Tools →
          </button>
        </div>

      </div>
    </section>

  </main>
 );
}
