
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '@/contexts/ProductContext';
import ProductCard from '@/components/store/ProductCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ShoppingBag, Star, Zap, TrendingUp } from 'lucide-react';

const StorePage = () => {
  const allProducts = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('name-asc');

  const categories = [...new Set(allProducts.map(p => p.category))];

  useEffect(() => {
    let tempProducts = [...allProducts];

    if (searchTerm) {
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      tempProducts = tempProducts.filter(p => p.category === categoryFilter);
    }

    switch (sortOrder) {
      case 'price-asc': tempProducts.sort((a, b) => a.price - b.price); break;
      case 'price-desc': tempProducts.sort((a, b) => b.price - a.price); break;
      case 'name-asc': tempProducts.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': tempProducts.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'rating': tempProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      default: break;
    }
    setFilteredProducts(tempProducts);
  }, [allProducts, searchTerm, categoryFilter, sortOrder]);

  const featuredProducts = allProducts.filter(p => p.tags?.includes('premium') || p.rating >= 4.7).slice(0, 4);
  const newArrivals = [...allProducts].sort((a,b) => (b.id > a.id ? 1 : -1)).slice(0, 4); // Assuming higher ID is newer
  const bestSellers = [...allProducts].sort((a,b) => (b.reviews || 0) - (a.reviews || 0)).slice(0,4);


  const ProductSection = ({ title, products, icon: Icon }) => (
    <section className="mb-16">
      <motion.h2 
        initial={{ opacity: 0, y:10 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold mb-6 flex items-center">
        <Icon className="mr-3 h-7 w-7 text-primary" /> {title}
      </motion.h2>
      {products.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id + title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : <p className="text-muted-foreground">No products in this section yet.</p>}
    </section>
  );


  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <ShoppingBag className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight">Pet Store</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find everything your furry friend needs!</p>
      </motion.div>

      <ProductSection title="Featured Products" products={featuredProducts} icon={Star} />
      <ProductSection title="New Arrivals" products={newArrivals} icon={Zap} />
      <ProductSection title="Best Sellers" products={bestSellers} icon={TrendingUp} />
      
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-semibold mb-6 mt-16 pt-8 border-t border-border flex items-center">
        <Filter className="mr-3 h-7 w-7 text-primary" /> All Products
      </motion.h2>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end p-4 bg-muted/50 dark:bg-muted/20 rounded-lg shadow">
        <div className="relative">
          <Label htmlFor="search-products" className="sr-only">Search Products</Label>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            id="search-products"
            type="text"
            placeholder="Search all products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div>
          <Label htmlFor="category-filter" className="block text-sm font-medium text-muted-foreground mb-1">Category</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sort-order" className="block text-sm font-medium text-muted-foreground mb-1">Sort By</Label>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger id="sort-order">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              <SelectItem value="rating">Rating (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id + "-all"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold">No Products Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default StorePage;
