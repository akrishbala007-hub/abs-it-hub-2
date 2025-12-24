"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe2, Heart, Leaf, Gift, Users, MapPin,
  Award, Target, ShieldCheck, CheckCircle2,
  Monitor, Cpu, Truck, Settings, Briefcase, School, ArrowRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const mainRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal animations
      const revealElements = document.querySelectorAll(".reveal-text");
      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const revealSections = document.querySelectorAll(".reveal-section");
      revealSections.forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-black min-h-screen text-slate-200 selection:bg-white selection:text-black overflow-x-hidden font-sans pt-20">

      {/* 1. Hero Section: Introduction */}
      <section className="relative py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-sm border border-white/20 mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="text-white text-sm font-medium tracking-wide">Who We Are</span>
          </div>
          <h1 className="reveal-text text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
            Accessible. Affordable. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Sustainable.</span>
          </h1>
          <p className="reveal-text text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-8">
            Based in Coimbatore, Tamil Nadu, <strong>ABS IT Hub</strong> specializes in premium refurbished laptops and desktops that empower students, professionals, and businesses to achieve more without overspending.
          </p>
          <p className="reveal-text text-lg text-slate-500 max-w-3xl mx-auto">
            Our journey began with a simple observation: high prices shouldn't be a barrier to technology. We bridge the gap between discarded potential and unmet demand, extending the life of devices and reducing e-waste.
          </p>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-20 bg-black reveal-section border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Story – From Idea to Impact</h2>

            <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Leaf className="w-5 h-5" /> The Beginning</h3>
                <p className="text-slate-400 leading-relaxed">
                  Founded in Coimbatore, ABS IT Hub started as a small initiative with a big vision. Our founder, Balakrishnan, combined his expertise in IT hardware, healthcare operations, and digital branding to create a business that was both technically strong and socially responsible. We focused on sourcing, refurbishing with care, and delivering affordable tech.
                </p>
              </div>
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Globe2 className="w-5 h-5" /> Growth & Expansion</h3>
                <p className="text-slate-400 leading-relaxed">
                  Word spread quickly. Students appreciated affordability, businesses valued reliability. From a local service, we expanded nationwide with <strong>free shipping all over India</strong>. Customers from Chennai to Delhi now trust our quality.
                </p>
              </div>
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Target className="w-5 h-5" /> Overcoming Challenges</h3>
                <p className="text-slate-400 leading-relaxed">
                  Convincing people about refurbished value wasn't easy. We worked tirelessly to change the "second-hand" perception by offering warranties, showcasing success stories, and educating on environmental benefits.
                </p>
              </div>
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Heart className="w-5 h-5" /> Sustainability Core</h3>
                <p className="text-slate-400 leading-relaxed">
                  Sustainability is our guiding principle. Every device sold is one less in a landfill. We are proud to be part of the global green IT movement, protecting the environment for future generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Milestones */}
      <section className="py-20 bg-zinc-900/30 reveal-section">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-16 text-center">Milestones Achieved</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-sm text-slate-400">Happy Customers in Year 1</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-white mb-2">India</div>
              <div className="text-sm text-slate-400">Nationwide Free Shipping</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-white mb-2">Bulk</div>
              <div className="text-sm text-slate-400">School & Startup Partners</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-white mb-2">Free</div>
              <div className="text-sm text-slate-400">Website Setup Service</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-white mb-2">Eco</div>
              <div className="text-sm text-slate-400">Trusted Green Brand</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Human Side */}
      <section className="py-24 reveal-section relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">

          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">The Human Side of ABS IT Hub</h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed italic">
            "Behind every refurbished laptop or desktop is a story. A student who can now attend online classes without worrying about cost. A startup that can equip its team with reliable desktops while staying within budget. A teacher who can prepare lessons with ease. These stories inspire us every day. ABS IT Hub is about empowering people, enabling dreams, and building a sustainable future."
          </p>
        </div>
      </section>

      {/* 5. Vision & Mission */}
      <section className="py-24 bg-black reveal-section">
        <div className="container mx-auto px-6">
          <div className="glass-panel rounded-[3rem] p-10 lg:p-20 shadow-xl text-center relative overflow-hidden backdrop-blur-sm border border-white/10">
            <Globe2 className="w-20 h-20 text-white mx-auto mb-8 animate-float" />
            <h2 className="reveal-text text-3xl lg:text-5xl font-bold text-white mb-16 relative z-10">Our Vision & Mission</h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto relative z-10 text-left">
              <div className="glass-card p-10 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </span>
                  <span>Vision</span>
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg mb-4">
                  To make technology accessible, affordable, and sustainable for every individual and business in India.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  We dream of a future where no student is left behind and no startup struggles due to high costs. We aim to bridge the digital divide by ensuring reliable technology is within everyone's reach.
                </p>
              </div>
              <div className="glass-card p-10 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6" />
                  </span>
                  <span>Mission</span>
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg mb-6">
                  Deliver certified refurbished laptops and desktops that combine quality, affordability, and sustainability.
                </p>
                <ul className="space-y-3 text-slate-400">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" /> Rigorous Quality Checks</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" /> Customer-Centric Service</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" /> Nationwide Free Shipping</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" /> Free Website Setup for Buyers</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" /> Promoting Green IT Solutions</li>
                </ul>
              </div>
            </div>

            <div className="mt-16 text-left max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Long-Term Goals</h3>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-center">
                {["Nationwide Leadership", "Digital Empowerment", "Service Innovation", "Community Impact", "Global Reach"].map(goal => (
                  <div key={goal} className="glass-card-sm p-4 rounded-xl text-sm font-medium text-white border border-white/5">{goal}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Refurbished */}
      <section className="py-24 bg-black reveal-section border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Why Refurbished?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">The smart, sustainable choice for modern tech needs.</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all">
                <h3 className="text-xl font-bold text-white mb-2">Cost Savings</h3>
                <p className="text-slate-400">30–50% less than brand-new devices. Access reliable tech without financial strain.</p>
              </div>
              <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all">
                <h3 className="text-xl font-bold text-white mb-2">Eco-Friendly</h3>
                <p className="text-slate-400">Every device sold reduces e-waste. A direct contribution to a greener planet.</p>
              </div>
              <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all">
                <h3 className="text-xl font-bold text-white mb-2">Certified Quality</h3>
                <p className="text-slate-400">Not "second-hand". Restored to like-new condition with rigorous testing and upgrades.</p>
              </div>
              <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all">
                <h3 className="text-xl font-bold text-white mb-2">Nationwide Reach</h3>
                <p className="text-slate-400">Free shipping ensures technology reaches every corner of India, from metros to villages.</p>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* 7. Our Process */}
      <section className="py-24 bg-zinc-900/20 reveal-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Our 7-Step Quality Process</h2>
            <p className="text-slate-400 text-lg">Rigorous. Transparent. Customer-Centric.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "1. Inspection", desc: "Comprehensive physical and hardware check.", icon: Monitor },
              { title: "2. Repair", desc: "Certified parts replacement for faulty components.", icon: Settings },
              { title: "3. Upgrade", desc: "RAM & SSD boosts for modern performance.", icon: Cpu },
              { title: "4. Testing", desc: "Performance, durability, and connectivity benchmarks.", icon: ShieldCheck },
              { title: "5. Certification", desc: "Quality seal and warranty coverage.", icon: Award },
              { title: "6. Cleaning", desc: "Deep cleaning and polishing for like-new look.", icon: CheckCircle2 },
              { title: "7. Delivery", desc: "Secure packaging and free nationwide shipping.", icon: Truck },
            ].map((step, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all group">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
            <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all flex flex-col justify-center bg-white/5">
              <h3 className="text-lg font-bold text-white mb-2">Quality Assurance</h3>
              <p className="text-slate-300 text-sm">Guided by ISO-inspired practices and sustainability checks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Products & Services */}
      <section className="py-24 bg-black reveal-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Our Products & Services</h2>
            <p className="text-slate-400 text-lg">Complete IT solutions for everyone.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Refurbished Laptops</h3>
              <ul className="space-y-4">
                <li>
                  <strong className="text-white block">For Students</strong>
                  <span className="text-slate-400 text-sm">Budget-friendly, portable, ready-to-use.</span>
                </li>
                <li>
                  <strong className="text-white block">For Professionals</strong>
                  <span className="text-slate-400 text-sm">Upgraded RAM/SSD, trusted brands, warranty.</span>
                </li>
                <li>
                  <strong className="text-white block">For Creatives</strong>
                  <span className="text-slate-400 text-sm">High-performance graphics & storage.</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Refurbished Desktops</h3>
              <ul className="space-y-4">
                <li>
                  <strong className="text-white block">For Businesses</strong>
                  <span className="text-slate-400 text-sm">Cost-effective bulk orders, customizable.</span>
                </li>
                <li>
                  <strong className="text-white block">For Institutions</strong>
                  <span className="text-slate-400 text-sm">Bulk systems for labs, free shipping.</span>
                </li>
                <li>
                  <strong className="text-white block">For Families</strong>
                  <span className="text-slate-400 text-sm">Affordable home computers, durable.</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-white/10 bg-white/5">
              <h3 className="text-2xl font-bold text-white mb-6">Value-Added Services</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-white/10 p-2 rounded-full"><Gift className="w-4 h-4 text-white" /></div>
                  <div>
                    <strong className="text-white block">Free Website Setup</strong>
                    <span className="text-slate-400 text-sm">For every laptop buyer.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/10 p-2 rounded-full"><ShieldCheck className="w-4 h-4 text-white" /></div>
                  <div>
                    <strong className="text-white block">Warranty & Support</strong>
                    <span className="text-slate-400 text-sm">Peace of mind guaranteed.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/10 p-2 rounded-full"><Truck className="w-4 h-4 text-white" /></div>
                  <div>
                    <strong className="text-white block">Free Shipping</strong>
                    <span className="text-slate-400 text-sm">Across India.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function Quote({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19C19.5523 16 20 15.5523 20 15V9C20 8.44772 19.5523 8 19 8H15C14.4477 8 14 8.44772 14 9V11C14 11.5523 13.5523 12 13 12H12C11.4477 12 11 11.5523 11 11V7C11 5.89543 11.8954 5 13 5H19C20.1046 5 21 5.89543 21 7V15C21 16.6569 19.6569 18 18 18H16.017C15.4647 18 15.017 18.4477 15.017 19V21L14.017 21ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91197 16 7.0166 16H10C10.5523 16 11 15.5523 11 15V9C11 8.44772 10.5523 8 10 8H6C5.44772 8 5 8.44772 5 9V11C5 11.5523 4.55228 12 4 12H3C2.44772 12 2 11.5523 2 11V7C2 5.89543 2.89543 5 4 5H10C11.1046 5 12 5.89543 12 7V15C12 16.6569 10.6569 18 9 18H7.0166C6.46432 18 6.0166 18.4477 6.0166 19V21L5.0166 21Z" />
    </svg>
  );
}
