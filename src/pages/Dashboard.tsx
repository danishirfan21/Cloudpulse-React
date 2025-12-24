import React from 'react';
import MetricCard from '../components/common/MetricCard';
import {
  CheckCircle,
  TrendingUp,
  Zap,
  AlertTriangle,
  Activity,
  Clock,
  Database,
  Users,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 md:p-6 lg:p-10">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-[#8b93a7] mt-1">
              Real-time infrastructure monitoring overview
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#8b93a7]">Last updated</div>
            <div className="text-sm font-medium">2 seconds ago</div>
          </div>
        </div>

        {/* Hero Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="System Health"
            value="99.7"
            unit="%"
            change="+0.3% from yesterday"
            status="success"
            isHero={true}
            icon={<CheckCircle className="w-5 h-5 text-[#00d084]" />}
          />
          <MetricCard
            title="Active Services"
            value="18"
            unit="/20"
            change="2 services degraded"
            status="warning"
            isHero={true}
            icon={<Activity className="w-5 h-5 text-[#ffa502]" />}
          />
          <MetricCard
            title="Avg Response"
            value="124"
            unit="ms"
            change="-12ms from last hour"
            status="success"
            isHero={true}
            icon={<Zap className="w-5 h-5 text-[#00d084]" />}
          />
          <MetricCard
            title="Active Alerts"
            value="3"
            change="1 critical, 2 warnings"
            status="error"
            isHero={true}
            icon={<AlertTriangle className="w-5 h-5 text-[#ff4757]" />}
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Requests/min"
            value="24.8"
            unit="K"
            change="+8.2% from last hour"
            status="success"
            icon={<TrendingUp className="w-4 h-4 text-[#8b93a7]" />}
          />
          <MetricCard
            title="Error Rate"
            value="0.08"
            unit="%"
            change="+0.02% increase"
            status="warning"
            icon={<AlertTriangle className="w-4 h-4 text-[#8b93a7]" />}
          />
          <MetricCard
            title="CPU Usage"
            value="42"
            unit="%"
            change="Normal range"
            status="success"
            icon={<Activity className="w-4 h-4 text-[#8b93a7]" />}
          />
          <MetricCard
            title="Memory Usage"
            value="6.2"
            unit="GB"
            change="68% of total"
            status="success"
            icon={<Database className="w-4 h-4 text-[#8b93a7]" />}
          />
        </div>

        {/* Live Activity Feed */}
        <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6">
          <h2 className="text-lg font-semibold mb-4">Live Activity</h2>
          <div className="space-y-3">
            {[
              {
                time: '2s ago',
                event: 'Service deployed',
                service: 'Auth API v2.4.1',
                status: 'success',
              },
              {
                time: '45s ago',
                event: 'High latency detected',
                service: 'Data API',
                status: 'warning',
              },
              {
                time: '2m ago',
                event: 'Database backup completed',
                service: 'PostgreSQL Primary',
                status: 'success',
              },
              {
                time: '5m ago',
                event: 'Alert triggered',
                service: 'Payment Service',
                status: 'error',
              },
              {
                time: '12m ago',
                event: 'Scaling event',
                service: 'Web App (2→4 instances)',
                status: 'success',
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 border-b border-[#2d3540]/40 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === 'success'
                        ? 'bg-[#00d084]'
                        : activity.status === 'warning'
                        ? 'bg-[#ffa502]'
                        : 'bg-[#ff4757]'
                    }`}
                  ></div>
                  <div>
                    <div className="text-sm font-medium">{activity.event}</div>
                    <div className="text-xs text-[#8b93a7]">
                      {activity.service}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-[#8b93a7]">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-[#8b93a7] uppercase">
                Top Services
              </h3>
              <Users className="w-4 h-4 text-[#8b93a7]" />
            </div>
            <div className="space-y-3">
              {[
                { name: 'Auth API', requests: '8.7K/min', usage: '87%' },
                { name: 'Data API', requests: '5.2K/min', usage: '65%' },
                { name: 'Web App', requests: '2.4K/min', usage: '42%' },
              ].map((service, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{service.name}</span>
                    <span className="text-[#8b93a7]">{service.requests}</span>
                  </div>
                  <div className="w-full bg-[#242933] rounded-full h-2">
                    <div
                      className="bg-[#1e90ff] h-2 rounded-full transition-all duration-300"
                      style={{ width: service.usage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-[#8b93a7] uppercase">
                Response Times
              </h3>
              <Clock className="w-4 h-4 text-[#8b93a7]" />
            </div>
            <div className="space-y-4">
              {[
                { label: 'p50', value: '45ms', color: '#00d084' },
                { label: 'p95', value: '123ms', color: '#1e90ff' },
                { label: 'p99', value: '287ms', color: '#ffa502' },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-[#8b93a7]">{stat.label}</span>
                  <span
                    className="text-lg font-mono font-semibold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-[#8b93a7] uppercase">
                Database Health
              </h3>
              <Database className="w-4 h-4 text-[#8b93a7]" />
            </div>
            <div className="space-y-4">
              {[
                {
                  name: 'PostgreSQL',
                  status: 'Healthy',
                  connections: '47/100',
                },
                { name: 'Redis', status: 'Healthy', connections: '23/50' },
                { name: 'MongoDB', status: 'Warning', connections: '89/100' },
              ].map((db, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{db.name}</div>
                    <div className="text-xs text-[#8b93a7]">
                      {db.connections}
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      db.status === 'Healthy'
                        ? 'bg-[#00d084]/10 text-[#00d084]'
                        : 'bg-[#ffa502]/10 text-[#ffa502]'
                    }`}
                  >
                    {db.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
