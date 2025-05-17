
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppointments } from '@/contexts/AppointmentContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, CalendarDays, Clock, User, PawPrint, Home, ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const AppointmentConfirmationPage = () => {
  const { appointmentId } = useParams();
  const { appointments, services } = useAppointments();
  const [appointment, setAppointment] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const foundAppointment = appointments.find(app => app.id === appointmentId);
    if (foundAppointment) {
      setAppointment(foundAppointment);
      const foundService = services.find(s => s.name === foundAppointment.service);
      setServiceDetails(foundService);
      toast({
        title: "Appointment Confirmed!",
        description: `Your appointment for ${foundAppointment.service} is successfully booked.`,
        variant: "default",
        duration: 7000,
        action: (
          <Button variant="outline" size="sm" onClick={() => navigate('/appointments')}>
            View All Appointments
          </Button>
        ),
      });
    } else {
      navigate('/appointments'); // Redirect if appointment not found
    }
  }, [appointmentId, appointments, services, navigate, toast]);

  if (!appointment) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="shadow-2xl card-gradient border-2 border-green-500 dark:border-green-400 overflow-hidden">
          <CardHeader className="bg-green-500/10 dark:bg-green-400/10 p-6 text-center">
            <CheckCircle className="mx-auto h-20 w-20 text-green-500 dark:text-green-400 mb-4" />
            <CardTitle className="text-3xl font-bold text-green-600 dark:text-green-400">Appointment Confirmed!</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Your booking for {appointment.service} is complete.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-md">
              <InfoItem icon={PawPrint} label="Pet Name" value={appointment.petName} />
              <InfoItem icon={User} label="Service For" value={appointment.service} />
              <InfoItem icon={CalendarDays} label="Date" value={formatDate(appointment.date)} />
              <InfoItem icon={Clock} label="Time" value={appointment.time} />
            </div>
            {serviceDetails && (
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-2 text-primary">Service Details:</h4>
                <p className="text-sm text-muted-foreground mb-1">{serviceDetails.description}</p>
                <div className="text-xs text-muted-foreground">
                  <span>Duration: {serviceDetails.duration}</span> | <span>Est. Cost: {serviceDetails.priceRange}</span>
                </div>
              </div>
            )}
            {appointment.notes && (
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-1 text-primary">Your Notes:</h4>
                <p className="text-sm text-muted-foreground bg-muted/50 dark:bg-muted/20 p-3 rounded-md">{appointment.notes}</p>
              </div>
            )}
            <p className="text-sm text-muted-foreground text-center pt-3">
              You will receive a confirmation email shortly. Please arrive 10 minutes before your scheduled time.
            </p>
          </CardContent>
          <CardFooter className="bg-muted/30 dark:bg-muted/10 p-6 flex flex-col sm:flex-row justify-center items-center gap-3">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to="/appointments">
                <CalendarDays className="mr-2 h-4 w-4" /> View All Appointments
              </Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
         <Button variant="ghost" onClick={() => navigate('/treatments')} className="mt-8 mx-auto flex items-center text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" /> Book Another Service
        </Button>
      </motion.div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start">
    <Icon className="h-5 w-5 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  </div>
);

export default AppointmentConfirmationPage;
