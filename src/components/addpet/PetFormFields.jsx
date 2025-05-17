import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PetFormFields = ({ formData, errors, handleChange, handleSelectChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 'name', label: 'Pet Name', error: errors.name },
          { id: 'type', label: 'Pet Type', error: errors.type, type: 'select', options: ['Dog', 'Cat', 'Other'], placeholder: 'Select pet type' },
          { id: 'breed', label: 'Breed', error: errors.breed },
          { id: 'age', label: 'Age (years)', error: errors.age, inputType: 'number', min: '0' },
          { id: 'gender', label: 'Gender', error: errors.gender, type: 'select', options: ['Male', 'Female'], placeholder: 'Select gender' },
          { id: 'size', label: 'Size', error: errors.size, type: 'select', options: ['Small', 'Medium', 'Large'], placeholder: 'Select size' },
          { id: 'location', label: 'Location', error: errors.location, placeholder: 'City, State' },
          { id: 'imageUrl', label: 'Image URL (optional)', placeholder: 'https://example.com/pet.jpg', helpText: 'Leave blank for default image.' },
        ].map(field => (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            {field.type === 'select' ? (
              <Select value={formData[field.id]} onValueChange={(value) => handleSelectChange(field.id, value)}>
                <SelectTrigger id={field.id} className={field.error ? 'border-red-500' : ''}>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={field.id}
                name={field.id}
                type={field.inputType || 'text'}
                min={field.min}
                value={formData[field.id]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={field.error ? 'border-red-500' : ''}
              />
            )}
            {field.error && <p className="text-xs text-red-500">{field.error}</p>}
            {field.helpText && <p className="text-xs text-gray-500">{field.helpText}</p>}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={5}
          placeholder="Tell us about this pet's personality, habits, training, and any special needs..."
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
      </div>
    </>
  );
};

export default PetFormFields;