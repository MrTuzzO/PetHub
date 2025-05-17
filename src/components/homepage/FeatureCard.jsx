
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, link, linkText, delay }) => (
  <motion.divJ
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="h-full"
  >
    <Card className="h-full flex flex-col overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card/80 dark:bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40">
      <CardHeader className="items-center text-center p-6">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <Icon className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow text-center px-6 pb-6">
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardContent>
      <div className="p-6 pt-0 mt-auto">
        <Button asChild className="w-full" size="lg">
          <Link to={link}>
            {linkText} <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </Card>
  </motion.divJ>
);

export default FeatureCard;
