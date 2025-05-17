
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePets } from '@/contexts/PetContext';
import PetCard from '@/components/PetCard';
import PetFilter from '@/components/PetFilter';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const PetsPage = () => {
  const { pets, loading } = usePets();
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    type: '',
    breed: '',
    gender: '',
    ageRange: [0, 15],
    size: '',
    status: '',
    location: '',
  });

  useEffect(() => {
    if (!loading) {
      applyFilters();
    }
  }, [pets, searchTerm, activeFilters, loading]);

  const applyFilters = () => {
    let filtered = [...pets];

    // Apply search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(pet => 
        pet.name.toLowerCase().includes(term) || 
        pet.breed.toLowerCase().includes(term) ||
        pet.description.toLowerCase().includes(term)
      );
    }

    // Apply type filter
    if (activeFilters.type) {
      filtered = filtered.filter(pet => pet.type === activeFilters.type);
    }

    // Apply breed filter
    if (activeFilters.breed) {
      const breedTerm = activeFilters.breed.toLowerCase();
      filtered = filtered.filter(pet => pet.breed.toLowerCase().includes(breedTerm));
    }

    // Apply gender filter
    if (activeFilters.gender) {
      filtered = filtered.filter(pet => pet.gender === activeFilters.gender);
    }

    // Apply age range filter
    filtered = filtered.filter(pet => 
      pet.age >= activeFilters.ageRange[0] && pet.age <= activeFilters.ageRange[1]
    );

    // Apply size filter
    if (activeFilters.size) {
      filtered = filtered.filter(pet => pet.size === activeFilters.size);
    }

    // Apply status filter
    if (activeFilters.status) {
      filtered = filtered.filter(pet => pet.status === activeFilters.status);
    }

    // Apply location filter
    if (activeFilters.location) {
      const locationTerm = activeFilters.location.toLowerCase();
      filtered = filtered.filter(pet => pet.location.toLowerCase().includes(locationTerm));
    }

    // Sort by most recent
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredPets(filtered);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-6">Find Your Perfect Pet</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name, breed, or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        
        <PetFilter onFilterChange={handleFilterChange} />
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading pets...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'} found
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPets.map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
              
              {filteredPets.length === 0 && (
                <div className="col-span-3 text-center py-12 bg-gray-50 rounded-lg">
                  <div className="mb-4">
                    <Search className="h-12 w-12 mx-auto text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No pets found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search terms to find more pets.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PetsPage;
