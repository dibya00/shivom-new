'use client';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { staggerContainer, fadeUp } from '@/lib/animations';

import { useClients } from '@/hooks/useClients';
import { IClient } from '@/types';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export function ClientsSection() {
  const { data: clients = [], isLoading } = useClients();

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Trusted By Leaders" subtitle="Our Clients" />
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="w-12 h-12 text-brand-orange animate-spin mb-4" />
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {clients.map((client: IClient) => (
              <motion.div 
                key={client._id} 
                variants={fadeUp} 
                className="h-24 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center p-4 group hover:bg-white hover:border-brand-orange/30 hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                {client.logo ? (
                  <div className="relative w-full h-full opacity-60 group-hover:opacity-100 transition-opacity">
                    <Image src={client.logo} alt={client.name} fill className="object-contain" />
                  </div>
                ) : (
                  <span className="font-bold text-gray-400 group-hover:text-brand-navy text-lg text-center transition-colors">
                    {client.name}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
