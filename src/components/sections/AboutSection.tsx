'use client';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, slideInRight } from '@/lib/animations';
import { Button } from '../ui/Button';
import Image from 'next/image';
import { useHome } from '@/hooks/useHome';
import { resolveImageUrl } from '@/lib/transformers';
import Link from 'next/link';

export function AboutSection() {
  const { data } = useHome();
  const aboutData = data?.data?.about;

  const title = aboutData?.title || 'Engineering the Future of Infrastructure & Energy.';
  const description = aboutData?.description || 'As a premier Odisha-based conglomerate, Shivom Group executes large-scale government and utility projects across power distribution, renewable energy, and civil infrastructure.';
  
  // Resolve image dynamically with whitelisted fallback
  const mainImage = resolveImageUrl(
    aboutData?.image, 
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000'
  );
  
  // Secondary image fallback
  const secondaryImage = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800';

  const statValue = aboutData?.stats?.[0]?.value || '20+';
  const statLabel = aboutData?.stats?.[0]?.label || 'Years of Excellence';

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={fadeUp} className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              About Shivom Group
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-brand-navy leading-tight mb-6">
              {title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 text-lg leading-relaxed mb-6">
              {description}
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-600 text-lg leading-relaxed mb-8">
              We leverage our extensive manufacturing strength—including 500+ PSC poles daily capacity—and highly skilled workforce to deliver sustainable solutions that power Odisha&apos;s growth.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex gap-4">
              <Link href="/about">
                <Button size="lg">{aboutData?.buttonText || 'Discover Our History'}</Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Collage */}
          <motion.div 
            className="lg:w-1/2 relative h-[600px] w-full"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl relative">
              <Image 
                src={mainImage} 
                alt="Infrastructure Project" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply" />
            </div>
            
            <div className="absolute bottom-0 left-0 w-3/5 h-2/5 rounded-2xl overflow-hidden shadow-2xl border-8 border-white relative">
              <Image 
                src={secondaryImage} 
                alt="Solar Installation" 
                fill
                className="object-cover"
              />
            </div>
            
            <div className="absolute bottom-1/4 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden md:block">
              <div className="text-4xl font-bold text-brand-orange mb-1">{statValue}</div>
              <div className="text-sm font-semibold text-brand-navy uppercase tracking-wider">{statLabel}</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
