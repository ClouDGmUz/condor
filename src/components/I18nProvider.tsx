'use client';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nConfig from '../i18n';
import { useEffect, useState } from 'react';

// Initialize i18next on the client side
i18next.use(initReactI18next).init(i18nConfig);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
