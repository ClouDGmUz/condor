'use client';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nConfig from '../i18n';
import { useEffect, useState } from 'react';

i18next.use(initReactI18next).init(i18nConfig);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18next.changeLanguage(storedLanguage);
    } else {
      i18next.changeLanguage('uz'); // Set Uzbek as default if no language is stored
    }
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
