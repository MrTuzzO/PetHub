
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar } from 'lucide-react';

const PetCard = ({ pet }) => {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    adopted: 'bg-blue-100 text-blue-800'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="pet-card"
    >
      <Link to={`/pets/${pet.id}`}>
        <Card className="overflow-hidden h-full flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={pet.imageUrl} 
              alt={pet.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <Badge className={statusColors[pet.status] || 'bg-gray-100'}>
                {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
              </Badge>
            </div>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{pet.name}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{pet.breed}</span>
              <span className="mx-2">•</span>
              <span>{pet.age} {pet.age === 1 ? 'year' : 'years'}</span>
              <span className="mx-2">•</span>
              <span>{pet.gender}</span>
            </div>
          </CardHeader>
          <CardContent className="pb-2 flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {pet.description}
            </p>
          </CardContent>
          <CardFooter className="pt-0 flex flex-col items-start space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{pet.location}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>Listed on {formatDate(pet.createdAt)}</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default PetCard;
