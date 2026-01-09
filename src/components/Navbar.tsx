import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import Button from './ui/Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContact = () => {
    window.location.href = 'mailto:nuur.ergashev@gmail.com';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-white">
              Autonom<span className="text-primary">Hub</span>
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="primary" size="sm" onClick={handleContact}>
              Request Demo
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="pt-2 flex flex-col gap-2">
              <Button variant="primary" onClick={() => { setIsOpen(false); handleContact(); }}>Request Demo</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;