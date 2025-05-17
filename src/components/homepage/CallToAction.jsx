
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-20 md:py-32 hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Join the PawFinder Family?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
        >
          Sign up today to start exploring, shopping, adopting, and caring for pets like never before.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-10 py-4 rounded-full shadow-xl transition-transform hover:scale-105">
            <Link to="/register">
              Create Your Account
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
