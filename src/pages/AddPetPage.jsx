import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePets } from '@/contexts/PetContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import PetFormFields from '@/components/addpet/PetFormFields';
import PetFormActions from '@/components/addpet/PetFormActions';
import { defaultPetImage } from '@/lib/utils';

const AddPetPage = () => {
  const navigate = useNavigate();
  const { addPet } = usePets();
  const [formData, setFormData] = useState({
    name: '', type: '', breed: '', age: '', gender: '',
    size: '', description: '', location: '', imageUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.type) newErrors.type = 'Pet type is required';
    if (!formData.breed.trim()) newErrors.breed = 'Breed is required';
    if (!formData.age.trim()) newErrors.age = 'Age is required';
    else if (isNaN(formData.age) || parseInt(formData.age) < 0) newErrors.age = 'Age must be a valid number';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.size) newErrors.size = 'Size is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const petData = {
          ...formData,
          age: parseInt(formData.age),
          imageUrl: formData.imageUrl.trim() || defaultPetImage(formData.type)
        };
        const newPet = await addPet(petData);
        if (newPet) navigate(`/pets/${newPet.id}`);
      } catch (error) {
        console.error('Error adding pet:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <PlusCircle className="mr-3 h-8 w-8 text-primary" /> List a Pet for Adoption
        </h1>
        <Card className="shadow-xl card-gradient">
          <CardHeader>
            <CardTitle>Pet Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <PetFormFields
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
              />
              <PetFormActions
                isSubmitting={isSubmitting}
                onCancel={() => navigate('/pets')}
              />
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddPetPage;