'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('aboutUs')}</h1>
      
      {/* Company History Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('ourHistory')}</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
            <p className="text-gray-700 dark:text-gray-300">{t('historyContent')}</p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/company-history.jpg"
              alt={t('historyImageAlt')}
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="mb-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">{t('missionVision')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">{t('ourMission')}</h3>
            <p className="text-gray-700 dark:text-gray-300">{t('missionContent')}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">{t('ourVision')}</h3>
            <p className="text-gray-700 dark:text-gray-300">{t('visionContent')}</p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('coreValues')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['quality', 'innovation', 'integrity', 'sustainability', 'customerFocus', 'teamwork'].map((value) => (
            <div key={value} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{t(`${value}Title`)}</h3>
              <p className="text-gray-700 dark:text-gray-300">{t(`${value}Description`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">{t('ourTeam')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((member) => (
            <div key={member} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md text-center">
              <Image
                src={`/images/team-member-${member}.jpg`}
                alt={t(`teamMember${member}Name`)}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{t(`teamMember${member}Name`)}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t(`teamMember${member}Position`)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
