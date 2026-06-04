import { PageBanner } from '@/components/layout/PageBanner';
import { TeamSection } from '@/components/sections/TeamSection';

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Shivom Group" breadcrumb="About" />
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Vision & Mission</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
          A legacy of excellence in infrastructure, energy, and manufacturing. We aim to drive sustainable progress across communities by deploying state-of-the-art power grids and solar installations.
        </p>
      </div>
      
      {/* TeamSection integrates with React Query & CMS team data */}
      <TeamSection />
    </>
  );
}
