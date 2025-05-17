
import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, Truck } from 'lucide-react';

const whyChooseUsItems = [
  { icon: Users, title: "Community Focused", description: "Join a passionate community of pet lovers, owners, and professionals." },
  { icon: ShieldCheck, title: "Trusted & Safe", description: "Secure platform for adoptions, purchases, and verified veterinary services." },
  { icon: Truck, title: "Convenient & Easy", description: "One-stop solution for all your pet needs, accessible from anywhere." },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50 dark:bg-background">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Why Choose PawFinder?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          {whyChooseUsItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center p-6"
            >
              <div className="inline-block p-5 bg-primary/10 rounded-full mb-5">
                <item.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
