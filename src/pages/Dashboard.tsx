import React from 'react';
import MetricCard from '../components/common/MetricCard';
import { CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 md:p-6 lg:p-10">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="System Health"
            value="99.7"
            unit="%"
            status="success"
            isHero={true}
            icon={<CheckCircle className="w-5 h-5 text-[#00d084]" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
