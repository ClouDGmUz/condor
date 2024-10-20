'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    setFormData({ name: '', email: '', subject: '', message: '' });
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
            <p>{t('companyAddress')}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold">{t('phone')}</h3>
            <p>{t('companyPhone')}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold">{t('email')}</h3>
            <p>{t('companyEmail')}</p>
          </div>

          <div className="mt-8">
            <Image
              src="/images/map.png"
              alt={t('mapAlt')}
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
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
              <label htmlFor="subject" className="block mb-2">{t('subject')}</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
              >
                <option value="">{t('selectSubject')}</option>
                <option value="general">{t('generalInquiry')}</option>
                <option value="support">{t('technicalSupport')}</option>
                <option value="sales">{t('sales')}</option>
              </select>
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
            
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              {t('send')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
