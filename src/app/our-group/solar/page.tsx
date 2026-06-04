import { DivisionHeroSlider } from '@/components/sections/DivisionHeroSlider';
import Image from 'next/image';
import { Sun, CheckCircle, ShieldCheck, Zap, FileText, Settings, ArrowRight, Tag } from 'lucide-react';
import { solarService } from '@/services/solar.service';

export const revalidate = 300;

export default async function SolarPage() {
  const products = await solarService.getProducts();
  const promotions = await solarService.getPromotions();

  const fallbackSlides = [
    {
      _id: 'solar-fallback-1',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2000&auto=format&fit=crop',
      title: 'Shivom Solar',
      subtitle: 'Providing state-of-the-art grid scale renewable energy systems and products.',
      buttonText: 'Request Consultation',
      buttonLink: '/contact'
    }
  ];

  return (
    <>
      <DivisionHeroSlider websiteKey="solar" fallbackSlides={fallbackSlides} />
      
      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
                Renewable Energy Infrastructure
              </span>
              <h2 className="text-4xl font-bold text-brand-navy leading-tight mb-6">
                Leading-Edge Solar EPC & Deployment Solutions
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Shivom Solar is our dedicated green-energy division, delivering end-to-end solar EPC services for commercial solar projects, public institutions, and utility-scale installations. We accelerate solar deployment to support Odisha&apos;s renewable power targets.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                From high-capacity rooftop solar arrays to vast ground-mounted renewable infrastructure, we provide government solar execution with precision engineering, premium component procurement, and seamless grid integration.
              </p>
              <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
                <div>
                  <div className="text-3xl font-bold text-brand-orange mb-1">50+ MW</div>
                  <div className="text-sm text-gray-500 font-medium">Solar Infrastructure Executed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-orange mb-1">250+</div>
                  <div className="text-sm text-gray-500 font-medium">Commercial & Rooftop Projects</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop" 
                alt="Solar deployment and renewable installations" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-navy/20 mix-blend-multiply" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-gray-100 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy">Government Solar Execution</h4>
                    <p className="text-sm text-gray-600">Empaneled agency with deep expertise in executing state renewable programs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      {promotions.length > 0 && (
        <section className="py-20 bg-brand-orange/5 border-t border-brand-orange/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-3 block">
                Active Schemes & Offers
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
                Government Subsidies & Benefits
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {promotions.map((promo) => (
                <div 
                  key={promo._id} 
                  className="bg-white border border-brand-orange/10 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-bl-full flex items-start justify-end p-4 text-brand-orange">
                    <Tag className="w-6 h-6" />
                  </div>
                  
                  {promo.image && (
                    <div className="relative w-full md:w-44 h-44 rounded-xl overflow-hidden shrink-0 bg-gray-50 border border-gray-150">
                      <Image src={promo.image} alt={promo.title} fill className="object-cover" />
                    </div>
                  )}
                  
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-2xl font-bold text-brand-navy mb-3 pr-8 group-hover:text-brand-orange transition-colors">
                        {promo.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {promo.description}
                      </p>
                    </div>
                    {promo.validUntil && (
                      <span className="text-xs text-gray-400 font-semibold mb-4 block">
                        Valid Until: {new Date(promo.validUntil).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                    {promo.ctaLink && (
                      <a 
                        href={promo.ctaLink} 
                        className="text-brand-orange font-bold text-sm uppercase tracking-wider flex items-center gap-1.5 hover:gap-2.5 transition-all mt-auto"
                      >
                        {promo.ctaText || 'Learn More'} <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
                Product Catalog
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
                Premium Solar Modules & Equipment
              </h2>
              <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full mt-4" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div 
                  key={product._id} 
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col h-full"
                >
                  {product.featuredImage && (
                    <div className="relative h-60 w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                      <Image src={product.featuredImage} alt={product.name} fill className="object-cover" />
                      <div className="absolute top-4 left-4 bg-brand-navy/90 text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                        {product.category}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-brand-navy mb-3 group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {product.shortDescription}
                    </p>
                    
                    {product.specifications && product.specifications.length > 0 && (
                      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 mb-6 mt-auto">
                        <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">Specifications</h4>
                        <div className="space-y-1.5">
                          {product.specifications.map((spec, i) => (
                            <div key={i} className="flex justify-between text-xs border-b border-gray-100 pb-1.5 last:border-0 last:pb-0">
                              <span className="text-gray-400 font-semibold">{spec.label}</span>
                              <span className="text-brand-navy font-bold">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {product.features && product.features.length > 0 && (
                      <div className="mb-6">
                        <ul className="space-y-1.5">
                          {product.features.slice(0, 3).map((feat, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                              <CheckCircle className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Core Services */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
              Solar EPC & Renewable Infrastructure
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Delivering high-yielding, robust, and cost-effective solar energy systems tailored to industrial and public utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Rooftop Solar</h3>
              <p className="text-gray-600 leading-relaxed">
                Optimized rooftop solar installations for commercial buildings, manufacturing units, and government institutions with complete net-metering integration.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Solar EPC</h3>
              <p className="text-gray-600 leading-relaxed">
                Full lifecycle engineering, procurement, and construction services ensuring maximum energy yield, high durability, and low lifecycle maintenance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Government Solar Execution</h3>
              <p className="text-gray-600 leading-relaxed">
                Successful implementation of solar pumps, street lighting schemes, and grid-connected systems for municipalities and local administrative bodies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Shivom Solar */}
      <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2000')] opacity-10 bg-cover bg-center mix-blend-luminosity" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Scalable Renewable Infrastructure</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
              Our solar solutions are built to withstand challenging environments and deliver predictable outputs. By utilizing industry-leading Tier 1 solar modules and smart inverters, we maximize investment returns.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-white/10 text-brand-orange mt-1 flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Tier-1 Components</h4>
                  <p className="text-sm text-gray-400">Strictly sourcing high-efficiency modules and certified mounting structures.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-white/10 text-brand-orange mt-1 flex-shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Grid Connectivity</h4>
                  <p className="text-sm text-gray-400">Seamless coordination for net-metering approvals and discom coordination.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-white/10 text-brand-orange mt-1 flex-shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Long-term Performance</h4>
                  <p className="text-sm text-gray-400">Comprehensive maintenance and automated performance monitoring systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
