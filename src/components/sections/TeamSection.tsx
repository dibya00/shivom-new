'use client';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { staggerContainer, fadeUp } from '@/lib/animations';
import Image from 'next/image';
import { useTeam } from '@/hooks/useTeam';
import { ITeam } from '@/types';
import { Loader2 } from 'lucide-react';

export function TeamSection() {
  const { data: team = [], isLoading } = useTeam();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Our Leadership" subtitle="Team" />
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-brand-orange animate-spin mb-4" />
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {team.map((member: ITeam) => (
              <motion.div key={member._id} variants={fadeUp} className="group">
                <div className="relative overflow-hidden rounded-xl mb-6 aspect-[4/5] bg-gray-100">
                  <Image 
                    src={member.image || '/placeholder-avatar.jpg'} 
                    alt={member.name} 
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
                </div>
                <h4 className="text-xl font-bold text-brand-navy mb-1">{member.name}</h4>
                <p className="text-brand-orange font-medium text-sm">{member.designation}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
