"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section2Features() {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.25,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "center 40%",
            scrub: 1, 
            markers: false, 
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      title: "Digital Management",
      img: "/hero2-media/img1.jpg",
      desc: "All seafood data from quality and stock to shipping is recorded digitally to facilitate monitoring.",
    },
    {
      title: "Trusted Network",
      img: "/hero2-media/img2.png",
      desc: "Build trust between fishermen, exporters, and buyers through transparent verification and reporting.",
    },
    {
      title: "Market Insight",
      img: "/hero2-media/img3.png",
      desc: "Get market analysis, price trends, and global demand to help you export more strategically.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center items-center text-white px-6 py-20 overflow-hidden"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Modern Tools for a Transparent Seafood Trade
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
        {cards.map((card, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="flex flex-col items-center text-center bg-white/90 rounded-2xl p-8 backdrop-blur-md shadow-lg hover:scale-125 transition-transform duration-300"
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-9/12 h-9/12 mb-6"
            />
            <p className="text-xl text-[#20639B] font-semibold mb-3">{card.title}</p>
            <p className="text-sm text-black leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
