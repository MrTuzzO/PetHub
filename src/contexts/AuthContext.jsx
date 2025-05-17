import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password); 
    if (user) {
      const userToStore = { ...user };
      delete userToStore.password; 
      setCurrentUser(userToStore);
      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${user.name}!`,
      });
      return userToStore;
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password.',
        variant: 'destructive',
      });
      return null;
    }
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === userData.email)) {
      toast({
        title: 'Registration Failed',
        description: 'User with this email already exists.',
        variant: 'destructive',
      });
      return null;
    }
    
    const newUser = { 
      id: Date.now().toString(), 
      ...userData,
      avatarUrl: `https://avatar.vercel.sh/${userData.name.split(' ').join('')}.png` 
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const userToStore = { ...newUser };
    delete userToStore.password;
    setCurrentUser(userToStore);
    localStorage.setItem('currentUser', JSON.stringify(userToStore));
    
    toast({
      title: 'Registration Successful',
      description: `Welcome, ${newUser.name}! Your account has been created.`,
    });
    return userToStore;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const updateUser = (updatedData) => {
    if (!currentUser) return null;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex === -1) {
      toast({
        title: 'Update Failed',
        description: 'User not found.',
        variant: 'destructive',
      });
      return null;
    }
    
    const updatedUser = { ...users[userIndex], ...updatedData };
    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));

    const userToStore = { ...updatedUser };
    delete userToStore.password;
    setCurrentUser(userToStore);
    localStorage.setItem('currentUser', JSON.stringify(userToStore));

    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been updated successfully.',
    });
    return userToStore;
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};