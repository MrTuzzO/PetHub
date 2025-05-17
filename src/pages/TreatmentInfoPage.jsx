
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppointments } from '@/contexts/AppointmentContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, ShieldCheck, Outdent as Tooth, Scissors, ScanSearch, Apple, Brain, AlertTriangle as TriangleAlert, ArrowRight, CalendarPlus, Info, CheckCircle } from 'lucide-react';
import AppointmentFormModal from '@/components/appointments/AppointmentFormModal';
import { useToast } from '@/components/ui/use-toast';

const iconMap = {
  Stethoscope, ShieldCheck, Tooth, Scissors, ScanSearch, Apple, Brain, TriangleAlert, CheckCircle
};

const TreatmentInfoPage = () => {
  const { services, bookAppointment } = useAppointments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const regularConsultationService = services.find(s => s.name.toLowerCase().includes('annual wellness exam') || s.name.toLowerCase().includes('regular consultation'));

  const otherServices = services.filter(s => s.id !== regularConsultationService?.id);

  const handleBookNow = (serviceName) => {
    setSelectedServiceForModal(serviceName);
    setIsModalOpen(true);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedServiceForModal(null);
  };

  const handleAppointmentBooked = (appointment) => {
    if (appointment && appointment.id) {
      navigate(`/appointment-confirmation/${appointment.id}`);
    } else {
       toast({
        title: "Booking Error",
        description: "Could not complete booking. Please try again.",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <Stethoscope className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight">Pet Treatment Services</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Comprehensive care for your beloved companions. Explore our range of veterinary services.
        </p>
      </motion.div>

      {regularConsultationService && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 p-6 md:p-8 rounded-xl shadow-2xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 dark:from-primary/20 dark:via-background dark:to-secondary/20 border border-primary/30"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-shrink-0 p-4 bg-primary text-primary-foreground rounded-full shadow-lg">
              <CheckCircle className="h-12 w-12 md:h-16 md:w-16" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">{regularConsultationService.name}</h2>
              <p className="text-muted-foreground mb-4 text-md">{regularConsultationService.description}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm mb-4">
                <p><span className="font-semibold">Duration:</span> {regularConsultationService.duration}</p>
                <p><span className="font-semibold">Est. Cost:</span> {regularConsultationService.priceRange}</p>
              </div>
            </div>
            <Button size="lg" onClick={() => handleBookNow(regularConsultationService.name)} className="w-full md:w-auto flex-shrink-0 shadow-md hover:shadow-lg transition-shadow">
              <CalendarPlus className="mr-2 h-5 w-5" /> Book Consultation
            </Button>
          </div>
        </motion.section>
      )}

      {otherServices.length > 0 && (
        <>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-semibold text-center mb-10 mt-12 pt-8 border-t border-border"
          >
            Other Specialized Services
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Stethoscope;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (regularConsultationService ? 0.3 : 0.1) + index * 0.05 }}
                  className="h-full"
                >
                  <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 card-gradient border-primary/10 hover:border-primary/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2.5 bg-primary/10 rounded-full">
                          <IconComponent className="h-7 w-7 text-primary" />
                        </div>
                        <CardTitle className="text-xl leading-tight">{service.name}</CardTitle>
                      </div>
                      <CardDescription className="text-xs">{service.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        <p><span className="font-medium">Duration:</span> {service.duration}</p>
                        <p><span className="font-medium">Est. Cost:</span> {service.priceRange}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => handleBookNow(service.name)} className="w-full" variant="outline">
                        <CalendarPlus className="mr-2 h-4 w-4" /> Book This Service
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
      
      {!regularConsultationService && otherServices.length === 0 && (
         <Card className="text-center py-12 card-gradient shadow-lg">
            <CardContent>
              <Info className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Services Available</h2>
              <p className="text-muted-foreground">
                We are currently updating our service list. Please check back soon.
              </p>
            </CardContent>
          </Card>
      )}

      <AppointmentFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        services={services}
        initialService={selectedServiceForModal}
        onAppointmentBooked={handleAppointmentBooked}
      />
    </div>
  );
};

export default TreatmentInfoPage;
