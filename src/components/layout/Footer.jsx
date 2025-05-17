import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Heart, ShoppingCart, Stethoscope, UserCircle, LogIn, UserPlus, PlusCircle, CalendarDays } from 'lucide-react';

const Footer = () => {
  const { currentUser, logout } = useAuth();

  const commonNavItems = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/pets', label: 'Adopt', icon: <Heart className="h-5 w-5" /> },
    { path: '/store', label: 'Shop', icon: <ShoppingCart className="h-5 w-5" /> },
    { path: '/treatments', label: 'Treatments', icon: <Stethoscope className="h-5 w-5" /> },
  ];

  const authenticatedNavItems = [
    { path: '/add-pet', label: 'List Pet', icon: <PlusCircle className="h-5 w-5" /> },
    { path: '/my-adoptions', label: 'Dashboard', icon: <UserCircle className="h-5 w-5" /> },
    { path: '/appointments', label: 'Appointments', icon: <CalendarDays className="h-5 w-5" /> },
  ];
  
  const navItems = currentUser ? [...commonNavItems, ...authenticatedNavItems] : commonNavItems;

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paw-print">
                  <circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/>
                  <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>
                </svg>
              </span>
              <span className="text-lg font-bold">PawFinder</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Your one-stop platform for pet care. Current year: {new Date().getFullYear()}.
            </p>
          </div>
          <div>
            <p className="font-medium">Quick Links</p>
            <nav className="mt-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path + "-footer"}
                  to={item.path}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
               {currentUser ? (
                 <>
                  <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground">Profile</Link>
                  <span onClick={logout} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Logout</span>
                 </>
               ) : (
                 <>
                  <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Login</Link>
                  <Link to="/register" className="text-sm text-muted-foreground hover:text-foreground">Sign Up</Link>
                 </>
               )}
            </nav>
          </div>
          <div>
            <p className="font-medium">Contact</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Have questions or need assistance? Reach out to our support team.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Email: support@pawfinder.com
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PawFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;