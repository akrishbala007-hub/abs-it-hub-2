"use client";

import { useEffect, useRef } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Zap,
  Globe2,
  Truck,
  Award,
  Monitor,
  Cpu,
  Briefcase,
  MapPin,
  Heart,
  Gift,
  Users,
  Search,
  Settings,
  Gauge,
  BadgeCheck,
  GraduationCap,
  Building2,
  School,
  Star,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple fade-in for hero text on load
    const ctx = gsap.context(() => {
      gsap.from(".hero-text > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });

      // Simple float animation for hero Decoration
      gsap.to(".animate-float", {
        y: -15,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-black min-h-screen text-slate-200 selection:bg-white selection:text-black overflow-x-hidden font-sans">

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 lg:pt-20 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-black to-transparent"></div>
          <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 lg:gap-20 items-center relative z-10">
          <div className="hero-text z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-2 rounded-full glass-card-sm border border-white/20 mb-4 lg:mb-8">
              <span className="relative flex h-2 w-2 lg:h-3 lg:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 lg:h-3 lg:w-3 bg-white"></span>
              </span>
              <span className="text-white text-[10px] lg:text-xl font-bold tracking-wide">Welcome to ABS IT Hub</span>
            </div>
            <h1 className="reveal-text text-3xl md:text-5xl lg:text-7xl font-extrabold text-white mb-4 lg:mb-8 leading-tight tracking-tight">
              Refurbished Laptops <br />
              & Desktops for <br />
              <span className="text-white underline decoration-wavy decoration-white/30 underline-offset-4 lg:underline-offset-8">
                Smart Buyers
              </span>
            </h1>
            <p className="reveal-text text-sm lg:text-2xl text-slate-400 mb-6 lg:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Your trusted destination for refurbished laptops and desktops in Coimbatore. Affordable, reliable, and eco-friendly.
            </p>
            <div className="reveal-text flex flex-row gap-3 justify-center lg:justify-start">
              <Link href="/products" className="bg-white text-black px-5 py-2.5 lg:px-10 lg:py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-white/20 flex items-center justify-center gap-2 group hover:scale-105 text-xs lg:text-lg">
                View Products <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#contact" className="px-5 py-2.5 lg:px-10 lg:py-4 rounded-full border border-white/30 hover:bg-white/10 text-white transition-all font-bold text-xs lg:text-lg flex items-center justify-center">
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Visual - Hero Laptop Static (Monochrome) */}
          <div className="relative w-full max-w-xl lg:max-w-2xl flex items-center justify-center mt-8 lg:mt-0">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] lg:w-[500px] lg:h-[500px] bg-white/5 rounded-full blur-[50px] lg:blur-[80px] -z-10"></div>

              {/* Mobile: No Glass Card, Desktop: Glass Card */}
              <div className="w-full lg:glass-card rounded-3xl lg:p-12 flex flex-col items-center justify-center lg:border border-white/10">
                <div className="w-full hidden lg:flex justify-start mb-8">
                  <span className="bg-white text-black font-bold px-6 py-2 rounded-full text-sm uppercase tracking-wider">
                    Premium Choice
                  </span>
                </div>
                <Image src="/laptop-1.png" alt="Dell Laptop" width={550} height={400} className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 w-auto h-[180px] lg:h-auto" priority />
                <div className="text-center mt-4 lg:mt-8 hidden lg:block">
                  <p className="font-bold text-white text-3xl mb-2">Dell Latitude</p>
                  <p className="text-lg text-slate-400">Business Class Reliability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Highlights & Benefits */}
      <section className="py-24 bg-black relative reveal-section border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="reveal-text text-3xl lg:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-white underline decoration-white/30 underline-offset-8">Refurbished?</span>
            </h2>
            <p className="reveal-text text-slate-400 text-lg max-w-2xl mx-auto">
              Experience premium performance without the premium price tag.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {/* Card 1 */}
            <div className="glass-card p-8 rounded-3xl group hover:bg-white/5 transition-all border border-white/10 hover:border-white/30">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Smart Savings</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Get premium laptops and desktops at up to 50% less than new.
              </p>
            </div>
            {/* Card 2 */}
            <div className="glass-card p-8 rounded-3xl group hover:bg-white/5 transition-all border border-white/10 hover:border-white/30">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Eco-Friendly</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Reduce e-waste and support sustainable technology.
              </p>
            </div>
            {/* Card 3 */}
            <div className="glass-card p-8 rounded-3xl group hover:bg-white/5 transition-all border border-white/10 hover:border-white/30">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Certified Quality</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Every device undergoes strict testing and refurbishment.
              </p>
            </div>
            {/* Card 4 */}
            <div className="glass-card p-8 rounded-3xl group hover:bg-white/5 transition-all border border-white/10 hover:border-white/30">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Modern Specs</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Access updated hardware and software without overspending.
              </p>
            </div>
          </div>

          {/* Benefits List */}
          <div className="glass-panel rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden border border-white/10">
            {/* Removed colorful blur, added subtle white glow */}
            {/* White glow instead of color */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -z-0"></div>
            <h3 className="reveal-text text-2xl font-bold text-white mb-10 text-center relative z-10">Benefits of Buying from ABS IT Hub</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {[
                { text: "Warranty & Support (Peace of mind)", icon: Award },
                { text: "Ready-to-Use Devices (OS Installed)", icon: CheckCircle2 },
                { text: "Trusted Global Brands (Dell, HP, etc)", icon: Monitor },
                { text: "Bulk Orders Available", icon: Truck },
                { text: "Upgrade Options (RAM, SSD)", icon: Cpu },
                { text: "Free website setup for buyers", icon: Gift },
              ].map((item, idx) => (
                <div key={idx} className="glass-card-sm flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20">
                  <item.icon className="w-6 h-6 text-white shrink-0" />
                  <span className="text-white font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose ABS IT Hub */}
      <section className="py-24 bg-black reveal-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="reveal-text text-3xl lg:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-white underline decoration-white/30 underline-offset-8">ABS IT Hub?</span>
            </h2>
            <p className="reveal-text text-slate-400 text-lg max-w-2xl mx-auto">More than just a store, we are your technology partners.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl hover:shadow-white/10 hover:border-white/50 transition-all">
              <MapPin className="w-10 h-10 text-white mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Local Expertise</h3>
              <p className="text-slate-400 text-sm">Serving Coimbatore and Tamil Nadu with personalized solutions.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover:shadow-white/10 hover:border-white/50 transition-all">
              <Heart className="w-10 h-10 text-white mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Customer-Centric Service</h3>
              <p className="text-slate-400 text-sm">Transparent pricing and honest recommendations.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover:shadow-white/10 hover:border-white/50 transition-all">
              <Leaf className="w-10 h-10 text-white mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Sustainable Vision</h3>
              <p className="text-slate-400 text-sm">Promoting eco-friendly IT practices for a greener future.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover:shadow-white/10 hover:border-white/50 transition-all">
              <Gift className="w-10 h-10 text-white mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Extra Value</h3>
              <p className="text-slate-400 text-sm">Free website/portfolio setup for laptop buyers.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover:shadow-white/10 hover:border-white/50 transition-all md:col-span-2 lg:col-span-2 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-2">
                <Users className="w-10 h-10 text-white" />
                <h3 className="text-xl font-bold text-white">Proven Trust</h3>
              </div>
              <p className="text-slate-400 text-sm">Hundreds of satisfied customers across Tamil Nadu trust us for their IT needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Offerings */}
      <section className="py-24 bg-black reveal-section relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="reveal-text text-3xl lg:text-4xl font-bold text-white mb-4">Our Offerings</h2>
              <p className="reveal-text text-slate-400 text-lg">Hardware solutions for every requirement.</p>
            </div>
            <Link href="/products" className="text-white font-bold flex items-center gap-2 hover:text-slate-300 transition-colors text-lg">
              View Full Catalog <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Laptop */}
            <div className="glass-card group p-6 rounded-2xl hover:bg-white/10 hover:shadow-xl transition-all cursor-pointer">
              <div className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Refurbished Laptops</h3>
              <p className="text-slate-400 text-sm mb-4">Affordable, reliable, performance-driven devices.</p>
              <span className="text-white font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Explore <ArrowRight className="w-4 h-4" /></span>
            </div>
            {/* Desktop */}
            <div className="glass-card group p-6 rounded-2xl hover:bg-white/10 hover:shadow-xl transition-all cursor-pointer">
              <div className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Refurbished Desktops</h3>
              <p className="text-slate-400 text-sm mb-4">Ideal for offices, students, and creatives.</p>
              <span className="text-white font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Explore <ArrowRight className="w-4 h-4" /></span>
            </div>
            {/* Accessories */}
            <div className="glass-card group p-6 rounded-2xl hover:bg-white/10 hover:shadow-xl transition-all cursor-pointer">
              <div className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Accessories & Upgrades</h3>
              <p className="text-slate-400 text-sm mb-4">RAM, SSDs, monitors, and more.</p>
              <span className="text-white font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Explore <ArrowRight className="w-4 h-4" /></span>
            </div>
            {/* Business */}
            <div className="glass-card group p-6 rounded-2xl hover:bg-white/10 hover:shadow-xl transition-all cursor-pointer">
              <div className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Business Solutions</h3>
              <p className="text-slate-400 text-sm mb-4">Bulk orders for institutions and enterprises.</p>
              <span className="text-white font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Explore <ArrowRight className="w-4 h-4" /></span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quality Assurance */}
      <section className="py-24 bg-gradient-radiant relative reveal-section text-black overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="reveal-text text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Quality Assurance Process</h2>
            <p className="reveal-text text-slate-800 text-lg max-w-2xl mx-auto">We ensure every device meets our high standards before it reaches you.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Inspection", desc: "Devices checked for physical and technical issues.", icon: Search },
              { title: "Refurbishment", desc: "Hardware upgrades, cleaning, and optimization.", icon: Settings },
              { title: "Testing", desc: "Rigorous performance and durability checks.", icon: Gauge },
              { title: "Certification", desc: "Only certified devices reach our customers.", icon: BadgeCheck },
            ].map((item, i) => (
              <div key={i} className="glass-card bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shadow-sm">
                <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {i + 1}
                </div>
                <div className="flex justify-center mb-4"><item.icon className="w-8 h-8 text-black" /></div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-800">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Who We Serve */}
      <section className="py-24 bg-black reveal-section">
        <div className="container mx-auto px-6">
          <h2 className="reveal-text text-3xl lg:text-4xl font-bold text-white mb-12 text-center">Who We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card text-center p-6 rounded-2xl">
              <GraduationCap className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-white">Students</h3>
              <p className="text-slate-400 text-sm">Affordable laptops for online classes and projects.</p>
            </div>
            <div className="glass-card text-center p-6 rounded-2xl">
              <Briefcase className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-white">Professionals</h3>
              <p className="text-slate-400 text-sm">Reliable desktops for work-from-home and office use.</p>
            </div>
            <div className="glass-card text-center p-6 rounded-2xl">
              <Building2 className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-white">Businesses</h3>
              <p className="text-slate-400 text-sm">Cost-effective IT solutions for startups and enterprises.</p>
            </div>
            <div className="glass-card text-center p-6 rounded-2xl">
              <School className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-white">Institutions</h3>
              <p className="text-slate-400 text-sm">Bulk refurbished systems for schools and colleges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Vision & Mission */}
      <section className="py-24 bg-black reveal-section">
        <div className="container mx-auto px-6">
          <div className="glass-panel rounded-[3rem] p-10 lg:p-20 shadow-xl text-center relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('/grid-pattern.svg')]"></div>

            <Globe2 className="w-20 h-20 text-white mx-auto mb-8 animate-float" />

            <h2 className="reveal-text text-3xl lg:text-5xl font-bold text-white mb-16 relative z-10">Our Vision & Mission</h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto relative z-10">
              <div className="glass-card text-left p-8 rounded-2xl hover:border-white hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  Vision
                  <span className="w-full h-[1px] bg-white/30"></span>
                </h3>
                <p className="reveal-text text-slate-300 leading-relaxed text-lg">
                  At ABS IT Hub, our vision is to make technology accessible, affordable, and sustainable for everyone in India. We aim to bridge the digital divide by offering refurbished laptops and desktops that combine quality, affordability, and eco-consciousness. By extending the life of technology, we empower individuals, students, and businesses to grow while protecting our planet.
                </p>
              </div>
              <div className="glass-card text-left p-8 rounded-2xl hover:border-white hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  Mission
                  <span className="w-full h-[1px] bg-white/30"></span>
                </h3>
                <p className="reveal-text text-slate-300 leading-relaxed text-lg">
                  At ABS IT Hub, we believe in **making technology accessible, affordable, and sustainable**. By choosing refurbished, you’re not just saving money—you’re helping the planet.
                  Visit our website and order online with Free Shipping all over India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 8. Testimonials Section */}
      <section className="py-24 bg-black relative reveal-section">
        <div className="absolute inset-0 bg-black/90"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="reveal-text text-3xl lg:text-5xl font-bold text-white mb-6">What Our Customers Say</h2>
            <p className="reveal-text text-slate-400 text-lg">Trusted by students, professionals, and businesses across India.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Ramesh K.", role: "Student, Chennai", text: "ABS IT Hub helped me get a high‑performance laptop at half the price. The device works flawlessly, and their free shipping across India made the process so easy!" },
              { name: "Priya S.", role: "Entrepreneur, Coimbatore", text: "We ordered 15 refurbished desktops for our startup. Every system was tested, certified, and ready to use. Their team even guided us on upgrades. Highly recommended!" },
              { name: "Arun M.", role: "IT Professional, Bangalore", text: "I was skeptical about refurbished products, but ABS IT Hub proved me wrong. My Lenovo laptop looks brand new, runs smoothly, and came with warranty support." },
              { name: "Meena R.", role: "Teacher, Madurai", text: "Affordable, eco‑friendly, and reliable. ABS IT Hub is the perfect choice for anyone who wants quality without overspending." },
            ].map((review, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl relative hover:bg-white/5 transition-colors">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-white/20" />

                <p className="text-slate-300 text-lg mb-6 italic leading-relaxed">"{review.text}"</p>
                <div>
                  <h4 className="font-bold text-white text-lg">{review.name}</h4>
                  <p className="text-white text-sm">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA Footer */}
      <section className="py-24 reveal-section bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="reveal-text text-4xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight">
            Upgrade your tech today.
          </h2>
          <p className="reveal-text text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Upgrade your tech today with <span className="text-white font-bold">ABS IT Hub refurbished laptops and desktops</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Link href="/products" className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-full font-bold hover:shadow-white/40 shadow-lg transition-all hover:scale-105 text-lg">
              Browse Inventory
            </Link>
            <div className="flex items-center gap-2 text-slate-300 font-medium px-6 py-3 glass-card-sm rounded-full shadow-sm backdrop-blur-sm">
              <Truck className="w-5 h-5 text-white" />
              Free shipping across India
            </div>
          </div>



        </div>
      </section>
    </div>
  );
}
