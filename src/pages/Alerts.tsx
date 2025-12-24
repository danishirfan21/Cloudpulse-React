import React from 'react';
import { AlertTriangle, CheckCircle, Info, Bell } from 'lucide-react';

const Alerts: React.FC = () => {
  const alerts = [
    {
      id: '1',
      title: 'High Memory Usage',
      service: 'Data API',
      severity: 'critical',
      message: 'Memory usage exceeded 85% threshold',
      time: '2 minutes ago',
      acknowledged: false,
    },
    {
      id: '2',
      title: 'Increased Latency',
      service: 'Auth API',
      severity: 'warning',
      message: 'Average response time increased to 245ms',
      time: '15 minutes ago',
      acknowledged: false,
    },
    {
      id: '3',
      title: 'Certificate Expiring',
      service: 'Web App',
      severity: 'warning',
      message: 'SSL certificate expires in 7 days',
      time: '1 hour ago',
      acknowledged: true,
    },
    {
      id: '4',
      title: 'Deployment Successful',
      service: 'Payment Service',
      severity: 'info',
      message: 'Version 4.1.2 deployed successfully',
      time: '3 hours ago',
      acknowledged: true,
    },
  ];

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { bg: '#ff4757', icon: AlertTriangle, text: 'Critical' };
      case 'warning':
        return { bg: '#ffa502', icon: AlertTriangle, text: 'Warning' };
      case 'info':
        return { bg: '#1e90ff', icon: Info, text: 'Info' };
      default:
        return { bg: '#8b93a7', icon: Bell, text: 'Unknown' };
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 w-full overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Alerts</h1>
            <p className="text-[#8b93a7]">
              Manage and respond to system alerts
            </p>
          </div>
          <button className="px-4 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors">
            Configure Rules
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Active Alerts</div>
            <div className="text-2xl font-bold">4</div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#ff4757]/20 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Critical</div>
            <div className="text-2xl font-bold text-[#ff4757]">1</div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#ffa502]/20 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Warnings</div>
            <div className="text-2xl font-bold text-[#ffa502]">2</div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Acknowledged</div>
            <div className="text-2xl font-bold">2</div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {alerts.map((alert) => {
            const config = getSeverityConfig(alert.severity);
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={`bg-[#1a1f29] rounded-lg border p-4 transition-all ${
                  alert.acknowledged
                    ? 'border-[#2d3540]/40 opacity-60'
                    : 'border-[#2d3540]/40 hover:border-[#1e90ff]/40'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${config.bg}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: config.bg }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {alert.title}
                        </h3>
                        <p className="text-sm text-[#8b93a7]">
                          {alert.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
                          style={{
                            backgroundColor: `${config.bg}20`,
                            color: config.bg,
                          }}
                        >
                          {config.text}
                        </span>
                        {alert.acknowledged && (
                          <CheckCircle className="w-5 h-5 text-[#00d084]" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-[#8b93a7]">
                        <span>{alert.service}</span>
                        <span>•</span>
                        <span>{alert.time}</span>
                      </div>
                      {!alert.acknowledged && (
                        <button className="px-3 py-1 bg-[#242933] hover:bg-[#2d3540] rounded text-sm transition-colors">
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
