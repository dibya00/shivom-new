import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Share2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <span className="text-2xl font-bold tracking-tight mb-6 block">
              Shivom<span className="text-brand-orange">Group</span>
            </span>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A premier infrastructure, power distribution, solar energy, and manufacturing enterprise committed to sustainable development and government-grade utility projects.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"><Globe className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"><Share2 className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">About Us</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Our Projects</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">News & Events</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Group */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Group</h4>
            <ul className="space-y-3">
              <li><Link href="/our-group/enterprise" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Shivom Enterprise</Link></li>
              <li><Link href="/our-group/solar" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Shivom Solar</Link></li>
              <li><Link href="/our-group/concrete" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Shivom Concrete</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                <span>Plot No. 123, Industrial Estate, Bhubaneswar, Odisha 751010</span>
              </li>
              <li className="flex gap-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                <span>info@shivomgroup.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Shivom Group. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="text-sm text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
