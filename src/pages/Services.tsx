import React from 'react';
import { mockServices } from '../utils/mockData';
import {
  Globe,
  Lock,
  Database,
  CreditCard,
  Bell,
  Search,
  TrendingUp,
  Activity,
} from 'lucide-react';

const iconMap: { [key: string]: any } = {
  globe: Globe,
  lock: Lock,
  database: Database,
  'credit-card': CreditCard,
  bell: Bell,
  search: Search,
};

const Services: React.FC = () => {
  return (
    <div className="p-4 md:p-6 lg:p-10">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Services</h1>
            <p className="text-[#8b93a7]">
              Monitor all microservices and their health status
            </p>
          </div>
          <button className="px-4 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors">
            Deploy Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServices.map((service) => {
            const IconComponent = iconMap[service.icon];
            const statusColor =
              service.status === 'healthy'
                ? '#00d084'
                : service.status === 'degraded'
                ? '#ffa502'
                : '#ff4757';

            return (
              <div
                key={service.id}
                className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6 hover:border-[#1e90ff]/40 transition-all cursor-pointer group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1e90ff]/10 flex items-center justify-center">
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-[#1e90ff]" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-[#1e90ff] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-sm text-[#8b93a7]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: `${statusColor}20`,
                      color: statusColor,
                    }}
                  >
                    {service.status}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-[#8b93a7] mb-1">Uptime</div>
                    <div className="text-lg font-semibold text-[#00d084]">
                      {service.uptime}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#8b93a7] mb-1">
                      Avg Response
                    </div>
                    <div className="text-lg font-semibold">
                      {service.avgResponse}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#8b93a7] mb-1">
                      Requests/min
                    </div>
                    <div className="text-lg font-semibold">
                      {service.requestsPerMin}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#8b93a7] mb-1">
                      Error Rate
                    </div>
                    <div className="text-lg font-semibold">
                      {service.errorRate}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-[#2d3540]/40 flex items-center justify-between">
                  <div className="text-xs text-[#8b93a7]">
                    {service.version} • Deployed {service.deployedAt}
                  </div>
                  <Activity className="w-4 h-4 text-[#8b93a7]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
