import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNavLink = ({ to, icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent ${
        isActive ? 'bg-accent text-primary' : 'text-foreground'
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default MobileNavLink;