'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

interface Agent {
  id: number;
  name: string;
  phone: string;
}

const AgentsPage: React.FC = () => {
  const { t } = useTranslation();
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    fetch('/agents.json')
      .then(response => response.json())
      .then((data: Agent[]) => setAgents(data))
      .catch(error => console.error('Error loading agents:', error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('ourAgents')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4">
              <Image
                src={`/images/agent-${agent.id}.jpg`}
                alt={agent.name}
                width={64}
                height={64}
                className="rounded-full mr-4"
              />
              <h2 className="text-xl font-semibold">{agent.name}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              📞 {t('phone')}: <a href={`tel:${agent.phone}`} className="text-blue-500 hover:underline">{agent.phone}</a>
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              {t('contactAgent')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentsPage;
