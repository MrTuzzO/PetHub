import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const PetFormActions = ({ isSubmitting, onCancel }) => {
  return (
    <div className="flex justify-end space-x-3 pt-4">
      <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
            Submitting...
          </>
        ) : (
          <>
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Pet
          </>
        )}
      </Button>
    </div>
  );
};

export default PetFormActions;