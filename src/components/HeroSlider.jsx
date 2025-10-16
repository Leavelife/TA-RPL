"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const slides = [
    { type: "video", src: "/hero-media/1016.mp4", duration: 10000 },
    { type: "image", src: "/hero-media/img-1.jpg", duration: 6000 },
    { type: "image", src: "/hero-media/img-2.jpg", duration: 6000 },
    { type: "image", src: "/hero-media/img-3.jpg", duration: 6000 },
  ];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef = useRef(null);

  // Auto slide (ini tetap jalan terus)
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, slides[current].duration);
    return () => clearTimeout(timerRef.current);
  }, [current]);

  // Animasi teks hanya sekali saat komponen pertama kali muncul
  useEffect(() => {
    const chars = titleRef.current.textContent.split("");
    titleRef.current.innerHTML = chars
      .map((ch) => `<span class="inline-block opacity-0 translate-y-3">${ch === ' ' ? '&nbsp;' : ch}</span>`)
      .join("");

    const spans = titleRef.current.querySelectorAll("span");

    const tl = gsap.timeline();

    tl.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.05,
      stagger: 0.03,
      ease: "power2.out",
    })
      .from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      })
      .from(btnRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "back.out(1.6)",
      });

    return () => tl.kill();
  }, []); // kosong, biar cuma jalan sekali saat refresh

  return (
    <div className="relative w-full h-screen overflow-hidden">
        {/* Background slider */}
        <AnimatePresence initial={false} mode="sync">
            <motion.div
                key={current}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
                className="absolute inset-0"
            >
            {slides[current].type === "video" ? (
                <video
                src={slides[current].src}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
                />
            ) : (
                <img
                src={slides[current].src}
                alt={`slide-${current}`}
                className="w-full h-full object-cover"
                />
            )}
            </motion.div>
        </AnimatePresence>

        {/*Overlay text (animasi hanya pertama kali) */}
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-6">
            <h1 ref={titleRef} className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            Empowering Indonesia Seafood to the World
            </h1>

            <div ref={subtitleRef} className="flex flex-col items-center mt-4 text-sm md:text-lg text-white/90 max-w-2xl">
            <p>Discover, connect, and trade with transparency</p>
            <Link href='/about' className="w-1/2 mt-8 px-8 py-3 text-sm md:text-md bg-white/90 text-[#023E8A] font-semibold rounded-full shadow-lg hover:bg-white transition-all duration-300">
                Our Company
            </Link>
            </div>

        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
            <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                i === current ? "scale-125 bg-white" : "bg-white/40"
                }`}
            />
            ))}
        </div>
        {/* optional prev/next (desktop) */}
        <button
            onClick={() =>
            setCurrent((p) => (p - 1 + slides.length) % slides.length)
            }
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center p-2 bg-black/30 rounded-full text-white"
            aria-label="prev"
        >
            ‹
        </button>
        <button
            onClick={() => setCurrent((p) => (p + 1) % slides.length)}
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center p-2 bg-black/30 rounded-full text-white"
            aria-label="next"
        >
            ›
        </button>
    </div>
  );
}
