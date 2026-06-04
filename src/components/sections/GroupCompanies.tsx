'use client';
import { Card } from '../ui/Card';
import { SectionHeading } from '../ui/SectionHeading';
import { ArrowRight, Zap, Sun, Factory } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const divisions = [
  {
    id: 'enterprise',
    name: 'Shivom Enterprise',
    icon: Zap,
    desc: 'EPC, Power distribution, and government utility infrastructure projects.',
    href: '/our-group/enterprise',
    color: 'text-brand-blue'
  },
  {
    id: 'solar',
    name: 'Shivom Solar',
    icon: Sun,
    desc: 'Rooftop and commercial solar EPC, renewable energy solutions.',
    href: '/our-group/solar',
    color: 'text-brand-orange'
  },
  {
    id: 'concrete',
    name: 'Shivom Concrete',
    icon: Factory,
    desc: 'Manufacturing excellence with 500+ PSC poles/day production capacity.',
    href: '/our-group/concrete',
    color: 'text-gray-600'
  }
];

export function GroupCompanies() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Our Divisions" subtitle="The Shivom Group" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {divisions.map((div, i) => (
            <motion.div key={div.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link href={div.href} className="block group h-full">
                <Card className="h-full p-8 flex flex-col border-transparent hover:border-brand-orange/20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
                  <div className={`w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-8 ${div.color} shadow-sm`}>
                    <div.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-4 group-hover:text-brand-orange transition-colors">{div.name}</h3>
                  <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{div.desc}</p>
                  <div className="flex items-center text-sm font-semibold text-brand-blue group-hover:text-brand-orange transition-colors mt-auto">
                    Explore Division <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
