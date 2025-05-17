
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePets } from '@/contexts/PetContext';
import { Button } from '@/components/ui/button';
import AdoptionRequestForm from '@/components/AdoptionRequestForm';
import { MapPin, Calendar, Heart, Info, ArrowLeft, PawPrint as Paw, Ruler, Clock, User } from 'lucide-react';

const PetDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPetById, loading } = usePets();
  const [pet, setPet] = useState(null);
  const [isAdoptionFormOpen, setIsAdoptionFormOpen] = useState(false);
  
  useEffect(() => {
    if (!loading) {
      const foundPet = getPetById(id);
      if (foundPet) {
        setPet(foundPet);
      } else {
        // Pet not found, redirect to pets page
        navigate('/pets');
      }
    }
  }, [id, getPetById, loading, navigate]);

  if (loading || !pet) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading pet details...</p>
      </div>
    );
  }

  const handleAdoptClick = () => {
    setIsAdoptionFormOpen(true);
  };

  const closeAdoptionForm = () => {
    setIsAdoptionFormOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    adopted: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center" 
        onClick={() => navigate('/pets')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Pets
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={pet.imageUrl} 
              alt={pet.name} 
              className="w-full h-[400px] object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <h1 className="text-3xl font-bold mr-3">{pet.name}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[pet.status]}`}>
              {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Paw className="h-5 w-5 mr-2 text-primary" />
              <span>{pet.type}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Info className="h-5 w-5 mr-2 text-primary" />
              <span>{pet.breed}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <span>{pet.age} {pet.age === 1 ? 'year' : 'years'} old</span>
            </div>
            <div className="flex items-center text-gray-600">
              <User className="h-5 w-5 mr-2 text-primary" />
              <span>{pet.gender}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Ruler className="h-5 w-5 mr-2 text-primary" />
              <span>{pet.size} Size</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              <span>{pet.location}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About {pet.name}</h2>
            <p className="text-gray-700 leading-relaxed">{pet.description}</p>
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-8">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Listed on {formatDate(pet.createdAt)}</span>
          </div>

          {pet.status === 'available' ? (
            <Button 
              onClick={handleAdoptClick} 
              className="w-full md:w-auto"
              size="lg"
            >
              <Heart className="mr-2 h-5 w-5" />
              Adopt {pet.name}
            </Button>
          ) : pet.status === 'pending' ? (
            <Button disabled className="w-full md:w-auto" size="lg">
              <Info className="mr-2 h-5 w-5" />
              Adoption Pending
            </Button>
          ) : (
            <Button disabled className="w-full md:w-auto" size="lg">
              <Info className="mr-2 h-5 w-5" />
              Already Adopted
            </Button>
          )}
        </motion.div>
      </div>

      <AdoptionRequestForm 
        petId={pet.id} 
        isOpen={isAdoptionFormOpen} 
        onClose={closeAdoptionForm} 
      />
    </div>
  );
};

export default PetDetailsPage;
