'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
    alert(t('messageSent'));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('contactUs')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('getInTouch')}</h2>
          <p className="mb-4">{t('contactDescription')}</p>
          
          <div className="mb-4">
            <h3 className="font-semibold">{t('address')}</h3>
            <p>123 Condor Street, Tashkent, Uzbekistan</p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold">{t('phone')}</h3>
            <p>+998 12 345 6789</p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold">{t('email')}</h3>
            <p>info@condor.uz</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('sendMessage')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">{t('name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">{t('email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2">{t('message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
              ></textarea>
            </div>
            
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              {t('send')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
