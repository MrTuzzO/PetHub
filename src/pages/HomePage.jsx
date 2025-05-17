
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Stethoscope, Heart, ArrowRight, Users, ShieldCheck, Truck } from 'lucide-react';
import HeroSlider from '@/components/homepage/HeroSlider';
import FeatureCard from '@/components/homepage/FeatureCard';
import WhyChooseUs from '@/components/homepage/WhyChooseUs';
import Testimonials from '@/components/homepage/Testimonials';
import CallToAction from '@/components/homepage/CallToAction';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSlider />

      <section className="py-16 md:py-24 bg-background dark:bg-muted/20 paw-pattern">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary"
          >
            Everything Your Pet Needs, All in One Place
          </motion.h1>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={ShoppingCart}
              title="Pet Store Paradise"
              description="High-quality food, fun toys, and essential accessories. Curated for happy and healthy pets."
              link="/store"
              linkText="Shop Pet Supplies"
              delay={0.1}
            />
            <FeatureCard
              icon={Stethoscope}
              title="Expert Vet Care"
              description="Comprehensive treatments, routine check-ups, and emergency services by certified professionals."
              link="/treatments"
              linkText="Find Vet Services"
              delay={0.2}
            />
            <FeatureCard
              icon={Heart}
              title="Loving Homes Await"
              description="Connect with adorable pets seeking adoption. Find your new best friend or list a pet for a new home."
              link="/pets"
              linkText="Adopt a Companion"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;
