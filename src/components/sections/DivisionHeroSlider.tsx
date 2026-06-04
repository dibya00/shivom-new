'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSliders } from '@/hooks/useSliders';
import { ISlider } from '@/types';
import { Loader2 } from 'lucide-react';

interface Props {
  websiteKey: 'enterprise' | 'solar' | 'concrete';
  fallbackSlides: Array<{
    _id: string;
    image: string;
    title: string;
    subtitle: string;
    buttonText?: string;
    buttonLink?: string;
  }>;
}

export function DivisionHeroSlider({ websiteKey, fallbackSlides }: Props) {
  const { data: slides = [], isLoading } = useSliders(websiteKey);

  if (isLoading) {
    return (
      <div className="relative h-[80svh] min-h-[500px] w-full bg-brand-navy flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    );
  }

  // Fallback to static if empty array from API
  const displaySlides = slides.length > 0 ? slides : fallbackSlides.map(s => ({
    _id: s._id,
    image: s.image,
    title: s.title,
    subtitle: s.subtitle,
    buttonText: s.buttonText || 'Request Consultation',
    buttonLink: s.buttonLink || '/contact',
    order: 0
  } as ISlider));

  return (
    <div className="relative h-[80svh] min-h-[500px] w-full bg-brand-navy overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-full w-full"
      >
        {displaySlides.map((slide: ISlider, index: number) => (
          <SwiperSlide key={slide._id || index}>
            {({ isActive }) => (
              <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image 
                    src={slide.image} 
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className={`object-cover transition-transform duration-[10000ms] ${isActive ? 'scale-110' : 'scale-100'}`}
                  />
                </div>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/60 to-transparent" />
                
                {/* Slide Text Content */}
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl font-light leading-relaxed">
                        {slide.subtitle}
                      </p>
                      
                      {/* CTA Button Support */}
                      <div className="flex flex-wrap gap-4">
                        <Link href={slide.buttonLink || '/contact'}>
                          <Button size="lg" variant="primary">
                            {slide.buttonText || 'Request Consultation'}
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
