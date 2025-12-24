import React from 'react';
import { mockServices } from '../utils/mockData';

const Services: React.FC = () => {
  return (
    <div className="p-4 md:p-6 lg:p-10">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-bold mb-6">Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockServices.map(service => (
            <div key={service.id} className="bg-[#1a1f29] p-6 rounded-lg">
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-sm text-[#8b93a7] mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
