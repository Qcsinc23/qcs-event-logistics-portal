import type { Metadata } from 'next';
import LandingLayout from '@/components/landing/LandingLayout';
import Hero from '@/components/landing/Hero';
import IntroSection from '@/components/landing/IntroSection';
import KeyCharacteristics from '@/components/landing/KeyCharacteristics';
import HowItWorks from '@/components/landing/HowItWorks';
import ServicesDetail from '@/components/landing/ServicesDetail';
import CTASection from '@/components/landing/CTASection';
import Testimonials from '@/components/landing/Testimonials';

// Metadata for the homepage
export const metadata: Metadata = {
  title: 'Event Logistics Courier Service | Quiet Craft Solutions Inc.',
  description: 'Quiet Craft Solutions Inc. offers premier event logistics courier services: time-definite delivery, specialized handling, venue coordination, and more for your successful events.',
  // Add other relevant meta tags like keywords, open graph tags, etc.
  // openGraph: {
  //   title: 'Event Logistics Courier Service | Quiet Craft Solutions Inc.',
  //   description: 'Seamless event logistics and courier services.',
  //   images: [
  //     {
  //       url: '/images/og-image.jpg', // Replace with your actual OG image path
  //       width: 1200,
  //       height: 630,
  //       alt: 'Quiet Craft Solutions Event Logistics',
  //     },
  //   ],
  // },
};

export default function HomePage() {
  return (
    <LandingLayout>
      <Hero />
      <IntroSection />
      <KeyCharacteristics />
      <HowItWorks />
      <ServicesDetail />
      <CTASection />
      <Testimonials />
    </LandingLayout>
  );
}
