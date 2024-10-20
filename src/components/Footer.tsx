'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('about')}</h3>
            <p className="text-sm">{t('footerAboutText')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-primary">{t('home')}</Link></li>
              <li><Link href="/products" className="text-sm hover:text-primary">{t('products')}</Link></li>
              <li><Link href="/agents" className="text-sm hover:text-primary">{t('agents')}</Link></li>
              <li><Link href="/about" className="text-sm hover:text-primary">{t('about')}</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary">{t('contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <p className="text-sm">{t('address')}: {t('companyAddress')}</p>
            <p className="text-sm">{t('phone')}: {t('companyPhone')}</p>
            <p className="text-sm">{t('email')}: {t('companyEmail')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('followUs')}</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-primary">📘</a>
              <a href="#" className="text-2xl hover:text-primary">🐦</a>
              <a href="#" className="text-2xl hover:text-primary">📸</a>
              <a href="#" className="text-2xl hover:text-primary">🔗</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm">&copy; {currentYear} Condor. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
