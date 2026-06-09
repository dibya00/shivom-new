'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sun, CheckCircle, ShieldCheck, Zap, FileText, Settings, ArrowRight, Phone, X, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ISolarProduct, ISolarPromotion } from '@/types';

// Helper for animated counters
function Counter({ value, suffix = '', duration = 1.5 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 25);
      
      const timer = setInterval(() => {
        start += Math.ceil(end / (totalMiliseconds / incrementTime));
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Types for components
interface SolarPageClientProps {
  products: ISolarProduct[];
  promotions: ISolarPromotion[];
  heroSlider: React.ReactNode;
}

export function SolarPageClient({ products, promotions, heroSlider }: SolarPageClientProps) {
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<{ title: string; image: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedGalleryImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Animation presets for scroll reveal
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const slideLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const slideRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const containerStagger: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemFade: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const kitFeatures = [
    { title: 'Solar Panels',                  image: '/solar-products/solar-panels.png' },
    { title: 'Solar Inverters',               image: '/solar-products/solar-inverter.png' },
    { title: 'Solar Batteries',               image: '/solar-products/solar-battery.png' },
    { title: 'AC/DC Distribution Boxes',      image: '/solar-products/acdb-dcdb.png' },
    { title: 'Earthing Systems',              image: '/solar-products/solar-earthing.png' },
    { title: 'Solar Cables & Accessories',    image: '/solar-products/solar-cable.jpg' },
    { title: 'Installation & Commissioning',  image: '/solar-products/installation-commissioning.jpg' },
    { title: 'Solar Structure',               image: '/solar-products/solar-structure.png' },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* 1. HERO SLIDER */}
      {heroSlider}
      
      {/* 2. ABOUT/OVERVIEW SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content Column */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="lg:w-1/2"
            >
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
                Renewable Energy Infrastructure
              </span>
              <h2 className="text-4xl font-bold text-brand-navy leading-tight mb-6">
                Leading-Edge Solar EPC & Deployment Solutions
              </h2>
              <p className="text-gray-600 text-lg text-justify-content mb-6">
                Shivom Solar Solutions is our dedicated green-energy division, delivering end-to-end solar EPC services for commercial solar projects, public institutions, and utility-scale installations. We accelerate solar deployment to support Odisha&apos;s renewable power targets.
              </p>
              <p className="text-gray-600 text-lg text-justify-content mb-8">
                From high-capacity rooftop solar arrays to vast ground-mounted renewable infrastructure, we provide government solar execution with precision engineering, premium component procurement, and seamless grid integration.
              </p>
              
              {/* Counters / Stats */}
              <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
                <div>
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-extrabold text-brand-orange mb-1"
                  >
                    50+ MW
                  </motion.div>
                  <div className="text-sm text-gray-500 font-medium">Solar Infrastructure Executed</div>
                </div>
                <div>
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-3xl md:text-4xl font-extrabold text-brand-orange mb-1"
                  >
                    250+
                  </motion.div>
                  <div className="text-sm text-gray-500 font-medium">Commercial & Rooftop Projects</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Image Column */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideRight}
              className="lg:w-1/2 relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl group"
            >
              <Image 
                src="/solar-infrastructure.webp" 
                alt="Utility scale solar plant and renewable infrastructure execution" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover transition-transform duration-[4000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply transition-opacity group-hover:opacity-10" />
              
              {/* Overlay Glass Badge */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 border border-brand-orange/20 animate-pulse" style={{ animationDuration: '3s' }}>
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span className="text-xs font-bold text-brand-navy tracking-wide">MNRE Aligned Solutions</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl transform transition-transform duration-500 group-hover:translate-y-[-5px]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center text-white flex-shrink-0 shadow-inner">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-extrabold text-brand-navy text-lg">Government Solar Execution</h4>
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Certified Tier-1 EPC contractor executing utility-scale infrastructure and state renewable programs.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. COMPLETE SOLAR KIT SOLUTIONS SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">

        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Column: Premium Image Card */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideLeft}
              className="lg:w-1/2 relative w-full flex justify-center lg:justify-start"
            >
              <div className="relative w-full max-w-[520px] aspect-square rounded-[24px] overflow-hidden shadow-2xl bg-white border border-gray-100 group">
                {/* Floating Animation Image Container */}
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full h-full relative"
                >
                  <Image 
                    src="/complete-solar-kit.webp"
                    alt="Complete Turnkey Solar Solutions Kit"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>

                {/* Floating Trust Glassmorphism Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute top-6 left-6 bg-white/70 backdrop-blur-md border border-white/40 shadow-xl px-5 py-3 rounded-2xl flex items-center gap-2.5 z-20"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-brand-orange animate-ping absolute top-3 left-3 shrink-0" />
                  <div className="w-3.5 h-3.5 rounded-full bg-brand-orange relative shrink-0" />
                  <span className="text-xs font-extrabold text-brand-navy tracking-wide uppercase">
                    100% Turnkey Solar Solutions
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Premium Copy & Feature Grid */}
            <div className="lg:w-1/2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
              >
                <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-4 block">
                  COMPLETE SOLAR SOLUTIONS
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight mb-6 tracking-tight">
                  Complete Solar Power Systems Under One Roof
                </h2>
                <p className="text-gray-600 text-lg text-justify-content mb-8 font-light">
                  Shivom Solar Solutions delivers complete turnkey solar power systems for residential, commercial, industrial, and institutional applications. From solar panels and inverters to batteries, protection systems, earthing, cabling, installation, and maintenance, we provide everything required for a reliable and efficient solar energy solution.
                </p>
              </motion.div>

              {/* Staggered Checklist Grid */}
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={containerStagger}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
              >
                {kitFeatures.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    variants={itemFade}
                  >
                    <button
                      onClick={() => setSelectedGalleryImage(feature)}
                      className="w-full text-left flex items-center gap-3 text-brand-navy font-semibold text-sm bg-white border border-gray-150/60 p-4 rounded-xl shadow-sm hover:border-brand-orange/40 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 group"
                    >
                      <CheckCircle className="w-5 h-5 text-brand-orange shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:text-brand-orange transition-colors">{feature.title}</span>
                    </button>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link prefetch={false} href="/contact/">
                  <Button 
                    size="lg" 
                    className="hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-brand-orange/20"
                  >
                    Get Solar Consultation <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACTIVE SCHEMES / PROMOTIONS (ENHANCED SURYA GHAR YOJANA SECTION) */}
      {promotions.length > 0 && (
        <section className="py-24 relative overflow-hidden bg-brand-navy text-white border-y border-brand-orange/20">
          {/* Subtle static background overlay — no looping animations */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-orange/20 rounded-full blur-[120px] mix-blend-screen opacity-40" />
            <div className="absolute bottom-[-20%] right-[20%] w-[70%] h-[70%] bg-brand-blue/20 rounded-full blur-[130px] mix-blend-screen opacity-30" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 relative">
              {/* PRIMARY HERO TITLE — PM Surya Ghar Yojana */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-5"
              >
                <a
                  href="https://consumer.pmsuryaghar.gov.in/consumer/#/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block"
                >
                  <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight tracking-tight group-hover:text-[#FFB703] transition-colors duration-300 cursor-pointer">
                    PM Surya Ghar Yojana
                  </h2>
                  {/* Accent underline */}
                  <div className="mt-3 h-1.5 w-2/3 mx-auto rounded-full bg-gradient-to-r from-brand-orange to-[#FFB703] group-hover:w-full transition-all duration-500" />
                </a>
              </motion.div>

              {/* Supporting headline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/90 leading-snug tracking-tight mb-2"
              >
                Power Your Home With
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#FFB703] leading-tight tracking-tight mb-8"
              >
                Free Solar Energy
              </motion.p>

              {/* Government Trust Ribbon */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-6 py-4 px-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 max-w-5xl mx-auto shadow-xl"
              >
                <div className="flex items-center gap-2 text-white/90 text-xs md:text-sm font-semibold">
                  <ShieldCheck className="w-5 h-5 text-[#FFB703]" />
                  <span>Government Supported Rooftop Solar Program</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 hidden md:block" />
                <div className="flex items-center gap-2 text-white/90 text-xs md:text-sm font-semibold">
                  <CheckCircle className="w-5 h-5 text-brand-orange" />
                  <span>Subsidy Assistance Available</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 hidden md:block" />
                <div className="flex items-center gap-2 text-white/90 text-xs md:text-sm font-semibold">
                  <FileText className="w-5 h-5 text-[#FFB703]" />
                  <span>End-to-End Documentation Support</span>
                </div>
              </motion.div>

              {/* 4-Step Journey Timeline */}
              <div className="w-full max-w-5xl mx-auto mt-12 mb-8 px-4">
                <div className="relative">
                  <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-white/10 -translate-y-1/2 hidden md:block z-0" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                    {[
                      { step: 1, title: 'Site Survey', desc: 'Expert physical & shadow audit' },
                      { step: 2, title: 'Subsidy Documentation Support', desc: 'Hassle-free paperwork' },
                      { step: 3, title: 'Solar Installation', desc: 'Tier-1 solar module setup' },
                      { step: 4, title: 'Subsidy Assistance', desc: 'DISCOM & subsidy release' },
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="flex flex-col items-center text-center group"
                      >
                        <div className="w-10 h-10 rounded-full bg-brand-navy border-2 border-white/20 flex items-center justify-center text-sm font-bold text-white group-hover:border-[#FFB703] group-hover:bg-[#FFB703] group-hover:text-brand-navy transition-all duration-300 shadow-xl mb-3 relative z-10">
                          {item.step}
                        </div>
                        <h4 className="font-bold text-white text-sm md:text-base mb-1 group-hover:text-[#FFB703] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-400 max-w-[150px]">
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12 items-stretch max-w-7xl mx-auto relative z-20">
              
              {/* Left Column: Solar Homes */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 relative flex"
              >
                <div className="relative h-[400px] lg:h-auto min-h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group flex-grow">
                  <Image 
                    src="/pm-surya-ghar-residential.webp" 
                    alt="Indian family smiling in front of a modern home with residential rooftop solar panels" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
 
              {/* Right Column: PM Surya Ghar Visual + Subsidy Benefits */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 relative flex flex-col gap-8 justify-between"
              >
                <div className="absolute inset-0 -z-10 opacity-30 mix-blend-screen pointer-events-none rounded-2xl overflow-hidden">
                  <Image 
                    src="/solar-energy-bg.webp" 
                    alt="Renewable Energy Theme" 
                    fill 
                    loading="lazy"
                    className="object-cover blur-sm"
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/10 to-transparent" />
                </div>
 
                {/* Subsidy Highlight Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-md border border-[#FFB703]/40 rounded-2xl p-5 text-center shadow-lg hover:bg-white/15 transition-all flex flex-col justify-center">
                    <div className="text-2xl font-extrabold text-[#FFB703] mb-1">₹1,38,000*</div>
                    <div className="text-xs text-gray-200 uppercase tracking-wider font-semibold">Up to Max Subsidy</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-brand-orange/40 rounded-2xl p-5 text-center shadow-lg hover:bg-white/15 transition-all flex flex-col justify-center">
                    <div className="text-xl font-extrabold text-brand-orange mb-1">Govt Supported</div>
                    <div className="text-xs text-gray-200 uppercase tracking-wider font-semibold">Scheme</div>
                  </div>
                  <div className="bg-[#FFB703]/10 backdrop-blur-md border border-[#FFB703]/40 rounded-2xl p-5 text-center shadow-lg hover:bg-[#FFB703]/20 transition-all flex flex-col justify-center">
                    <div className="text-xl font-extrabold text-[#FFB703] mb-1">End-to-End</div>
                    <div className="text-xs text-gray-200 uppercase tracking-wider font-semibold">Docs Assistance</div>
                  </div>
                </div>
                
                <div className="mt-4 text-[11px] text-gray-400 italic bg-brand-navy/30 inline-block px-3 py-1.5 rounded-lg border border-white/5 shadow-inner">
                  *Subsidy amount is subject to applicable Central and State Government policies and system capacity.
                </div>

                {/* Animated Credibility Counters */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-extrabold text-[#FFB703] mb-1">
                        <Counter value={500} suffix="+" />
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-300 font-semibold uppercase tracking-wider">Homes Consulted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-extrabold text-brand-orange mb-1">
                        <Counter value={100} suffix="%" />
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-300 font-semibold uppercase tracking-wider">Docs Support</div>
                    </div>
                    <div className="text-center flex flex-col items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[#FFB703]/20 flex items-center justify-center mb-1">
                        <ShieldCheck className="w-4 h-4 text-[#FFB703]" />
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-300 font-semibold uppercase tracking-wider leading-tight">Dedicated Solar<br/>Assistance Team</div>
                    </div>
                  </div>
                </div>
 
                <div className="bg-brand-navy/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#FFB703]" />
                    Active Subsidy Programs
                  </h3>
                  
                  <div className="flex flex-col gap-4">
                    {promotions.map((promo) => (
                      <div 
                        key={promo._id} 
                        className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/10 hover:border-[#FFB703]/30 transition-all duration-300 group"
                      >
                        <div className="flex-1">
                          <h4 className="text-base font-bold text-white mb-1 group-hover:text-[#FFB703] transition-colors flex items-center gap-2">
                            {promo.title}
                          </h4>
                          <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                            {promo.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stronger CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Link prefetch={false} href="/contact" className="w-full sm:flex-1">
                    <Button className="w-full bg-brand-orange text-white hover:bg-brand-orange/90 font-bold py-6 text-sm rounded-xl shadow-lg shadow-brand-orange/20 transition-all duration-300">
                      Get Free Solar Consultation
                    </Button>
                  </Link>
                  <Link prefetch={false} href="/contact" className="w-full sm:flex-1">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/15 font-bold py-6 text-sm rounded-xl transition-all duration-300">
                      Apply for Subsidy Assistance
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

        </section>
      )}

      {/* 5. EXISTING DYNAMIC PRODUCTS SECTION (UI ONLY UPGRADED) */}
      {products.length > 0 && (
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block animate-bounce" style={{ animationDuration: '3s' }}>
                Product Catalog
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
                Premium Solar Modules & Equipment
              </h2>
              <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full mt-4" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  key={product._id} 
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
                >
                  {product.featuredImage && (
                    <div className="relative h-60 w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                      <Image 
                        src={product.featuredImage} 
                        alt={product.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy" 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                      <div className="absolute top-4 left-4 bg-brand-navy/90 text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                        {product.category}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-brand-navy mb-3 group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {product.shortDescription}
                    </p>
                    
                    {product.specifications && product.specifications.length > 0 && (
                      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 mb-6 mt-auto">
                        <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">Specifications</h4>
                        <div className="space-y-1.5">
                          {product.specifications.map((spec, i) => (
                            <div key={i} className="flex justify-between text-xs border-b border-gray-100 pb-1.5 last:border-0 last:pb-0">
                              <span className="text-gray-400 font-semibold">{spec.label}</span>
                              <span className="text-brand-navy font-bold">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {product.features && product.features.length > 0 && (
                      <div className="mb-6">
                        <ul className="space-y-1.5">
                          {product.features.slice(0, 3).map((feat, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                              <CheckCircle className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. OUR EXPERTISE */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
        {/* Soft background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-4 block"
            >
              Our Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-extrabold text-brand-navy tracking-tight"
            >
              Solar EPC & Renewable Infrastructure
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Delivering high-yielding, robust, and cost-effective solar energy systems tailored to industrial, commercial, and public utilities.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Rooftop Solar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group flex flex-col"
            >
              <div className="h-56 w-full bg-gray-100 relative overflow-hidden">
                <Image src="/expertise-rooftop.webp" alt="Residential Rooftop Solar Installation" fill sizes="(max-width: 768px) 100vw, 25vw" loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Sun className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">Rooftop Solar</h3>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-gray-600 leading-relaxed text-sm font-medium">
                  Optimized rooftop solar installations for commercial buildings, manufacturing units, and government institutions with complete net-metering integration.
                </p>
              </div>
            </motion.div>

            {/* 2. Ground Mounted */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group flex flex-col"
            >
              <div className="h-56 w-full bg-gray-100 relative overflow-hidden">
                <Image src="/expertise-ground-mounted.webp" alt="Ground Mounted Utility Scale Solar Farm" fill sizes="(max-width: 768px) 100vw, 25vw" loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">Ground Mounted</h3>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-gray-600 leading-relaxed text-sm font-medium">
                  Utility-scale ground-mounted solar power plants with advanced tracking systems and high-efficiency modules for maximum energy yield.
                </p>
              </div>
            </motion.div>

            {/* 3. Industrial */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group flex flex-col"
            >
              <div className="h-56 w-full bg-gray-100 relative overflow-hidden">
                <Image src="/expertise-industrial.webp" alt="Industrial Factory Rooftop Solar Installation" fill sizes="(max-width: 768px) 100vw, 25vw" loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">Industrial Solutions</h3>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-gray-600 leading-relaxed text-sm font-medium">
                  Captive solar power generation for heavy industries, reducing operational OPEX and meeting corporate sustainability goals.
                </p>
              </div>
            </motion.div>

            {/* 4. Solar EPC */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group flex flex-col"
            >
              <div className="h-56 w-full bg-gray-100 relative overflow-hidden">
                <Image src="/expertise-epc.webp" alt="Engineers Reviewing Solar EPC Project Plans" fill sizes="(max-width: 768px) 100vw, 25vw" loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/90 backdrop-blur-md flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Settings className="w-6 h-6 animate-spin-slow" style={{ animationDuration: '4s' }} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">Turnkey EPC</h3>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-gray-600 leading-relaxed text-sm font-medium">
                  Full lifecycle engineering, procurement, and construction services ensuring robust execution from concept to commissioning.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE SHIVOM SOLAR */}
      <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2000')] opacity-[0.05] bg-cover bg-center mix-blend-luminosity" />
        
        {/* Animated gradients */}
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/20 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.15, 0.1], scale: [1, 1.2, 1], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/30 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-4 block"
            >
              Why Choose Shivom Solar
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight"
            >
              Scalable Renewable Infrastructure
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-lg md:text-xl leading-relaxed font-light"
            >
              Our solar solutions are built to withstand challenging environments and deliver predictable outputs. By utilizing industry-leading Tier 1 solar modules and smart inverters, we maximize investment returns.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl hover:bg-white/10 hover:border-brand-orange/30 hover:-translate-y-2 transition-all duration-500 group shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-orange to-[#FFB703] flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-2xl mb-4 text-white group-hover:text-[#FFB703] transition-colors">Tier-1 Components</h4>
              <p className="text-gray-300 text-justify-content font-light">
                Strictly sourcing high-efficiency modules and certified mounting structures from globally recognized manufacturers.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl hover:bg-white/10 hover:border-brand-blue/50 hover:-translate-y-2 transition-all duration-500 group shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-400 flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <Zap className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-2xl mb-4 text-white group-hover:text-blue-400 transition-colors">Grid Connectivity</h4>
              <p className="text-gray-300 text-justify-content font-light">
                Seamless coordination for net-metering approvals, regulatory compliance, and local DISCOM coordination.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl hover:bg-white/10 hover:border-emerald-400/50 hover:-translate-y-2 transition-all duration-500 group shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-2xl mb-4 text-white group-hover:text-emerald-400 transition-colors">Long-term Performance</h4>
              <p className="text-gray-300 text-justify-content font-light">
                Comprehensive Operation & Maintenance (O&M) and automated performance monitoring systems for maximum uptime.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. TALK TO SOLAR EXPERT (CTA WITH HOVER PULSE EFFECTS) */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-150 text-brand-navy rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden group">
            {/* Background motion gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,115,33,0.08),transparent)] transition-opacity duration-500 group-hover:opacity-70" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <span className="text-brand-orange font-bold uppercase tracking-wider text-xs mb-3 block">
                  Talk to Our Solar Team
                </span>
                <h3 className="text-3xl font-bold mb-1 text-brand-navy">Mr. Debendra Kumar Mishra</h3>
                <p className="text-gray-600 text-base font-semibold mb-6">Manager (Solar)</p>
                <p className="text-gray-500 text-sm max-w-xl">
                  Contact our solar manager directly to discuss EPC contracts, grid integrations, or corporate solar tenders.
                </p>
              </div>
              
              <div className="shrink-0 w-full md:w-auto">
                <a 
                  href="tel:+918895197406" 
                  className="flex items-center justify-center gap-3 bg-brand-navy hover:bg-brand-orange text-white transition-all duration-300 px-8 py-4 rounded-xl font-bold text-base cursor-pointer shadow-md hover:scale-105 active:scale-95 group-hover:shadow-lg text-center"
                >
                  <Phone className="w-5 h-5 animate-bounce shrink-0" style={{ animationDuration: '2s' }} />
                  <span>Mr. Debendra Kumar Mishra +91 8895197406</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Interactive Gallery Lightbox Modal */}
      <AnimatePresence>
        {selectedGalleryImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGalleryImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/90 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedGalleryImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/50 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-brand-navy transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="relative w-full bg-white" style={{ minHeight: '320px', maxHeight: '520px', height: '60vh' }}>
                <Image
                  src={selectedGalleryImage.image}
                  alt={selectedGalleryImage.title}
                  fill
                  loading="lazy"
                  className="object-contain p-6"
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw" />
              </div>
              
              <div className="p-6 md:p-8 bg-white flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-2">{selectedGalleryImage.title}</h3>
                  <p className="text-gray-600">Premium quality components for maximum efficiency and durability.</p>
                </div>
                <Button onClick={() => setSelectedGalleryImage(null)} variant="outline" className="hidden sm:flex">
                  Close Gallery
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
