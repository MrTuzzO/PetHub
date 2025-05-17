import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppointments } from '@/contexts/AppointmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, PlusCircle, Info, Clock, CheckCircle, XCircle, Edit3 } from 'lucide-react';
import AppointmentFormModal from '@/components/appointments/AppointmentFormModal';
import { formatDate } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AppointmentsPage = () => {
  const { services, getUserAppointments, cancelAppointment } = useAppointments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // For editing

  const userAppointments = getUserAppointments();

  const handleOpenModal = (appointment = null) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const statusConfig = {
    Scheduled: { icon: Clock, color: 'text-blue-500', bgColor: 'bg-blue-100' },
    Completed: { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-100' },
    Cancelled: { icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-100' },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0 flex items-center">
            <CalendarDays className="mr-3 h-8 w-8 text-primary" /> My Appointments
          </h1>
          <Button onClick={() => handleOpenModal()} size="lg">
            <PlusCircle className="mr-2 h-5 w-5" /> Book New Appointment
          </Button>
        </div>

        {userAppointments.length === 0 ? (
          <Card className="text-center py-12 card-gradient shadow-lg">
            <CardContent>
              <Info className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Appointments Yet</h2>
              <p className="text-muted-foreground">
                You haven't booked any appointments. Click the button above to schedule one.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {userAppointments.map((appt, index) => {
              const StatusIcon = statusConfig[appt.status]?.icon || Info;
              const statusColor = statusConfig[appt.status]?.color || 'text-gray-500';
              const statusBgColor = statusConfig[appt.status]?.bgColor || 'bg-gray-100';
              const serviceDetails = services.find(s => s.name === appt.service);

              return (
                <motion.div
                  key={appt.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 card-gradient">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-primary">{appt.service}</CardTitle>
                          <CardDescription>For: {appt.petName}</CardDescription>
                        </div>
                        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusBgColor} ${statusColor}`}>
                          <StatusIcon className={`mr-1.5 h-4 w-4 ${statusColor}`} />
                          {appt.status}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <p><span className="font-semibold">Date:</span> {formatDate(appt.date)}</p>
                        <p><span className="font-semibold">Time:</span> {appt.time}</p>
                        {serviceDetails?.duration && <p><span className="font-semibold">Duration:</span> {serviceDetails.duration}</p>}
                        {serviceDetails?.priceRange && <p><span className="font-semibold">Est. Cost:</span> {serviceDetails.priceRange}</p>}
                      </div>
                      {appt.notes && (
                        <div className="mt-4 pt-3 border-t">
                          <p className="font-semibold text-sm mb-1">Notes:</p>
                          <p className="text-sm text-muted-foreground bg-background/50 p-2 rounded-md">{appt.notes}</p>
                        </div>
                      )}
                    </CardContent>
                    {appt.status === 'Scheduled' && (
                      <CardFooter className="flex justify-end space-x-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-500 hover:bg-red-50 hover:text-red-700">
                              <XCircle className="mr-2 h-4 w-4" /> Cancel
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently cancel your appointment.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                              <AlertDialogAction onClick={() => cancelAppointment(appt.id)} className="bg-destructive hover:bg-destructive/90">
                                Yes, Cancel
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        {/* <Button variant="outline" size="sm" onClick={() => handleOpenModal(appt)}>
                          <Edit3 className="mr-2 h-4 w-4" /> Edit
                        </Button> */}
                      </CardFooter>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      <AppointmentFormModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedAppointment(null); }}
        services={services}
        existingAppointment={selectedAppointment}
      />
    </div>
  );
};

export default AppointmentsPage;