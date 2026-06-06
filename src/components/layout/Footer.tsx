import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Globe, Share2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/logo-footer.png" 
                alt="Shivom Group Footer Logo" 
                width={300} 
                height={60} 
                className="w-auto h-16 md:h-20 object-contain" 
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A premier infrastructure, power distribution, solar energy, and manufacturing enterprise committed to sustainable development and government-grade utility projects.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Website" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"><Globe className="w-4 h-4" /></a>
              <a href="#" aria-label="Share" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"><Share2 className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">About Us</Link></li>
              <li><Link href="/awards-certifications" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Awards & Certifications</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Projects</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Events</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Group */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Group</h4>
            <ul className="space-y-3">
              <li><Link href="/our-group/enterprise" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Shivom Enterprise</Link></li>
              <li><Link href="/our-group/solar" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Shivom Solar Solutions</Link></li>
              <li><Link href="/our-group/concrete" className="text-gray-400 hover:text-brand-orange transition-colors text-sm">Shivom Concrete Products</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-6">
              {/* Office Address */}
              <div className="flex gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">SHIVOM SOLAR SOLUTIONS</span>
                  <span>2nd Floor, Plot No.3200/14046</span>
                  <span>PS- Mancheswar, Puri-By-Pass Road</span>
                  <span>Rasulgarh, Bhubaneswar - 751010</span>
                  <span>Odisha, India</span>
                  <span className="text-brand-orange mt-1">GSTIN: 21BOKPS6552Q1Z7</span>
                </div>
              </div>
              
              {/* Phones */}
              <div className="flex gap-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="text-white block">HR & Accounts: Mr. Satyam Singh</span>
                    <span>+91 8895865734</span>
                  </div>
                  <div>
                    <span className="text-white block">Solar: Mr. Debendra Kumar Mishra</span>
                    <span>+91 8895197406</span>
                  </div>
                  <div>
                    <span className="text-white block">Enterprise: Mr. Manoranjan Bal</span>
                    <span>+91 7504929429</span>
                  </div>
                  <div>
                    <span className="text-white block">Concrete: Mr. Sunil Kumar Nayak</span>
                    <span>+91 6204929709</span>
                  </div>
                </div>
              </div>

              {/* Emails */}
              <div className="flex gap-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:info@shivomgroup.in" className="hover:text-white transition-colors">info@shivomgroup.in</a>
                  <a href="mailto:hr@shivomgroup.in" className="hover:text-white transition-colors">hr@shivomgroup.in</a>
                </div>
              </div>
            </div>
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
