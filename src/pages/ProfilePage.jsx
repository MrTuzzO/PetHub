
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { usePets } from '@/contexts/PetContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger as OriginalTabsTrigger } from "@/components/ui/tabs";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { UserCircle, Edit3, PawPrint, ShoppingBag, CalendarCheck2, ListOrdered, Info, ShieldCheck, Clock, XCircle, CheckCircle, Heart } from 'lucide-react';
import { formatDate, formatPrice } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  const { currentUser, updateUser, loading } = useAuth();
  const { getPetsListedByUser, getAdoptionRequestsByUser } = usePets();
  const { getUserAppointments } = useAppointments();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userPets, setUserPets] = useState([]);
  const [userAdoptionRequests, setUserAdoptionRequests] = useState([]);
  const [userAppointments, setUserAppointments] = useState([]);
  // Placeholder for order history
  const [orderHistory, setOrderHistory] = useState([
    {id: 'order1', date: new Date(Date.now() - 86400000 * 5).toISOString(), total: 75.98, items: 3, status: 'Delivered'},
    {id: 'order2', date: new Date(Date.now() - 86400000 * 12).toISOString(), total: 32.50, items: 1, status: 'Delivered'},
    {id: 'order3', date: new Date(Date.now() - 86400000 * 2).toISOString(), total: 105.20, items: 5, status: 'Processing'},
  ]);


  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setAvatarUrl(currentUser.avatarUrl || `https://avatar.vercel.sh/${currentUser.name || 'user'}.png`);
      setUserPets(getPetsListedByUser(currentUser.id));
      setUserAdoptionRequests(getAdoptionRequestsByUser(currentUser.id));
      setUserAppointments(getUserAppointments(currentUser.id));
    }
  }, [currentUser, getPetsListedByUser, getAdoptionRequestsByUser, getUserAppointments]);

  const getInitials = (nameStr) => {
    if (!nameStr) return "??";
    const names = nameStr.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updatedData = { name, email };
    if (avatarUrl !== (currentUser.avatarUrl || `https://avatar.vercel.sh/${currentUser.name || 'user'}.png`)) {
      updatedData.avatarUrl = avatarUrl;
    }
    
    try {
      await updateUser(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
    }
    setIsSubmitting(false);
  };
  
  if (loading || !currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statusConfig = {
    Scheduled: { icon: Clock, color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    Completed: { icon: ShieldCheck, color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    Cancelled: { icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/30' },
    pending: { icon: Clock, color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
    approved: { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    rejected: { icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/30' },
    available: { icon: PawPrint, color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    adopted: { icon: Heart, color: 'text-pink-500', bgColor: 'bg-pink-100 dark:bg-pink-900/30' },
  };

  const ActivityItem = ({ icon: Icon, title, description, date, status, statusIcon: StatusIcon, statusColor, statusBgColor, linkTo }) => (
    <Link to={linkTo || '#'} className="block hover:bg-muted/50 dark:hover:bg-muted/20 p-4 rounded-lg transition-colors">
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-full ${statusBgColor || 'bg-primary/10'}`}>
          <Icon className={`h-6 w-6 ${statusColor || 'text-primary'}`} />
        </div>
        <div className="flex-grow">
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs text-muted-foreground mt-1">{formatDate(date)}</p>
        </div>
        {status && StatusIcon && (
          <div className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusBgColor} ${statusColor}`}>
            <StatusIcon className={`mr-1.5 h-3.5 w-3.5`} />
            {status}
          </div>
        )}
      </div>
    </Link>
  );

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-xl card-gradient border-primary/20 overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 dark:from-primary/20 dark:via-transparent dark:to-secondary/20 p-6 md:p-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/50 shadow-lg">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback className="text-3xl md:text-4xl bg-primary/20">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                 <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute bottom-0 right-0 rounded-full bg-background hover:bg-accent h-8 w-8 md:h-9 md:w-9"
                    onClick={() => {
                        const newUrl = prompt("Enter new avatar image URL:", avatarUrl);
                        if (newUrl) setAvatarUrl(newUrl);
                    }}
                >
                    <Edit3 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="text-center md:text-left">
              <CardTitle className="text-2xl md:text-3xl font-bold">{isEditing ? "Edit Your Profile" : name}</CardTitle>
              {!isEditing && <CardDescription className="text-base md:text-lg">{email}</CardDescription>}
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline" className="ml-auto mt-4 md:mt-0">
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            )}
          </CardHeader>
          
          {isEditing ? (
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-lg mx-auto">
                <FormField id="name" label="Full Name">
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </FormField>
                <FormField id="email" label="Email Address">
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormField>
                <FormField id="avatarUrl" label="Avatar URL">
                  <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://example.com/avatar.png" />
                </FormField>
                <div className="flex justify-end space-x-3 pt-2">
                   <Button type="button" variant="outline" onClick={() => setIsEditing(false)} disabled={isSubmitting}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          ) : (
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 rounded-none border-b bg-muted/30 dark:bg-muted/10 h-auto p-0">
                <TabTrigger value="activity">My Activity</TabTrigger>
                <TabTrigger value="pets">Listed Pets</TabTrigger>
                <TabTrigger value="appointments">Appointments</TabTrigger>
                <TabTrigger value="orders">Order History</TabTrigger>
              </TabsList>
              <TabsContent value="activity" className="p-4 md:p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {userAdoptionRequests.slice(0,3).map(req => {
                    const pet = getPetsListedByUser(currentUser.id).find(p => p.id === req.petId) || {name: 'A Pet'};
                    return (
                      <ActivityItem 
                        key={`req-${req.id}`} 
                        icon={PawPrint} 
                        title={`Adoption Request for ${pet.name}`} 
                        description={`Status: ${req.status}`} 
                        date={req.createdAt} 
                        status={req.status}
                        statusIcon={statusConfig[req.status]?.icon}
                        statusColor={statusConfig[req.status]?.color}
                        statusBgColor={statusConfig[req.status]?.bgColor}
                        linkTo={`/pets/${req.petId}`}
                      />
                    );
                  })}
                  {userAppointments.slice(0,3).map(appt => (
                     <ActivityItem 
                        key={`appt-${appt.id}`} 
                        icon={CalendarCheck2} 
                        title={`Appointment: ${appt.service}`} 
                        description={`For ${appt.petName} at ${appt.time}`} 
                        date={appt.date} 
                        status={appt.status}
                        statusIcon={statusConfig[appt.status]?.icon}
                        statusColor={statusConfig[appt.status]?.color}
                        statusBgColor={statusConfig[appt.status]?.bgColor}
                        linkTo="/appointments"
                      />
                  ))}
                  {orderHistory.slice(0,2).map(order => (
                     <ActivityItem 
                        key={`order-${order.id}`} 
                        icon={ShoppingBag} 
                        title={`Order #${order.id.substring(0,6)}`} 
                        description={`${order.items} items - Total: ${formatPrice(order.total)}`} 
                        date={order.date} 
                        status={order.status}
                        statusIcon={order.status === 'Delivered' ? CheckCircle : Clock}
                        statusColor={order.status === 'Delivered' ? 'text-green-500' : 'text-blue-500'}
                        statusBgColor={order.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}
                        linkTo="#"
                      />
                  ))}
                  {userPets.slice(0,2).map(pet => (
                     <ActivityItem 
                        key={`pet-${pet.id}`} 
                        icon={PawPrint} 
                        title={`Listed Pet: ${pet.name}`} 
                        description={`Status: ${pet.status}`} 
                        date={pet.createdAt} 
                        status={pet.status}
                        statusIcon={statusConfig[pet.status]?.icon}
                        statusColor={statusConfig[pet.status]?.color}
                        statusBgColor={statusConfig[pet.status]?.bgColor}
                        linkTo={`/pets/${pet.id}`}
                      />
                  ))}
                  {userAdoptionRequests.length === 0 && userAppointments.length === 0 && orderHistory.length === 0 && userPets.length === 0 && (
                    <p className="text-muted-foreground text-center py-6">No recent activity to display.</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="pets" className="p-4 md:p-6">
                <h3 className="text-xl font-semibold mb-4">Pets You've Listed ({userPets.length})</h3>
                {userPets.length > 0 ? (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {userPets.map(pet => (
                      <ActivityItem 
                        key={pet.id} 
                        icon={PawPrint} 
                        title={pet.name} 
                        description={`${pet.breed} - ${pet.age} years old`} 
                        date={pet.createdAt} 
                        status={pet.status}
                        statusIcon={statusConfig[pet.status]?.icon}
                        statusColor={statusConfig[pet.status]?.color}
                        statusBgColor={statusConfig[pet.status]?.bgColor}
                        linkTo={`/pets/${pet.id}`}
                      />
                    ))}
                  </div>
                ) : <p className="text-muted-foreground">You haven't listed any pets yet. <Link to="/add-pet" className="text-primary hover:underline">List a pet now!</Link></p>}
              </TabsContent>
              <TabsContent value="appointments" className="p-4 md:p-6">
                <h3 className="text-xl font-semibold mb-4">Your Appointments ({userAppointments.length})</h3>
                {userAppointments.length > 0 ? (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {userAppointments.map(appt => (
                      <ActivityItem 
                        key={appt.id} 
                        icon={CalendarCheck2} 
                        title={`${appt.service} for ${appt.petName}`} 
                        description={`Time: ${appt.time}`} 
                        date={appt.date} 
                        status={appt.status}
                        statusIcon={statusConfig[appt.status]?.icon}
                        statusColor={statusConfig[appt.status]?.color}
                        statusBgColor={statusConfig[appt.status]?.bgColor}
                        linkTo="/appointments"
                      />
                    ))}
                  </div>
                ) : <p className="text-muted-foreground">No appointments booked. <Link to="/treatments" className="text-primary hover:underline">Book one now!</Link></p>}
              </TabsContent>
              <TabsContent value="orders" className="p-4 md:p-6">
                <h3 className="text-xl font-semibold mb-4">Your Orders ({orderHistory.length})</h3>
                 {orderHistory.length > 0 ? (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {orderHistory.map(order => (
                      <ActivityItem 
                        key={order.id} 
                        icon={ShoppingBag} 
                        title={`Order #${order.id.substring(0,6)} - ${order.items} items`} 
                        description={`Total: ${formatPrice(order.total)}`} 
                        date={order.date} 
                        status={order.status}
                        statusIcon={order.status === 'Delivered' ? CheckCircle : Clock}
                        statusColor={order.status === 'Delivered' ? 'text-green-500' : 'text-blue-500'}
                        statusBgColor={order.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}
                        linkTo="#"
                      />
                    ))}
                  </div>
                ) : <p className="text-muted-foreground">No orders placed yet. <Link to="/store" className="text-primary hover:underline">Shop now!</Link></p>}
              </TabsContent>
            </Tabs>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

const FormField = ({ id, label, children }) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="font-medium">{label}</Label>
    {children}
  </div>
);

const TabTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm hover:bg-primary/10 dark:hover:bg-primary/5",
      className
    )}
    {...props}
  />
));
TabTrigger.displayName = TabsPrimitive.Trigger.displayName;


export default ProfilePage;
