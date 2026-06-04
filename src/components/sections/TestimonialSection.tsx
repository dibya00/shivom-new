'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { Quote, Loader2 } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useTestimonials } from '@/hooks/useTestimonials';
import { ITestimonial } from '@/types';

export function TestimonialSection() {
  const { data: testimonials = [], isLoading } = useTestimonials();

  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000')] opacity-5 bg-cover bg-center" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">Client Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Trusted by the State</h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full" />
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="w-12 h-12 text-brand-orange animate-spin mb-4" />
          </div>
        ) : (
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-4xl mx-auto"
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet bg-white/50', bulletActiveClass: 'swiper-pagination-bullet-active bg-brand-orange' }}
              className="pb-16"
            >
              {testimonials.map((item: ITestimonial) => (
                <SwiperSlide key={item._id}>
                  <div className="text-center px-4 md:px-12">
                    <Quote className="w-16 h-16 text-brand-orange/20 mx-auto mb-8" />
                    <p className="text-xl md:text-3xl text-gray-200 font-light leading-relaxed mb-10 italic">
                      &quot;{item.content}&quot;
                    </p>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                      <p className="text-brand-orange font-medium">{item.designation}{item.company ? ` - ${item.company}` : ''}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </div>
    </section>
  );
}
