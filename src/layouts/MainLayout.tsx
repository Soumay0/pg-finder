import React from 'react';
import { Navbar } from '../components';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
