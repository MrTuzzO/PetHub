import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { initialPetsData } from '@/data/initialData';

const PetContext = createContext(null);

export const usePets = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePets must be used within a PetProvider');
  }
  return context;
};

const getInitialPets = () => {
  const storedPets = localStorage.getItem('pets');
  return storedPets ? JSON.parse(storedPets) : initialPetsData;
};

const getInitialAdoptionRequests = () => {
  const storedAdoptionRequests = localStorage.getItem('adoptionRequests');
  return storedAdoptionRequests ? JSON.parse(storedAdoptionRequests) : [];
};

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState(getInitialPets);
  const [adoptionRequests, setAdoptionRequests] = useState(getInitialAdoptionRequests);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { currentUser } = useAuth() || {}; 

  useEffect(() => {
    localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('adoptionRequests', JSON.stringify(adoptionRequests));
  }, [adoptionRequests]);
  
  useEffect(() => {
    setLoading(false);
  }, []);


  const addPet = (pet) => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to add a pet.",
        variant: "destructive",
      });
      return null;
    }
    const newPet = {
      ...pet,
      id: Date.now().toString(),
      status: 'available',
      createdAt: new Date().toISOString(),
      userId: currentUser.id 
    };
    
    setPets(prevPets => [...prevPets, newPet]);
    toast({
      title: "Pet added successfully",
      description: `${pet.name} has been added to the adoption list.`,
    });
    
    return newPet;
  };

  const updatePet = (id, updatedPetData) => {
    setPets(prevPets => prevPets.map(p => p.id === id ? { ...p, ...updatedPetData } : p));
    toast({
      title: "Pet updated",
      description: "The pet information has been updated successfully.",
    });
  };

  const deletePet = (id) => {
    const petToDelete = pets.find(p => p.id === id);
    if (petToDelete && petToDelete.userId !== currentUser?.id) {
      toast({
        title: "Unauthorized",
        description: "You can only delete pets you have listed.",
        variant: "destructive",
      });
      return;
    }

    setPets(prevPets => prevPets.filter(p => p.id !== id));
    setAdoptionRequests(prevRequests => prevRequests.filter(req => req.petId !== id));
    toast({
      title: "Pet removed",
      description: "The pet has been removed from the adoption list.",
    });
  };

  const submitAdoptionRequest = (petId, applicantInfo) => {
     if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to submit an adoption request.",
        variant: "destructive",
      });
      return null;
    }
    const request = {
      id: Date.now().toString(),
      petId,
      applicantInfo: { ...applicantInfo, userId: currentUser.id, applicantName: currentUser.name, applicantEmail: currentUser.email },
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setAdoptionRequests(prevRequests => [...prevRequests, request]);
    updatePet(petId, { status: 'pending' });
    
    toast({
      title: "Adoption request submitted",
      description: "Your adoption request has been submitted successfully. We'll contact you soon.",
    });
    
    return request;
  };

  const updateAdoptionRequest = (id, status) => {
    const request = adoptionRequests.find(req => req.id === id);
    if (!request) return;

    const petOfRequest = pets.find(p => p.id === request.petId);
    if (petOfRequest && petOfRequest.userId !== currentUser?.id) {
       toast({
        title: "Unauthorized",
        description: "You can only manage requests for pets you have listed.",
        variant: "destructive",
      });
      return;
    }
    
    setAdoptionRequests(prevRequests =>
      prevRequests.map(req => req.id === id ? { ...req, status } : req)
    );
    
    if (status === 'approved') {
      updatePet(request.petId, { status: 'adopted' });
      toast({
        title: "Adoption approved",
        description: "The adoption request has been approved.",
      });
    } else if (status === 'rejected') {
      updatePet(request.petId, { status: 'available' });
      toast({
        title: "Adoption rejected",
        description: "The adoption request has been rejected.",
      });
    }
  };

  const getPetById = (id) => {
    return pets.find(pet => pet.id === id);
  };

  const getAdoptionRequestsForPet = (petId) => {
    return adoptionRequests.filter(request => request.petId === petId);
  };
  
  const getAdoptionRequestsByUser = (userId) => {
    return adoptionRequests.filter(request => request.applicantInfo.userId === userId);
  };

  const getPetsListedByUser = (userId) => {
    return pets.filter(pet => pet.userId === userId);
  };


  const value = {
    pets,
    adoptionRequests,
    loading,
    addPet,
    updatePet,
    deletePet,
    submitAdoptionRequest,
    updateAdoptionRequest,
    getPetById,
    getAdoptionRequestsForPet,
    getAdoptionRequestsByUser,
    getPetsListedByUser,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};