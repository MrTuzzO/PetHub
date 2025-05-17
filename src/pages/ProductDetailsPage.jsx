import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProductActions, useCart } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ShoppingCart, Star, Minus, Plus, Info } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProductActions();
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Info className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">The product you are looking for does not exist or may have been removed.</p>
        <Button asChild>
          <Link to="/store">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Store
          </Link>
        </Button>
      </div>
    );
  }

  const cartItem = cart.find(item => item.id === product.id);
  const availableStock = product.stock - (cartItem?.quantity || 0);

  const handleQuantityChange = (amount) => {
    setQuantity(prev => {
      const newQuantity = prev + amount;
      if (newQuantity < 1) return 1;
      if (newQuantity > availableStock) return availableStock;
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= availableStock) {
      addToCart(product.id, quantity);
      setQuantity(1); // Reset quantity after adding
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center text-muted-foreground hover:text-primary" 
        onClick={() => navigate('/store')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Store
      </Button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden shadow-xl"
        >
          <img 
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-contain bg-white p-4"
           src="https://images.unsplash.com/photo-1685194309039-518f3e51526f" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-between"
        >
          <div>
            <Badge variant="outline" className="mb-2">{product.category}</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-primary">{product.name}</h1>
            
            {product.rating && (
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">({product.reviews || 0} reviews)</span>
              </div>
            )}

            <p className="text-2xl font-semibold mb-6 text-foreground">{formatPrice(product.price)}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
             <p className="text-sm text-muted-foreground mb-1">
              Available stock: {product.stock > 0 ? product.stock : <span className="text-red-500 font-semibold">Out of Stock</span>}
            </p>
            {cartItem && <p className="text-sm text-blue-500">You have {cartItem.quantity} in cart.</p>}
          </div>

          {product.stock > 0 ? (
            <div className="mt-auto pt-6 border-t">
              <div className="flex items-center space-x-4 mb-4">
                <p className="font-medium">Quantity:</p>
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input 
                    type="number" 
                    value={quantity} 
                    readOnly 
                    className="w-16 text-center border-0 focus-visible:ring-0"
                  />
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} disabled={quantity >= availableStock}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleAddToCart} 
                size="lg" 
                className="w-full"
                disabled={availableStock === 0 || quantity === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          ) : (
             <Button size="lg" className="w-full mt-auto pt-6 border-t" disabled>
                Out of Stock
              </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;