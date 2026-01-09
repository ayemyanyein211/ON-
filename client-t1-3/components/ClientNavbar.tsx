import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useData } from '../services/dataContext';

export const ClientNavbar: React.FC = () => {
  const { data } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Packages', path: '/packages' },
    { name: 'Team', path: '/team' },
    { name: 'Universities', path: '/universities' },
    { name: 'Scholarships', path: '/scholarships' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-brand-brown text-white sticky top-0 z-50 shadow-lg border-b-4 border-brand-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              {data.logoUrl ? (
                <img src={data.logoUrl} alt={data.companyName} className="h-12 w-auto object-contain rounded bg-white p-1" />
              ) : (
                <div className="bg-brand-red p-2.5 rounded-full group-hover:bg-red-600 transition-colors shadow-md">
                  <Globe className="h-7 w-7 text-white" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-wider leading-none">{data.companyName}</span>
                <span className="text-[0.65rem] text-brand-light tracking-widest uppercase mt-1 opacity-90 group-hover:opacity-100">ON to the World</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(link.path) 
                      ? 'bg-brand-red text-white shadow-md transform -translate-y-0.5' 
                      : 'hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-brand-red focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-brand-brown border-t border-brand-red/30 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                 isActive(link.path)
                   ? 'bg-brand-red text-white pl-4 border-l-4 border-white'
                   : 'text-stone-300 hover:bg-brand-red hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};