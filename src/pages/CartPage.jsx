import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Trash2, Minus, Plus, Info, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, currentQuantity, amount) => {
    const newQuantity = currentQuantity + amount;
    if (newQuantity >= 0) { // Allow 0 to remove via updateQuantity
      updateQuantity(productId, newQuantity);
    }
  };

  const cartTotal = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-6" />
        <h1 className="text-3xl font-semibold mb-3">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild size="lg">
          <Link to="/store">
            Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 lg:mb-0 flex items-center">
            <ShoppingCart className="mr-3 h-8 w-8 text-primary" /> Your Shopping Cart
          </h1>
          <Button variant="outline" onClick={clearCart} className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden shadow-lg card-gradient">
                  <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
                    <img 
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md border"
                     src="https://images.unsplash.com/photo-1495224814653-94f36c0a31ea" />
                    <div className="flex-grow">
                      <Link to={`/store/product/${item.id}`} className="hover:underline">
                        <h3 className="text-lg font-semibold text-primary">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="text-md font-medium mt-1">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity, -1)} disabled={item.quantity <= 1}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input 
                        type="number" 
                        value={item.quantity} 
                        readOnly 
                        className="w-16 text-center focus-visible:ring-0"
                      />
                      <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity, 1)} disabled={item.quantity >= item.stock}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-lg font-semibold w-24 text-right">{formatPrice(item.price * item.quantity)}</p>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-xl sticky top-24 card-gradient">
              <CardHeader>
                <CardTitle className="text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" onClick={() => navigate('/checkout')}>
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartPage;