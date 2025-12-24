"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const laptopData = [
    {
        title: "Precision Engineering",
        subtitle: "Sleek. Powerful. Minimalistic.",
        desc: "Designed for those who demand excellence in every pixel. Experience the perfect harmony of form and function.",
        image: "/laptop-1.png",
        color: "var(--primary)"
    },
    {
        title: "Unrivaled Performance",
        subtitle: "Built for the Bold.",
        desc: "Push the boundaries of what's possible with cutting-edge hardware optimized for the most demanding tasks.",
        image: "/laptop-2.png",
        color: "#00d2ff"
    },
    {
        title: "Visionary Workstation",
        subtitle: "Empower Your Creativity.",
        desc: "A powerhouse focused on stability and speed, giving you the freedom to create without limits.",
        image: "/laptop-3.png",
        color: "#a855f7"
    }
];

export default function LaptopShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".laptop-card") as HTMLElement[];

            cards.forEach((card, i) => {
                const image = card.querySelector(".laptop-image");
                const content = card.querySelector(".laptop-content");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play reverse play reverse",
                    }
                });

                tl.from(image, {
                    x: i % 2 === 0 ? -100 : 100,
                    opacity: 0,
                    scale: 0.8,
                    duration: 1.2,
                    ease: "expo.out"
                })
                    .from(content, {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out"
                    }, "-=0.8");

                // Subtle Parallax effect on image
                gsap.to(image, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                    y: -50,
                    ease: "none"
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="py-32 overflow-hidden bg-white/5" ref={containerRef}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-24">
                    <h2 className="text-5xl font-extrabold mb-6 tracking-tight">Our Signature Collection</h2>
                    <div className="h-1.5 w-32 bg-indigo-500 mx-auto rounded-full"></div>
                    <p className="mt-8 text-slate-400 text-xl font-medium">Experience craftsmanship in every detail</p>
                </div>

                <div className="space-y-48">
                    {laptopData.map((laptop, index) => (
                        <div
                            key={index}
                            className={`laptop-card flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                } items-center gap-16 lg:gap-32`}
                        >
                            {/* Image side */}
                            <div className="flex-1 relative w-full aspect-square md:aspect-video group overflow-hidden rounded-3xl flex items-center justify-center">
                                <div
                                    className="absolute inset-0 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
                                    style={{ backgroundColor: laptop.color }}
                                />
                                <div className="laptop-image relative w-full h-full flex items-center justify-center pointer-events-none p-12">
                                    <Image
                                        src={laptop.image}
                                        alt={laptop.title}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>

                            {/* Content side */}
                            <div className="laptop-content flex-1 max-w-xl">
                                <div
                                    className="w-16 h-1.5 mb-8 rounded-full"
                                    style={{ backgroundColor: laptop.color }}
                                />
                                <span className="text-indigo-400 font-bold tracking-widest text-sm uppercase mb-6 block opacity-80">
                                    {laptop.subtitle}
                                </span>
                                <h3 className="text-4xl lg:text-6xl font-extrabold mb-8 leading-tight">
                                    {laptop.title}
                                </h3>
                                <p className="text-xl text-slate-300 leading-relaxed mb-12">
                                    {laptop.desc}
                                </p>
                                <button className="glass group px-10 py-5 rounded-2xl font-bold hover:bg-white/5 transition-all flex items-center gap-4 text-lg border border-white/5 hover:border-white/10 text-white">
                                    View Specifications
                                    <div
                                        className="w-3 h-3 rounded-full group-hover:scale-125 transition-all duration-500 shadow-xl"
                                        style={{ backgroundColor: laptop.color }}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
