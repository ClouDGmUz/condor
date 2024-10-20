'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ThemeCustomizer: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const updateColor = (variable: string, value: string) => {
    document.documentElement.style.setProperty(variable, value);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? '✕' : '🎨'}
      </button>
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-background p-4 rounded-lg shadow-xl">
          <h3 className="text-lg font-bold mb-2">{t('customizeTheme')}</h3>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium">{t('primaryColor')}</label>
              <input
                type="color"
                onChange={(e) => updateColor('--color-primary', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">{t('secondaryColor')}</label>
              <input
                type="color"
                onChange={(e) => updateColor('--color-secondary', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">{t('accentColor')}</label>
              <input
                type="color"
                onChange={(e) => updateColor('--color-accent', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeCustomizer;
