'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();

  const products = [
    { name: t('antifreeze'), description: t('antifreezeDesc') },
    { name: t('motorOil'), description: t('motorOilDesc') },
    { name: t('transmissionFluid'), description: t('transmissionFluidDesc') },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('products')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
