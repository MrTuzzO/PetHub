
import React, { useState, useEffect } from 'react';
import { useAppointments } from '@/contexts/AppointmentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarPlus as CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const AppointmentFormModal = ({ isOpen, onClose, services, existingAppointment, initialService, onAppointmentBooked }) => {
  const { bookAppointment } = useAppointments();
  const [formData, setFormData] = useState({
    petName: '', service: initialService || '', date: null, time: '', notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingAppointment) {
      setFormData({
        petName: existingAppointment.petName,
        service: existingAppointment.service,
        date: new Date(existingAppointment.date),
        time: existingAppointment.time,
        notes: existingAppointment.notes || '',
      });
    } else {
      setFormData({ petName: '', service: initialService || '', date: null, time: '', notes: '' });
    }
    setErrors({});
  }, [isOpen, existingAppointment, initialService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
    if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.petName.trim()) newErrors.petName = 'Pet name is required.';
    if (!formData.service) newErrors.service = 'Service is required.';
    if (!formData.date) newErrors.date = 'Date is required.';
    if (!formData.time.trim()) newErrors.time = 'Time is required.';
    else if (!/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i.test(formData.time)) newErrors.time = 'Invalid time format (e.g., 10:30 AM).';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const appointmentData = {
        ...formData,
        date: formData.date.toISOString(),
      };
      const bookedAppointment = await bookAppointment(appointmentData);
      setIsSubmitting(false);
      if (bookedAppointment) {
        onClose();
        if(onAppointmentBooked) onAppointmentBooked(bookedAppointment);
      }
    }
  };
  
  const timeSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"];


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{existingAppointment ? 'Edit Appointment' : 'Book New Appointment'}</DialogTitle>
          <DialogDescription>
            {existingAppointment ? 'Update the details for your appointment.' : 'Fill in the details to schedule a new appointment for your pet.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <FormField id="petName" label="Pet's Name" error={errors.petName}>
            <Input name="petName" value={formData.petName} onChange={handleChange} placeholder="e.g., Buddy" />
          </FormField>
          
          <FormField id="service" label="Service" error={errors.service}>
            <Select name="service" value={formData.service} onValueChange={(value) => handleSelectChange('service', value)}>
              <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
              <SelectContent>
                {services.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField id="date" label="Date" error={errors.date}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !formData.date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={formData.date} onSelect={handleDateChange} initialFocus disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))}/>
                </PopoverContent>
              </Popover>
            </FormField>

            <FormField id="time" label="Time" error={errors.time}>
               <Select name="time" value={formData.time} onValueChange={(value) => handleSelectChange('time', value)}>
                <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                <SelectContent>
                  {timeSlots.map(slot => <SelectItem key={slot} value={slot}>{slot}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <FormField id="notes" label="Notes (Optional)">
            <Textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Any specific concerns or requests?" />
          </FormField>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  Booking...
                </>
              ) : (
                existingAppointment ? 'Update Appointment' : 'Book Appointment'
              )}
              </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FormField = ({ id, label, error, children }) => (
  <div className="space-y-1.5">
    <Label htmlFor={id}>{label}</Label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default AppointmentFormModal;
