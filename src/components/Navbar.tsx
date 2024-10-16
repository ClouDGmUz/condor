'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image src="/logo.png" alt="Condor Logo" width={120} height={40} />
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">{t('home')}</Link>
            <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">{t('products')}</Link>
            <Link href="/agents" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">{t('agents')}</Link>
            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">{t('about')}</Link>
            <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">{t('contact')}</Link>
            <button
              onClick={toggleTheme}
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <div className="relative ml-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
              >
                {i18n.language === 'es' ? '🇪🇸' : '🇺🇸'}
                <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      onClick={() => changeLanguage('en')}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                      role="menuitem"
                    >
                      🇺🇸 English
                    </button>
                    <button
                      onClick={() => changeLanguage('es')}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                      role="menuitem"
                    >
                      🇪🇸 Español
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
