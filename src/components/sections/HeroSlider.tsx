'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSliders } from '@/hooks/useSliders';
import { ISlider } from '@/types';
import { Loader2 } from 'lucide-react';

export function HeroSlider() {
  const { data: slides = [], isLoading } = useSliders();

  if (isLoading) {
    return (
      <div className="relative h-[100svh] w-full bg-brand-navy flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    );
  }

  // Fallback to static if empty array from API
  const displaySlides = slides.length > 0 ? slides : [
    {
      _id: 'fallback-1',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop',
      title: 'Building Tomorrow\'s Infrastructure',
      subtitle: 'Government-grade utility and civil engineering projects across Odisha',
      order: 1
    } as ISlider
  ];

  return (
    <div className="relative h-[100svh] w-full bg-brand-navy">
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
                <div className="absolute inset-0">
                  <Image 
                    src={slide.image} 
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className={`object-cover transition-transform duration-[10000ms] ${isActive ? 'scale-110' : 'scale-100'}`}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/60 to-transparent" />
                
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl font-light">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Button size="lg" variant="primary">Explore Projects</Button>
                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-brand-navy">Our Divisions</Button>
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
