import { HeroSlider } from '@/components/sections/HeroSlider';
import { AboutSection } from '@/components/sections/AboutSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { GroupCompanies } from '@/components/sections/GroupCompanies';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { ClientsSection } from '@/components/sections/ClientsSection';
import { AwardsSection } from '@/components/sections/AwardsSection';
import { TestimonialSection } from '@/components/sections/TestimonialSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <StatsSection />
      <GroupCompanies />
      <ProjectShowcase />
      <ClientsSection />
      <AwardsSection />
      <TestimonialSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
