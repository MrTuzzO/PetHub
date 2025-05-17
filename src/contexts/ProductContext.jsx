import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { initialProductsData } from '@/data/initialData';

const ProductContext = createContext(null);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context.products;
};

export const useProductActions = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProductActions must be used within a ProductProvider');
  return { getProductById: context.getProductById };
};

export const useCart = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useCart must be used within a ProductProvider');
  return { 
    cart: context.cart, 
    addToCart: context.addToCart, 
    removeFromCart: context.removeFromCart, 
    updateQuantity: context.updateQuantity,
    clearCart: context.clearCart,
    getCartTotal: context.getCartTotal,
  };
};

const getInitialProducts = () => {
  const storedProducts = localStorage.getItem('products');
  return storedProducts ? JSON.parse(storedProducts) : initialProductsData;
};

const getInitialCart = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(getInitialProducts);
  const [cart, setCart] = useState(getInitialCart);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const getProductById = (id) => products.find(p => p.id === id);

  const addToCart = (productId, quantity = 1) => {
    const product = getProductById(productId);
    if (!product) {
      toast({ title: "Error", description: "Product not found.", variant: "destructive" });
      return;
    }
    if (product.stock < quantity) {
      toast({ title: "Out of Stock", description: `Only ${product.stock} items left.`, variant: "destructive" });
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          toast({ title: "Stock Limit", description: `Cannot add more than ${product.stock} items.`, variant: "destructive" });
          return prevCart.map(item => item.id === productId ? { ...item, quantity: product.stock } : item);
        }
        return prevCart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item);
      }
      return [...prevCart, { ...product, quantity }];
    });
    toast({ title: "Added to Cart", description: `${product.name} added to your cart.` });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    const product = getProductById(productId);
    if (product) toast({ title: "Removed from Cart", description: `${product.name} removed from your cart.` });
  };

  const updateQuantity = (productId, quantity) => {
    const product = getProductById(productId);
    if (!product) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    if (quantity > product.stock) {
      toast({ title: "Stock Limit", description: `Only ${product.stock} items available.`, variant: "destructive" });
      setCart(prevCart => prevCart.map(item => item.id === productId ? { ...item, quantity: product.stock } : item));
      return;
    }
    setCart(prevCart => prevCart.map(item => item.id === productId ? { ...item, quantity } : item));
  };
  
  const clearCart = () => {
    setCart([]);
    toast({ title: "Cart Cleared", description: "Your shopping cart has been emptied." });
  };

  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    products,
    getProductById,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};