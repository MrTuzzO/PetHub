import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, PlusCircle, Heart, Menu, X, UserCircle, LogOut, LogIn, UserPlus, ShoppingCart, Stethoscope, CalendarDays, Sun, Moon, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/ProductContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavLink from '@/components/layout/NavLink';
import MobileNavLink from '@/components/layout/MobileNavLink';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const { theme, toggleTheme } = useTheme();

  const commonNavItems = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/store', label: 'Shop', icon: <ShoppingCart className="h-5 w-5" /> },
    { path: '/treatments', label: 'Treatments', icon: <Stethoscope className="h-5 w-5" /> },
    { path: '/pets', label: 'Adopt', icon: <Heart className="h-5 w-5" /> },
    { path: '/contact', label: 'Contact', icon: <Phone className="h-5 w-5" /> },
  ];

  const authenticatedNavItems = [
    { path: '/my-adoptions', label: 'Dashboard', icon: <UserCircle className="h-5 w-5" /> },
    { path: '/appointments', label: 'Appointments', icon: <CalendarDays className="h-5 w-5" /> },
    { path: '/add-pet', label: 'List Pet', icon: <PlusCircle className="h-5 w-5" /> },
  ];

  // const navItems = currentUser ? [...commonNavItems, ...authenticatedNavItems] : commonNavItems;
  // Only commonNavItems in main nav
  const navItems = commonNavItems;
  
  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };
  
  const getInitials = (name) => {
    if (!name) return "??";
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paw-print">
                  <circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/>
                  <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>
                </svg>
              </span>
              <span className="ml-2 text-xl font-bold">PawFinder</span>
            </div>
          </motion.div>
        </Link>

        <div className="flex items-center space-x-1">
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} icon={item.icon} label={item.label} />
            ))}
          </nav>

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">View Cart</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={currentUser.avatarUrl || `https://avatar.vercel.sh/${currentUser.name}.png`} alt={currentUser.name} />
                    <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <UserCircle className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                {authenticatedNavItems.map((item) => (
                  <DropdownMenuItem key={item.path} onClick={() => navigate(item.path)}>
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" asChild size="sm">
                <Link to="/login"><LogIn className="mr-1 h-4 w-4" /> Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register"><UserPlus className="mr-1 h-4 w-4" /> Sign Up</Link>
              </Button>
            </div>
          )}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t"
        >
          <div className="container py-4">
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <MobileNavLink key={item.path} to={item.path} icon={item.icon} label={item.label} onClick={() => setIsMenuOpen(false)} />
              ))}
              <DropdownMenuSeparator />
              {currentUser ? (
                <>
                  <MobileNavLink
                    to="/profile"
                    icon={<UserCircle className="h-5 w-5" />}
                    label="Profile"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  {authenticatedNavItems.map((item) => (
                    <MobileNavLink
                      key={item.path}
                      to={item.path}
                      icon={item.icon}
                      label={item.label}
                      onClick={() => setIsMenuOpen(false)}
                    />
                  ))}
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start px-3 py-2 text-base"
                  >
                    <LogOut className="mr-2 h-5 w-5" /> Log out
                  </Button>
                </>
              ) : (
                <>
                  <MobileNavLink to="/login" icon={<LogIn className="h-5 w-5" />} label="Login" onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/register" icon={<UserPlus className="h-5 w-5" />} label="Sign Up" onClick={() => setIsMenuOpen(false)} />
                </>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
