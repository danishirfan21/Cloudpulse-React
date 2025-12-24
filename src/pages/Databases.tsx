import React from 'react';
import {
  Database,
  Activity,
  HardDrive,
  Clock,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

const Databases: React.FC = () => {
  const databases = [
    {
      id: '1',
      name: 'PostgreSQL Primary',
      type: 'PostgreSQL',
      version: '14.2',
      status: 'healthy',
      connections: 47,
      maxConnections: 100,
      size: '24.8 GB',
      uptime: '99.99%',
      queries: '1.2K/s',
      avgQueryTime: '12ms',
      replication: 'Active',
      lastBackup: '2 hours ago',
    },
    {
      id: '2',
      name: 'PostgreSQL Replica',
      type: 'PostgreSQL',
      version: '14.2',
      status: 'healthy',
      connections: 23,
      maxConnections: 100,
      size: '24.8 GB',
      uptime: '99.98%',
      queries: '856/s',
      avgQueryTime: '11ms',
      replication: 'Syncing',
      lastBackup: '2 hours ago',
    },
    {
      id: '3',
      name: 'Redis Cache',
      type: 'Redis',
      version: '7.0.5',
      status: 'healthy',
      connections: 89,
      maxConnections: 200,
      size: '2.4 GB',
      uptime: '99.95%',
      queries: '8.7K/s',
      avgQueryTime: '< 1ms',
      replication: 'N/A',
      lastBackup: '1 hour ago',
    },
    {
      id: '4',
      name: 'MongoDB Atlas',
      type: 'MongoDB',
      version: '6.0.3',
      status: 'warning',
      connections: 89,
      maxConnections: 100,
      size: '18.2 GB',
      uptime: '99.92%',
      queries: '542/s',
      avgQueryTime: '23ms',
      replication: 'Active',
      lastBackup: '4 hours ago',
    },
    {
      id: '5',
      name: 'Elasticsearch',
      type: 'Elasticsearch',
      version: '8.4.1',
      status: 'healthy',
      connections: 34,
      maxConnections: 150,
      size: '45.6 GB',
      uptime: '99.89%',
      queries: '324/s',
      avgQueryTime: '45ms',
      replication: 'Active',
      lastBackup: 'N/A',
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'healthy':
        return { color: '#00d084', bg: '#00d08420', label: 'Healthy' };
      case 'warning':
        return { color: '#ffa502', bg: '#ffa50220', label: 'Warning' };
      case 'error':
        return { color: '#ff4757', bg: '#ff475720', label: 'Down' };
      default:
        return { color: '#8b93a7', bg: '#8b93a720', label: 'Unknown' };
    }
  };

  const getTypeIcon = (type: string) => {
    return <Database className="w-5 h-5" />;
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 w-full overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Databases</h1>
            <p className="text-[#8b93a7]">
              Monitor database health, performance, and connections
            </p>
          </div>
          <button className="px-4 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors">
            Add Database
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-[#8b93a7]">Total Databases</div>
              <Database className="w-4 h-4 text-[#8b93a7]" />
            </div>
            <div className="text-2xl font-bold">{databases.length}</div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-[#8b93a7]">Total Connections</div>
              <Activity className="w-4 h-4 text-[#8b93a7]" />
            </div>
            <div className="text-2xl font-bold">
              {databases.reduce((acc, db) => acc + db.connections, 0)}
            </div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-[#8b93a7]">Total Storage</div>
              <HardDrive className="w-4 h-4 text-[#8b93a7]" />
            </div>
            <div className="text-2xl font-bold">115.8 GB</div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-[#8b93a7]">Avg Uptime</div>
              <TrendingUp className="w-4 h-4 text-[#8b93a7]" />
            </div>
            <div className="text-2xl font-bold text-[#00d084]">99.95%</div>
          </div>
        </div>

        {/* Database Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {databases.map((db) => {
            const statusConfig = getStatusConfig(db.status);
            const connectionPercentage =
              (db.connections / db.maxConnections) * 100;

            return (
              <div
                key={db.id}
                className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6 hover:border-[#1e90ff]/40 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${statusConfig.color}20` }}
                    >
                      {getTypeIcon(db.type)}
                      <span style={{ color: statusConfig.color }}></span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{db.name}</h3>
                      <p className="text-sm text-[#8b93a7]">
                        {db.type} {db.version}
                      </p>
                    </div>
                  </div>
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: statusConfig.bg,
                      color: statusConfig.color,
                    }}
                  >
                    {statusConfig.label}
                  </span>
                </div>

                {/* Connection Usage */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-[#8b93a7]">Connections</span>
                    <span className="font-mono">
                      {db.connections}/{db.maxConnections}
                    </span>
                  </div>
                  <div className="w-full bg-[#242933] rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${connectionPercentage}%`,
                        backgroundColor:
                          connectionPercentage > 80
                            ? '#ffa502'
                            : connectionPercentage > 90
                            ? '#ff4757'
                            : '#1e90ff',
                      }}
                    ></div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-[#2d3540]/40">
                  <div>
                    <div className="text-xs text-[#8b93a7] mb-1">
                      Queries/sec
                    </div>
                    <div className="text-lg font-semibold font-mono">
                      {db.queries}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#8b93a7] mb-1">
                      Avg Query Time
                    </div>
                    <div className="text-lg font-semibold font-mono">
                      {db.avgQueryTime}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#8b93a7] mb-1">
                      Storage Size
                    </div>
                    <div className="text-lg font-semibold font-mono">
                      {db.size}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#8b93a7] mb-1">Uptime</div>
                    <div className="text-lg font-semibold text-[#00d084]">
                      {db.uptime}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-[#8b93a7]">
                    <Clock className="w-4 h-4" />
                    <span>Backup: {db.lastBackup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {db.replication !== 'N/A' && (
                      <span className="text-xs text-[#8b93a7]">
                        Replication: {db.replication}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 bg-[#242933] hover:bg-[#2d3540] rounded-lg transition-colors text-left">
              <Activity className="w-5 h-5 text-[#1e90ff]" />
              <div>
                <div className="text-sm font-medium">Run Diagnostics</div>
                <div className="text-xs text-[#8b93a7]">
                  Check database health
                </div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-[#242933] hover:bg-[#2d3540] rounded-lg transition-colors text-left">
              <HardDrive className="w-5 h-5 text-[#1e90ff]" />
              <div>
                <div className="text-sm font-medium">Backup All</div>
                <div className="text-xs text-[#8b93a7]">
                  Create manual backup
                </div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-[#242933] hover:bg-[#2d3540] rounded-lg transition-colors text-left">
              <AlertCircle className="w-5 h-5 text-[#1e90ff]" />
              <div>
                <div className="text-sm font-medium">View Alerts</div>
                <div className="text-xs text-[#8b93a7]">
                  Check database alerts
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Databases;
