'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav 
      className={`fixed w-full z-50 px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 transition-all duration-500 ${
        scrolled ? 'bg-[#141414]/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl tracking-tight">
          <span className="font-light">Photography</span>
          <span className="font-medium ml-1">Portfolio</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8 text-sm">
          <Link 
            href="/" 
            className={`transition-opacity duration-300 ${
              pathname === '/' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
            }`}
          >
            Gallery
          </Link>
          <Link 
            href="/about" 
            className={`transition-opacity duration-300 ${
              pathname === '/about' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
            }`}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={`transition-opacity duration-300 ${
              pathname === '/contact' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-[#141414]/95 backdrop-blur-sm p-4 border-t border-white/10">
          <div className="flex flex-col space-y-4 py-4">
            <Link 
              href="/" 
              className={`transition-opacity duration-300 ${
                pathname === '/' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              href="/about" 
              className={`transition-opacity duration-300 ${
                pathname === '/about' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`transition-opacity duration-300 ${
                pathname === '/contact' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}