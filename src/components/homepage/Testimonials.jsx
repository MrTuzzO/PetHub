
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const testimonialsData = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Dog Parent",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    quote: "PawFinder made adopting Max so easy! The process was smooth, and we found our perfect furry companion. The store also has amazing products!"
  },
  {
    id: 2,
    name: "John B.",
    role: "Cat Lover",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
    quote: "Booking vet appointments through PawFinder is a breeze. Dr. Emily was fantastic with Whiskers. Highly recommend their treatment services."
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-background dark:bg-muted/20 paw-pattern">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary"
        >
          Happy Paws, Happy People
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card/80 dark:bg-card/50 backdrop-blur-sm shadow-lg h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <img  alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 object-cover" src={testimonial.avatar} />
                    <div>
                      <p className="font-semibold text-lg">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic flex-grow">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
         <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Read More Stories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
