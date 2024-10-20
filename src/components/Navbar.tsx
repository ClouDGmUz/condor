'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'home' },
    { href: '/products', label: 'products' },
    { href: '/agents', label: 'agents' },
    { href: '/about', label: 'about' },
    { href: '/contact', label: 'contact' },
  ];

  const productCategories = ['oil', 'antifreeze', 'dot', 'water'];

  return (
    <nav className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-800 shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image src="/logo.svg" alt="Condor Logo" width={120} height={40} />
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <React.Fragment key={link.href}>
                {link.label === 'products' ? (
                  <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                    <Link href={link.href} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                      {t(link.label)}
                    </Link>
                    {dropdownOpen && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {productCategories.map((category) => (
                            <Link key={category} href={`/products#${category}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">
                              {t(category)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={link.href} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                    {t(link.label)}
                  </Link>
                )}
              </React.Fragment>
            ))}
            <button onClick={toggleTheme} className="ml-4 p-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <div className="relative ml-4">
              <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600">
                {i18n.language === 'uz' ? '🇺🇿' : '🇺🇸'}
                <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button onClick={() => changeLanguage('uz')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">
                      🇺🇿 O'zbek
                    </button>
                    <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">
                      🇺🇸 English
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700">
                {t(link.label)}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-5">
              <button onClick={toggleTheme} className="mr-3 p-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <button onClick={() => changeLanguage('uz')} className="mr-3 p-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                🇺🇿
              </button>
              <button onClick={() => changeLanguage('en')} className="p-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                🇺🇸
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
