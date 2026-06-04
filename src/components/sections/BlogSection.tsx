'use client';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useFeaturedBlogs } from '@/hooks/useBlogs';
import { IBlog } from '@/types';

export function BlogSection() {
  const { data: blogs = [], isLoading } = useFeaturedBlogs();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Latest Insights" subtitle="News & Updates" />
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-brand-orange animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading insights...</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {blogs.slice(0, 3).map((blog: IBlog) => (
              <motion.div key={blog._id} variants={fadeUp} className="group cursor-pointer flex flex-col h-full">
                <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 shadow-md">
                  <Image 
                    src={blog.featuredImage || '/placeholder-blog.jpg'} 
                    alt={blog.title} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-brand-navy uppercase tracking-wider shadow-sm">
                    {blog.category}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-3">
                  <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-brand-navy mb-3 leading-snug group-hover:text-brand-orange transition-colors">
                  <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {blog.excerpt}
                </p>
                
                <Link href={`/blogs/${blog.slug}`} className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-wider text-sm mt-auto group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
