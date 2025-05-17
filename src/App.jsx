
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import PetsPage from '@/pages/PetsPage';
import PetDetailsPage from '@/pages/PetDetailsPage';
import AddPetPage from '@/pages/AddPetPage';
import MyAdoptionsPage from '@/pages/MyAdoptionsPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ProfilePage from '@/pages/ProfilePage';
import ProtectedRoute from '@/components/ProtectedRoute';
import StorePage from '@/pages/StorePage';
import ProductDetailsPage from '@/pages/ProductDetailsPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AppointmentsPage from '@/pages/AppointmentsPage';
import TreatmentInfoPage from '@/pages/TreatmentInfoPage';
import ContactPage from '@/pages/ContactPage';
import AppointmentConfirmationPage from '@/pages/AppointmentConfirmationPage';
import { PetProvider } from '@/contexts/PetContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProductProvider } from '@/contexts/ProductContext';
import { AppointmentProvider } from '@/contexts/AppointmentContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PetProvider>
          <ProductProvider>
            <AppointmentProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/pets" element={<PetsPage />} />
                  <Route path="/pets/:id" element={<PetDetailsPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/store" element={<StorePage />} />
                  <Route path="/store/product/:id" element={<ProductDetailsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/treatments" element={<TreatmentInfoPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  
                  <Route 
                    path="/add-pet" 
                    element={<ProtectedRoute><AddPetPage /></ProtectedRoute>} 
                  />
                  <Route 
                    path="/my-adoptions" 
                    element={<ProtectedRoute><MyAdoptionsPage /></ProtectedRoute>} 
                  />
                  <Route 
                    path="/profile" 
                    element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} 
                  />
                  <Route 
                    path="/checkout" 
                    element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} 
                  />
                  <Route 
                    path="/appointments" 
                    element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>} 
                  />
                   <Route 
                    path="/appointment-confirmation/:appointmentId" 
                    element={<ProtectedRoute><AppointmentConfirmationPage /></ProtectedRoute>} 
                  />
                </Routes>
              </Layout>
              <Toaster richColors closeButton />
            </AppointmentProvider>
          </ProductProvider>
        </PetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
