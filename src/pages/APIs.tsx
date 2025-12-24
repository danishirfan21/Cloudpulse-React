import React from 'react';
import { mockAPIEndpoints } from '../utils/mockData';
import { Activity, TrendingUp } from 'lucide-react';

const APIs: React.FC = () => {
  return (
    <div className="p-4 md:p-6 lg:p-10 w-full overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              API Endpoints
            </h1>
            <p className="text-[#8b93a7]">
              Monitor API performance and health across all endpoints
            </p>
          </div>
          <button className="px-4 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors">
            Add Endpoint
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Total Endpoints</div>
            <div className="text-2xl font-bold">{mockAPIEndpoints.length}</div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Healthy</div>
            <div className="text-2xl font-bold text-[#00d084]">
              {mockAPIEndpoints.filter((e) => e.status === 'healthy').length}
            </div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Degraded</div>
            <div className="text-2xl font-bold text-[#ffa502]">
              {mockAPIEndpoints.filter((e) => e.status === 'degraded').length}
            </div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Avg Latency</div>
            <div className="text-2xl font-bold">98ms</div>
          </div>
        </div>

        {/* API Endpoints Table */}
        <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#242933] border-b border-[#2d3540]/40">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-[#8b93a7]">
                    Endpoint
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[#8b93a7]">
                    Method
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[#8b93a7]">
                    Status
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-[#8b93a7]">
                    Requests/min
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-[#8b93a7]">
                    Avg Latency
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-[#8b93a7]">
                    Error Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockAPIEndpoints.map((endpoint) => {
                  const methodColors: { [key: string]: string } = {
                    GET: '#1e90ff',
                    POST: '#00d084',
                    PUT: '#ffa502',
                    DELETE: '#ff4757',
                    PATCH: '#9b59b6',
                  };

                  const statusColor =
                    endpoint.status === 'healthy'
                      ? '#00d084'
                      : endpoint.status === 'degraded'
                      ? '#ffa502'
                      : '#ff4757';

                  return (
                    <tr
                      key={endpoint.id}
                      className="border-b border-[#2d3540]/40 hover:bg-[#242933]/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-mono text-sm">{endpoint.path}</div>
                        <div className="text-xs text-[#8b93a7] mt-1">
                          {endpoint.description}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: `${
                              methodColors[endpoint.method]
                            }20`,
                            color: methodColors[endpoint.method],
                          }}
                        >
                          {endpoint.method}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: statusColor }}
                          ></div>
                          <span className="text-sm capitalize">
                            {endpoint.status}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right font-mono text-sm">
                        {endpoint.requestsPerMin.toLocaleString()}
                      </td>
                      <td className="p-4 text-right font-mono text-sm">
                        {endpoint.avgLatency}
                      </td>
                      <td className="p-4 text-right font-mono text-sm">
                        {endpoint.errorRate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIs;
