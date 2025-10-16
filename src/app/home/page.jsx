'use client'

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSlider from "@/components/HeroSlider";
import Section2Features from "@/components/Section2Features";
import Link from "next/link";
import Section1Stats from "@/components/Section1Stats";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    const tweenSection2 = gsap.fromTo(
      "#section2",
      { backgroundColor: "#ffffff" },
      {
        backgroundColor: "#20639B",
        ease: "none",
        scrollTrigger: {
          trigger: "#section2",
          start: "top 30%",
          end: "center 70%",
          scrub: true,
        },
      }
    );

    const tweenSection3 = gsap.fromTo(
      "#section3",
      { backgroundColor: "#20639B" },
      {
        backgroundColor: "#ffffff",
        ease: "none",
        scrollTrigger: {
          trigger: "#section3",
          start: "top",
          end: "bottom 50%",
          scrub: true,
        },
      }
    );

    return () => {
      tweenSection2.kill();
      tweenSection3.kill();
    };
  }, [])

  return (
    <main>
        <HeroSlider/>
        <section id="section1" className="min-h-screen flex flex-col items-center text-center justify-center bg-white text-black">
            <p className="text-3xl md:text-5xl font-bold text-[#353535] mt-10">What Does Deepsea Do</p>
            <p className="text-xl font-semibold text-[#535353] py-10">Deepsea streamlines the fisheries supply chain by connecting small-scale <br/>
                fishermen to global markets through technological innovation.</p>
            <h1 className="text-3xl md:text-5xl font-semibold text-[#20639B] mt-10">Deepsea In Caunter</h1>
            <Section1Stats/>
        </section>
        <section id="section2" className="min-h-[calc(100vh*1.5)] flex items-center justify-center text-white">
            <div className="flex flex-col items-center w-full gap-20">
                <Section2Features/>
            </div>
        </section>
        <section id="section3" className="min-h-screen flex flex-col items-center text-white">
            <h2 className="text-2xl md:text-4xl font-semibold text-center">From the Depth of Indonesia’s Ocean, to the Tables of the World</h2>
            <div className="flex flex-wrap-reverse w-9/12 justify-center mx-auto my-15 bg-white border-1 border-stone-400 shadow-md rounded-2xl">
                <div className="w-2/3 text-[#20639B] p-3 md:p-10 justify-center flex flex-col gap-11">
                    <p className="text-xl"><strong>Deepsea</strong> is committed to bringing Indonesia's marine potential to the global market in a modern, efficient, and sustainable manner.
                    Together, we will create a more transparent and impactful future for exports that benefits coastal communities.</p>
                    <Link href="/product" className="w-full md:w-1/5 p-3 border-1 rounded-lg bg-[#20639B] font-semibold text-white shadow-md">Order Now</Link>
                </div>
                <img src="img-sec-3.png" className="w-full md:w-1/3 rounded-2xl"/>
            </div>
        </section>
    </main>
  );
}
