import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { initialAppointmentsData, treatmentServicesData } from '@/data/initialData';

const AppointmentContext = createContext(null);

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error('useAppointments must be used within an AppointmentProvider');
  return context;
};

const getInitialAppointments = () => {
  const storedAppointments = localStorage.getItem('appointments');
  return storedAppointments ? JSON.parse(storedAppointments) : initialAppointmentsData;
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(getInitialAppointments);
  const [services] = useState(treatmentServicesData);
  const { toast } = useToast();
  const { currentUser } = useAuth() || {};

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const bookAppointment = (appointmentData) => {
    if (!currentUser) {
      toast({ title: "Login Required", description: "Please log in to book an appointment.", variant: "destructive" });
      return null;
    }
    const newAppointment = {
      id: Date.now().toString(),
      userId: currentUser.id,
      ...appointmentData,
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
    };
    setAppointments(prev => [...prev, newAppointment]);
    toast({ title: "Appointment Booked", description: `Your appointment for ${appointmentData.service} on ${new Date(appointmentData.date).toLocaleDateString()} is confirmed.` });
    return newAppointment;
  };

  const cancelAppointment = (appointmentId) => {
    if (!currentUser) return;
    const appointmentToCancel = appointments.find(app => app.id === appointmentId);
    if (appointmentToCancel && appointmentToCancel.userId !== currentUser.id) {
      toast({ title: "Unauthorized", description: "You can only cancel your own appointments.", variant: "destructive" });
      return;
    }
    setAppointments(prev => prev.map(app => app.id === appointmentId ? { ...app, status: 'Cancelled' } : app));
    toast({ title: "Appointment Cancelled", description: "Your appointment has been cancelled." });
  };

  const getUserAppointments = () => {
    if (!currentUser) return [];
    return appointments.filter(app => app.userId === currentUser.id).sort((a,b) => new Date(b.date) - new Date(a.date));
  };
  
  const getServiceById = (serviceId) => services.find(s => s.id === serviceId);

  const value = {
    appointments,
    services,
    bookAppointment,
    cancelAppointment,
    getUserAppointments,
    getServiceById,
  };

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};