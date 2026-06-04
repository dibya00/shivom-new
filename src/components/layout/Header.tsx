'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn, Button } from '../ui/Button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Desktop dropdown states
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);

  // Mobile sub-menu toggle states
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileGroupOpen, setMobileGroupOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileAboutOpen(false);
    setMobileGroupOpen(false);
  }, [pathname]);

  const groupLinks = [
    { label: 'Shivom Enterprise', href: '/our-group/enterprise' },
    { label: 'Shivom Solar', href: '/our-group/solar' },
    { label: 'Shivom Concrete', href: '/our-group/concrete' },
  ];

  const aboutLinks = [
    { label: 'Awards & Certifications', href: '/awards-certifications' },
  ];

  // Check if dropdown path is active
  const isAboutActive = pathname === '/about' || pathname === '/awards-certifications';
  const isGroupActive = pathname.startsWith('/our-group/');

  return (
    <header className={cn(
      'fixed top-0 w-full z-40 transition-all duration-300',
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    )}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className={cn('text-2xl font-bold tracking-tight transition-colors', isScrolled ? 'text-brand-navy' : 'text-white')}>
            Shivom<span className="text-brand-orange">Group</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Home */}
          <Link href="/" className={cn(
            'text-sm font-semibold transition-colors hover:text-brand-orange',
            isScrolled ? 'text-brand-navy' : 'text-white/90',
            pathname === '/' && 'text-brand-orange'
          )}>
            Home
          </Link>

          {/* About Us (Dropdown) */}
          <div 
            className="relative group" 
            onMouseEnter={() => setAboutDropdownOpen(true)} 
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <Link 
              href="/about" 
              className={cn(
                'flex items-center gap-1 text-sm font-semibold transition-colors hover:text-brand-orange cursor-pointer',
                isScrolled ? 'text-brand-navy' : 'text-white/90',
                isAboutActive && 'text-brand-orange'
              )}
            >
              About Us <ChevronDown className="w-4 h-4" />
            </Link>
            <AnimatePresence>
              {aboutDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-xl py-2 flex flex-col border border-gray-100"
                >
                  <Link href="/about" className={cn(
                    "px-4 py-2 text-sm transition-colors hover:bg-gray-50",
                    pathname === '/about' ? 'text-brand-orange font-bold' : 'text-brand-navy hover:text-brand-orange'
                  )}>
                    About Overview
                  </Link>
                  {aboutLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className={cn(
                        "px-4 py-2 text-sm transition-colors hover:bg-gray-50",
                        pathname === link.href ? 'text-brand-orange font-bold' : 'text-brand-navy hover:text-brand-orange'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Our Group (Dropdown) */}
          <div 
            className="relative group" 
            onMouseEnter={() => setGroupDropdownOpen(true)} 
            onMouseLeave={() => setGroupDropdownOpen(false)}
          >
            <button className={cn(
              'flex items-center gap-1 text-sm font-semibold transition-colors hover:text-brand-orange cursor-pointer',
              isScrolled ? 'text-brand-navy' : 'text-white/90',
              isGroupActive && 'text-brand-orange'
            )}>
              Our Group <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {groupDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-xl py-2 flex flex-col border border-gray-100"
                >
                  {groupLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className={cn(
                        "px-4 py-2 text-sm transition-colors hover:bg-gray-50",
                        pathname === link.href ? 'text-brand-orange font-bold' : 'text-brand-navy hover:text-brand-orange'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Projects */}
          <Link href="/projects" className={cn(
            'text-sm font-semibold transition-colors hover:text-brand-orange',
            isScrolled ? 'text-brand-navy' : 'text-white/90',
            pathname === '/projects' && 'text-brand-orange'
          )}>
            Projects
          </Link>

          {/* Events */}
          <Link href="/events" className={cn(
            'text-sm font-semibold transition-colors hover:text-brand-orange',
            isScrolled ? 'text-brand-navy' : 'text-white/90',
            pathname === '/events' && 'text-brand-orange'
          )}>
            Events
          </Link>

          {/* Careers */}
          <Link href="/careers" className={cn(
            'text-sm font-semibold transition-colors hover:text-brand-orange',
            isScrolled ? 'text-brand-navy' : 'text-white/90',
            pathname === '/careers' && 'text-brand-orange'
          )}>
            Careers
          </Link>

          {/* Contact Us */}
          <Link href="/contact" className={cn(
            'text-sm font-semibold transition-colors hover:text-brand-orange',
            isScrolled ? 'text-brand-navy' : 'text-white/90',
            pathname === '/contact' && 'text-brand-orange'
          )}>
            Contact Us
          </Link>
        </nav>

        {/* Call to Action Quote Button */}
        <div className="hidden lg:block">
          <Link href="/contact">
            <Button variant="primary">Get a Quote</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={cn("lg:hidden p-2 cursor-pointer", isScrolled ? "text-brand-navy" : "text-white")} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white shadow-xl overflow-hidden border-t border-gray-100"
          >
            <div className="px-6 pt-4 pb-8 flex flex-col gap-5">
              {/* Home */}
              <Link 
                href="/" 
                className={cn("font-semibold text-lg hover:text-brand-orange", pathname === '/' ? 'text-brand-orange' : 'text-brand-navy')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* About Us (Mobile Expandable) */}
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className={cn(
                    "flex items-center justify-between w-full font-semibold text-lg text-left",
                    isAboutActive ? 'text-brand-orange' : 'text-brand-navy'
                  )}
                >
                  <span>About Us</span>
                  <ChevronDown className={cn("w-5 h-5 transition-transform", mobileAboutOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {mobileAboutOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 flex flex-col gap-2 overflow-hidden border-l-2 border-gray-100"
                    >
                      <Link 
                        href="/about" 
                        className={cn("py-1 font-medium hover:text-brand-orange", pathname === '/about' ? 'text-brand-orange' : 'text-brand-navy/80')}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        About Overview
                      </Link>
                      {aboutLinks.map((link) => (
                        <Link 
                          key={link.href} 
                          href={link.href} 
                          className={cn("py-1 font-medium hover:text-brand-orange", pathname === link.href ? 'text-brand-orange' : 'text-brand-navy/80')}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Our Group (Mobile Expandable) */}
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setMobileGroupOpen(!mobileGroupOpen)}
                  className={cn(
                    "flex items-center justify-between w-full font-semibold text-lg text-left",
                    isGroupActive ? 'text-brand-orange' : 'text-brand-navy'
                  )}
                >
                  <span>Our Group</span>
                  <ChevronDown className={cn("w-5 h-5 transition-transform", mobileGroupOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {mobileGroupOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 flex flex-col gap-2 overflow-hidden border-l-2 border-gray-100"
                    >
                      {groupLinks.map((link) => (
                        <Link 
                          key={link.href} 
                          href={link.href} 
                          className={cn("py-1 font-medium hover:text-brand-orange", pathname === link.href ? 'text-brand-orange' : 'text-brand-navy/80')}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Projects */}
              <Link 
                href="/projects" 
                className={cn("font-semibold text-lg hover:text-brand-orange", pathname === '/projects' ? 'text-brand-orange' : 'text-brand-navy')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>

              {/* Events */}
              <Link 
                href="/events" 
                className={cn("font-semibold text-lg hover:text-brand-orange", pathname === '/events' ? 'text-brand-orange' : 'text-brand-navy')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>

              {/* Careers */}
              <Link 
                href="/careers" 
                className={cn("font-semibold text-lg hover:text-brand-orange", pathname === '/careers' ? 'text-brand-orange' : 'text-brand-navy')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Careers
              </Link>

              {/* Contact Us */}
              <Link 
                href="/contact" 
                className={cn("font-semibold text-lg hover:text-brand-orange", pathname === '/contact' ? 'text-brand-orange' : 'text-brand-navy')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
