import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/contexts/ProductContext';
import { formatPrice } from '@/lib/utils';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col card-gradient">
        <Link to={`/store/product/${product.id}`} className="block">
          <div className="relative h-56 overflow-hidden">
            <img 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
             src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
            {product.tags && product.tags.length > 0 && (
              <Badge variant="secondary" className="absolute top-2 left-2 bg-primary/80 text-primary-foreground">
                {product.tags[0]}
              </Badge>
            )}
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{product.category}</span>
              {product.rating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  {product.rating.toFixed(1)}
                </div>
              )}
            </div>
          </CardHeader>
        </Link>
        <CardContent className="pb-3 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between items-center">
          <p className="text-xl font-semibold text-primary">{formatPrice(product.price)}</p>
          <Button size="sm" onClick={() => addToCart(product.id)} disabled={product.stock === 0}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;