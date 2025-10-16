"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GiLuckyFisherman } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { PiFishFill } from "react-icons/pi";
import { BsGlobeAsiaAustralia } from "react-icons/bs";


gsap.registerPlugin(ScrollTrigger);

export default function Section1Stats() {
  const statsRef = useRef([]);
  const sectionRef = useRef(null);

  const stats = [
    { number: 40000, label: "Fisherman", icon: <GiLuckyFisherman/> },
    { number: 177, label: "Export Hub", icon: <IoLocationOutline/> },
    { number: 23, label: "Comodity", icon: <PiFishFill/> },
    { number: 31, label: "Country", icon: <BsGlobeAsiaAustralia/> },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      statsRef.current.forEach((el) => {
        const target = +el.dataset.target;
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power3.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true, // animasi cuma jalan sekali pas pertama kali muncul
            },
            onUpdate: function () {
              el.innerText = Math.floor(el.innerText);
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className=" flex flex-col justify-center items-center bg-white text-[#023E8A] px-6 py-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl text-center">
        {stats.map((item, i) => (
          <div
            key={i}
            className="flex flex-col flex-wrap items-center justify-center bg-[#f8f9fa] rounded-2xl py-5 pr-15 pl-5 shadow-md"
          >
            <div className="flex gap-5">
                {React.cloneElement(item.icon, { className: "w-12 h-12 mb-4 opacity-90" })}
                <h3
                ref={(el) => (statsRef.current[i] = el)}
                data-target={item.number}
                className="text-3xl font-bold mb-1 after:content-['+']"
                >
                0
                </h3>
            </div>
            <p className="text-sm font-medium text-gray-700">{item.label}</p>
        </div>
        ))}
      </div>
    </section>
  );
}
