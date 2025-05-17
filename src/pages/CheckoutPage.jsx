import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/ProductContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { formatPrice } from '@/lib/utils';
import { CreditCard, ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'USA', // Default
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartTotal = getCartTotal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required.';
    if (!formData.country.trim()) newErrors.country = 'Country is required.';
    if (!formData.cardNumber.trim() || !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Valid 16-digit card number is required.';
    if (!formData.expiryDate.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Valid expiry date (MM/YY) is required.';
    if (!formData.cvc.trim() || !/^\d{3,4}$/.test(formData.cvc)) newErrors.cvc = 'Valid CVC (3 or 4 digits) is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ title: "Validation Error", description: "Please correct the errors in the form.", variant: "destructive" });
      return;
    }
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderPlaced(true);
    clearCart();
    toast({ title: "Order Placed!", description: "Thank you for your purchase. Your order is confirmed." });
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
          <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Thank you for your purchase, {formData.name}. Your pet supplies are on their way!
          </p>
          <Button asChild size="lg">
            <Link to="/store">Continue Shopping</Link>
          </Button>
        </motion.div>
      </div>
    );
  }
  
  if (cart.length === 0 && !orderPlaced) {
     navigate('/store'); 
     return null;
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center text-muted-foreground hover:text-primary" 
        onClick={() => navigate('/cart')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Button>
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <CreditCard className="mr-3 h-8 w-8 text-primary" /> Checkout
      </h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit}>
            <Card className="mb-6 shadow-lg card-gradient">
              <CardHeader><CardTitle>Shipping Information</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField id="name" label="Full Name" value={formData.name} onChange={handleChange} error={errors.name} />
                <FormField id="email" label="Email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
                <FormField id="address" label="Address" value={formData.address} onChange={handleChange} error={errors.address} className="md:col-span-2" />
                <FormField id="city" label="City" value={formData.city} onChange={handleChange} error={errors.city} />
                <FormField id="postalCode" label="Postal Code" value={formData.postalCode} onChange={handleChange} error={errors.postalCode} />
                <FormField id="country" label="Country" value={formData.country} onChange={handleChange} error={errors.country} />
              </CardContent>
            </Card>

            <Card className="shadow-lg card-gradient">
              <CardHeader><CardTitle>Payment Details</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField id="cardNumber" label="Card Number" placeholder="•••• •••• •••• ••••" value={formData.cardNumber} onChange={handleChange} error={errors.cardNumber} className="md:col-span-2" />
                <FormField id="expiryDate" label="Expiry Date" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} error={errors.expiryDate} />
                <FormField id="cvc" label="CVC" placeholder="•••" value={formData.cvc} onChange={handleChange} error={errors.cvc} />
              </CardContent>
            </Card>
            
            <Button type="submit" size="lg" className="w-full mt-8" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  Processing Payment...
                </>
              ) : (
                `Pay ${formatPrice(cartTotal)}`
              )}
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-24 shadow-xl card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center"><ShoppingBag className="mr-2 h-6 w-6 text-primary" /> Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name} <span className="text-xs text-muted-foreground">(x{item.quantity})</span></p>
                    <p className="text-xs text-muted-foreground">{formatPrice(item.price)} each</p>
                  </div>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3 space-y-2">
                <div className="flex justify-between text-md">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-md">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-primary">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const FormField = ({ id, label, type = "text", value, onChange, error, placeholder, className }) => (
  <div className={`space-y-1 ${className || ''}`}>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={error ? 'border-red-500' : ''}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default CheckoutPage;