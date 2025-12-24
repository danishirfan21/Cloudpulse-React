const fs = require('fs');
const path = require('path');

// Create all component and page files
const files = {
  // Dashboard Page
  'src/pages/Dashboard.tsx': `import React from 'react';
import MetricCard from '../components/common/MetricCard';
import { CheckCircle, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { mockServices, mockLogs, mockDeployments, generateChartData } from '../utils/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import LogsPanel from '../components/common/LogsPanel';
import DeploymentsPanel from '../components/common/DeploymentsPanel';

const Dashboard: React.FC = () => {
  const chartData = generateChartData();

  return (
    <div className="p-4 md:p-6 lg:p-10 w-full overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8 lg:space-y-10">
        {/* Status Strip */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="System Health"
            value="99.7"
            unit="%"
            change="All systems operational"
            status="success"
            isHero={true}
            icon={<CheckCircle className="w-5 h-5 text-[#00d084]" />}
          />
          <MetricCard
            title="Active Alerts"
            value="3"
            change="2 warnings, 1 info"
            status="warning"
            icon={<span className="w-2 h-2 bg-[#ffa502] rounded-full pulse-dot"></span>}
          />
          <MetricCard
            title="Request Volume"
            value="847"
            unit="K"
            change="↑ +12% vs 1h ago"
            status="success"
            icon={<TrendingUp className="w-4 h-4 text-[#1e90ff]" />}
          />
          <MetricCard
            title="Error Rate"
            value="0.04"
            unit="%"
            change="↓ 0.01% from baseline"
            status="success"
            icon={<TrendingDown className="w-4 h-4 text-[#00d084]" />}
          />
        </section>

        {/* Chart Section */}
        <section className="bg-[#1a1f29] rounded-lg p-4 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-[18px] font-semibold opacity-85">Request Traffic & Errors</h2>
          </div>
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e90ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1e90ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3540" opacity={0.2} />
                <XAxis dataKey="time" stroke="#8b93a7" fontSize={11} opacity={0.45} />
                <YAxis stroke="#8b93a7" fontSize={11} opacity={0.45} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1f29', 
                    border: '1px solid #2d3540',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#1e90ff" 
                  fillOpacity={1} 
                  fill="url(#colorRequests)"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="#ffa502" 
                  strokeWidth={2}
                  strokeDasharray="8 4"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Live Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <LogsPanel logs={mockLogs} />
          <DeploymentsPanel deployments={mockDeployments} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;`,

  // Services Page
  'src/pages/Services.tsx': `import React from 'react';
import { mockServices, mockLogs, mockDeployments } from '../utils/mockData';
import ServiceCard from '../components/services/ServiceCard';
import LogsPanel from '../components/common/LogsPanel';
import DeploymentsPanel from '../components/common/DeploymentsPanel';

const Services: React.FC = () => {
  return (
    <div className="p-4 md:p-6 lg:p-10 w-full overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8 lg:space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Services</h1>
            <p className="text-[#8b93a7] text-sm md:text-base">Monitor and manage all your microservices</p>
          </div>
          <button className="px-4 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium text-white transition-colors">
            Add Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <LogsPanel logs={mockLogs} />
          <DeploymentsPanel deployments={mockDeployments} />
        </section>
      </div>
    </div>
  );
};

export default Services;`,

  // Common components
  'src/components/common/LogsPanel.tsx': `import React, { useState } from 'react';
import { LogEntry } from '../../types';
import { Pause } from 'lucide-react';

interface LogsPanelProps {
  logs: LogEntry[];
}

const LogsPanel: React.FC<LogsPanelProps> = ({ logs }) => {
  const [filter, setFilter] = useState<'ALL' | 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter(log => {
    if (filter !== 'ALL' && log.level !== filter) return false;
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'ERROR': return { border: 'border-[#ff4757]', bg: 'bg-[#ff4757]/20', text: 'text-[#ff4757]' };
      case 'WARN': return { border: 'border-[#ffa502]', bg: 'bg-[#ffa502]/20', text: 'text-[#ffa502]' };
      case 'INFO': return { border: 'border-[#1e90ff]', bg: 'bg-[#1e90ff]/20', text: 'text-[#1e90ff]' };
      default: return { border: 'border-[#8b93a7]', bg: 'bg-[#8b93a7]/20', text: 'text-[#8b93a7]' };
    }
  };

  return (
    <div className="lg:col-span-2 bg-[#1a1f29] rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-semibold opacity-85">Live Logs</h2>
        <button className="p-1.5 hover:bg-[#242933] rounded transition-colors" title="Pause auto-scroll">
          <Pause className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-1 bg-[#242933] rounded-lg p-1">
          {['ALL', 'ERROR', 'WARN', 'INFO', 'DEBUG'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={\`px-2 py-1 text-xs font-medium rounded transition-colors \${
                filter === f ? 'bg-[#1e90ff] text-white' : 'hover:bg-[#1a1f29] opacity-60'
              }\`}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Filter by message, service, or trace ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-[#242933] border border-[#2d3540]/40 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
        />
      </div>

      <div className="space-y-px bg-[#242933] rounded-lg overflow-hidden max-h-[400px] overflow-y-auto">
        {filteredLogs.map(log => {
          const colors = getLevelColor(log.level);
          return (
            <div
              key={log.id}
              className={\`bg-[#1a1f29] hover:bg-[#242933] transition-colors p-3 border-l-[3px] \${colors.border} flex items-start gap-3 text-xs\`}
            >
              <span className="font-mono whitespace-nowrap text-[11px] opacity-50">{log.timestamp}</span>
              <span className={\`px-2 py-0.5 \${colors.bg} \${colors.text} rounded font-medium uppercase\`}>
                {log.level}
              </span>
              <span className="font-mono text-[11px] opacity-50">[{log.service}]</span>
              <span className="flex-1 opacity-80">{log.message}</span>
              {log.traceId && (
                <a href="#" className="text-[#1e90ff] hover:text-[#1e90ff]/80 whitespace-nowrap text-[11px] opacity-70">
                  View trace →
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogsPanel;`,

  'src/components/common/DeploymentsPanel.tsx': `import React from 'react';
import { Deployment } from '../../types';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface DeploymentsPanelProps {
  deployments: Deployment[];
}

const DeploymentsPanel: React.FC<DeploymentsPanelProps> = ({ deployments }) => {
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-[#00d084]" />;
      case 'rolled-back': return <AlertTriangle className="w-4 h-4 text-[#ffa502]" />;
      case 'failed': return <XCircle className="w-4 h-4 text-[#ff4757]" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'success': return 'border-[#00d084]';
      case 'rolled-back': return 'border-[#ffa502]';
      case 'failed': return 'border-[#ff4757]';
      default: return 'border-[#2d3540]';
    }
  };

  const getAvatarColor = (avatar: string) => {
    const colors = ['#1e90ff', '#ffa502', '#ff4757', '#00d084', '#a55eea'];
    return colors[avatar.charCodeAt(0) % colors.length];
  };

  return (
    <div className="bg-[#1a1f29] rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-semibold opacity-85">Recent Deployments</h2>
        <button className="text-[11px] text-[#1e90ff] hover:text-[#1e90ff] opacity-70">View all →</button>
      </div>

      <div className="space-y-3">
        {deployments.map(deployment => (
          <div
            key={deployment.id}
            className={\`bg-[#242933] rounded-lg p-4 border-l-[3px] \${getStatusColor(deployment.status)} hover:shadow-md transition-shadow\`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-medium text-sm">{deployment.service}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-[#00d084]/20 text-[#00d084] rounded text-xs font-semibold">
                    {deployment.version}
                  </span>
                  <span className="text-[11px] opacity-50">{deployment.deployedAt}</span>
                </div>
              </div>
              {getStatusIcon(deployment.status)}
            </div>
            <div className="flex items-center gap-2 text-[11px] mb-2 opacity-50">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                style={{ backgroundColor: getAvatarColor(deployment.avatar) }}
              >
                {deployment.avatar}
              </div>
              <span>{deployment.deployedBy}{deployment.status === 'rolled-back' ? ' (rolled back)' : ''}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="opacity-50">
                Duration: <span className="font-mono">{deployment.duration}</span>
              </span>
              <a href="#" className="text-[#1e90ff] hover:text-[#1e90ff]/80 opacity-70">Details →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeploymentsPanel;`,

  'src/components/services/ServiceCard.tsx': `import React from 'react';
import { Service } from '../../types';
import { Globe, Lock, Database, CreditCard, Bell, Search } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const getIcon = () => {
    switch(service.icon) {
      case 'globe': return <Globe className="w-6 h-6" />;
      case 'lock': return <Lock className="w-6 h-6" />;
      case 'database': return <Database className="w-6 h-6" />;
      case 'credit-card': return <CreditCard className="w-6 h-6" />;
      case 'bell': return <Bell className="w-6 h-6" />;
      case 'search': return <Search className="w-6 h-6" />;
      default: return <Globe className="w-6 h-6" />;
    }
  };

  const statusColor = service.status === 'healthy' ? '#00d084' : service.status === 'degraded' ? '#ffa502' : '#ff4757';
  const statusBg = service.status === 'healthy' ? 'bg-[#00d084]/10' : service.status === 'degraded' ? 'bg-[#ffa502]/10' : 'bg-[#ff4757]/10';

  return (
    <div className="bg-[#1a1f29] rounded-lg p-6 border border-[#2d3540]/40 hover:border-[#1e90ff]/40 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={\`w-12 h-12 \${statusBg} rounded-lg flex items-center justify-center\`} style={{ color: statusColor }}>
            {getIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{service.name}</h3>
            <p className="text-xs text-[#8b93a7]">{service.description}</p>
          </div>
        </div>
        <span className={\`flex items-center gap-1 px-2 py-1 \${statusBg} rounded text-xs font-medium\`} style={{ color: statusColor }}>
          <span className="w-1.5 h-1.5 rounded-full pulse-healthy" style={{ backgroundColor: statusColor }}></span>
          {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="opacity-60">Uptime</span>
          <span className="font-mono font-semibold">{service.uptime}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="opacity-60">Avg Response</span>
          <span className="font-mono font-semibold" style={{ color: service.status === 'healthy' ? '#00d084' : '#ffa502' }}>
            {service.avgResponse}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="opacity-60">Requests/min</span>
          <span className="font-mono font-semibold">{service.requestsPerMin}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="opacity-60">Error Rate</span>
          <span className="font-mono font-semibold" style={{ color: service.status === 'healthy' ? '#00d084' : '#ffa502' }}>
            {service.errorRate}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-[#2d3540]/40 flex items-center justify-between">
        <span className="text-xs opacity-50">{service.version} • Deployed {service.deployedAt}</span>
        <button className="text-xs text-[#1e90ff] hover:text-[#1e90ff]/80 font-medium">View Details →</button>
      </div>
    </div>
  );
};

export default ServiceCard;`
};

// Write all files
Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(__dirname, filepath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content);
  console.log(\`Created: \${filepath}\`);
});

console.log('All component files created successfully!');
