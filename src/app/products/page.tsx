'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

interface Product {
  id: string;
  nameKey: string;
  descriptionKey: string;
  image: string;
  category: string;
  volume?: string;
}

const ITEMS_PER_PAGE = 9;

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>(['all']);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then((data: Product[]) => {
        setProducts(data);
        const uniqueCategories = ['all', ...Array.from(new Set(data.map(product => product.category)))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error loading products:', error));
  }, []);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('ourProducts')}</h1>

      {/* Category Filter */}
      <div className="mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setCurrentPage(1);
            }}
            className={`mr-2 mb-2 px-4 py-2 rounded ${
              activeCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {t(category)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <Image 
              src={product.image} 
              alt={t(product.nameKey)} 
              width={200} 
              height={200} 
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{t(product.nameKey)}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{t(product.descriptionKey)}</p>
            {product.volume && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('volume')}: {product.volume}</p>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('category')}: {t(product.category)}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
