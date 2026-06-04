'use client';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useAwards } from '@/hooks/useAwards';
import { IAward } from '@/types';
import { Loader2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/Button';

export function AwardsSection() {
  const { data: awards = [], isLoading } = useAwards();
  const featuredAwards = awards.slice(0, 4);

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">Our Milestones</span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">Awards & Certifications</h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full" />
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="w-12 h-12 text-brand-orange animate-spin mb-4" />
          </div>
        ) : awards.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 font-medium">No awards or certifications available.</p>
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {featuredAwards.map((award: IAward) => (
                <motion.div 
                  key={award._id} 
                  variants={fadeUp}
                  className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="text-4xl font-bold text-gray-200 group-hover:text-brand-orange/20 transition-colors mb-4">
                      {award.year || '2024'}
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2 leading-snug">{award.title}</h3>
                    <div className="text-xs font-semibold text-brand-orange mb-3 tracking-wider uppercase">
                      {award.issuedBy || 'Appreciation'}
                    </div>
                    {award.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {award.description}
                      </p>
                    )}
                  </div>
                  {award.image && (
                    <div className="relative h-40 w-full rounded-lg overflow-hidden mt-4 bg-white border border-gray-100 shadow-sm">
                      <Image 
                        src={award.image} 
                        alt={award.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover" 
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* View All Button */}
            <div className="flex justify-center mt-10">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link href="/awards-certifications">
                  <Button 
                    variant="secondary" 
                    className="flex items-center gap-2 hover:bg-brand-orange hover:text-white hover:border-transparent transition-all"
                  >
                    <span>View All Awards & Certifications</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
