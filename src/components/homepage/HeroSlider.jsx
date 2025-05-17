
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Stethoscope, Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const sliderItemsData = [
  {
    id: 1,
    title: "Premium Pet Supplies",
    description: "Top-quality food, toys, and accessories for your furry family members.",
    link: "/store",
    buttonText: "Explore Store",
    icon: ShoppingCart,
    imageLight: "https://images.unsplash.com/photo-1524591325999-f21f2a39801a?auto=format&fit=crop&w=1200&q=80",
    imageDark: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80",
    textColor: "text-white",
    buttonVariant: "secondary",
  },
  {
    id: 2,
    title: "Trusted Vet Services",
    description: "Book consultations, check-ups, and treatments with experienced professionals.",
    link: "/treatments",
    buttonText: "Book Appointment",
    icon: Stethoscope,
    imageLight: "https://images.unsplash.com/photo-1542868726-0f009bc91a12?auto=format&fit=crop&w=1200&q=80",
    imageDark: "https://images.unsplash.com/photo-1605280263927-024292674566?auto=format&fit=crop&w=1200&q=80",
    textColor: "text-white",
    buttonVariant: "secondary",
  },
  {
    id: 3,
    title: "Adopt a Loving Pet",
    description: "Find your new best friend. Give a deserving pet a forever home.",
    link: "/pets",
    buttonText: "Meet Pets",
    icon: Heart,
    imageLight: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=80",
    imageDark: "https://images.unsplash.com/photo-1598875184988-5e67b1a8cc9f?auto=format&fit=crop&w=1200&q=80",
    textColor: "text-white",
    buttonVariant: "secondary",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();

  const nextSlide = () => setCurrentSlide((prev) => (prev === sliderItemsData.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? sliderItemsData.length - 1 : prev - 1));

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 7000);
    return () => clearInterval(slideInterval);
  }, []);

  const { title, description, link, buttonText, icon: Icon, imageLight, imageDark, textColor, buttonVariant } = sliderItemsData[currentSlide];
  const currentImage = theme === 'light' ? imageLight : imageDark;

  return (
    <section className="relative h-[calc(80vh)] min-h-[500px] md:h-[calc(100vh-4rem)] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
          <img 
            src={currentImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
           src="https://images.unsplash.com/photo-1700052079026-353000d7a150" />
          
          <div className={`container mx-auto px-4 h-full flex flex-col justify-end items-start pb-20 md:pb-32 relative z-20 ${textColor}`}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="max-w-xl"
            >
              <Icon className="h-12 w-12 mb-4 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-md">{title}</h1>
              <p className="text-lg md:text-xl mb-8 opacity-90 drop-shadow-sm">{description}</p>
              <Button asChild size="lg" variant={buttonVariant} className="text-lg px-8 py-3 rounded-md shadow-lg transition-transform hover:scale-105">
                <Link to={link}>
                  {buttonText} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={prevSlide} 
        aria-label="Previous slide"
        className="absolute top-1/2 left-3 md:left-6 transform -translate-y-1/2 z-30 p-2 md:p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button 
        onClick={nextSlide} 
        aria-label="Next slide"
        className="absolute top-1/2 right-3 md:right-6 transform -translate-y-1/2 z-30 p-2 md:p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2.5">
        {sliderItemsData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out ${currentSlide === index ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
