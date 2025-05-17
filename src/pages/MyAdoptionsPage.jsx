import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePets } from '@/contexts/PetContext';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MyRequestsList from '@/components/myadoptions/MyRequestsList';
import MyListedPetsList from '@/components/myadoptions/MyListedPetsList';

const MyAdoptionsPage = () => {
  const { pets, adoptionRequests, updateAdoptionRequest, loading: petsLoading } = usePets();
  const { currentUser, loading: authLoading } = useAuth();

  const [myListedPets, setMyListedPets] = useState([]);
  const [requestsForMyPets, setRequestsForMyPets] = useState([]);
  const [mySubmittedRequests, setMySubmittedRequests] = useState([]);

  useEffect(() => {
    if (!petsLoading && !authLoading && currentUser) {
      const userListedPets = pets.filter(pet => pet.userId === currentUser.id);
      setMyListedPets(userListedPets);

      const listedPetIds = userListedPets.map(p => p.id);
      const reqsForListed = adoptionRequests
        .filter(req => listedPetIds.includes(req.petId))
        .map(request => ({
            ...request,
            pet: pets.find(p => p.id === request.petId)
        }));
      setRequestsForMyPets(reqsForListed);
      
      const submittedByUser = adoptionRequests
        .filter(req => req.applicantInfo.userId === currentUser.id)
        .map(request => ({
            ...request,
            pet: pets.find(p => p.id === request.petId)
        }));
      setMySubmittedRequests(submittedByUser);
    }
  }, [pets, adoptionRequests, currentUser, petsLoading, authLoading]);


  if (petsLoading || authLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading adoption data...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">My Adoptions Dashboard</h1>
        
        <Tabs defaultValue="my-requests" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="my-requests">My Adoption Requests</TabsTrigger>
            <TabsTrigger value="listed-pets">My Listed Pets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-requests">
            <MyRequestsList requests={mySubmittedRequests} />
          </TabsContent>
          
          <TabsContent value="listed-pets">
            <MyListedPetsList 
              listedPets={myListedPets}
              requestsForMyPets={requestsForMyPets}
              updateAdoptionRequest={updateAdoptionRequest}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default MyAdoptionsPage;