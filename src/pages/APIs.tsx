import React, { useState } from 'react';
import { mockAPIEndpoints } from '../utils/mockData';
import Modal from '../components/common/Modal';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/common/Toast';
import {
  Activity,
  Search,
  Filter,
  Play,
  Pause,
  TrendingUp,
} from 'lucide-react';

const APIs: React.FC = () => {
  const [endpoints, setEndpoints] = useState(mockAPIEndpoints);
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'healthy' | 'degraded' | 'down'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toasts, removeToast, showSuccess, showInfo } = useToast();

  const filteredEndpoints = endpoints.filter((endpoint) => {
    const matchesMethod =
      filterMethod === 'all' || endpoint.method === filterMethod;
    const matchesStatus =
      filterStatus === 'all' || endpoint.status === filterStatus;
    const matchesSearch =
      endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMethod && matchesStatus && matchesSearch;
  });

  const handleAddEndpoint = (
    path: string,
    method: string,
    description: string
  ) => {
    const newEndpoint = {
      id: String(endpoints.length + 1),
      path,
      method: method as any,
      description,
      status: 'healthy' as const,
      requestsPerMin: 0,
      avgLatency: '0ms',
      errorRate: '0.00%',
    };
    setEndpoints([...endpoints, newEndpoint]);
    showSuccess(`Endpoint ${path} added successfully`);
    setShowAddModal(false);
  };

  const handleToggleMonitoring = (endpoint: any) => {
    const action = endpoint.status === 'healthy' ? 'paused' : 'resumed';
    const newStatus = endpoint.status === 'healthy' ? 'degraded' : 'healthy';

    const updatedEndpoints = endpoints.map((e) =>
      e.id === endpoint.id ? { ...e, status: newStatus as any } : e
    );
    setEndpoints(updatedEndpoints);
    showInfo(`Monitoring ${action} for ${endpoint.path}`);
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 w-full overflow-x-hidden">
      <ToastContainer toasts={toasts} onClose={removeToast} />

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
          <button
            className="px-4 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors"
            onClick={() => setShowAddModal(true)}
          >
            Add Endpoint
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Total Endpoints</div>
            <div className="text-2xl font-bold">{endpoints.length}</div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Healthy</div>
            <div className="text-2xl font-bold text-[#00d084]">
              {endpoints.filter((e) => e.status === 'healthy').length}
            </div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Degraded</div>
            <div className="text-2xl font-bold text-[#ffa502]">
              {endpoints.filter((e) => e.status === 'degraded').length}
            </div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Avg Latency</div>
            <div className="text-2xl font-bold">98ms</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search endpoints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1f29] border border-[#2d3540]/40 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b93a7]" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 bg-[#1a1f29] rounded-lg p-1 border border-[#2d3540]/40">
              <Filter className="w-4 h-4 ml-2 text-[#8b93a7]" />
              {['all', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(
                (method) => (
                  <button
                    key={method}
                    onClick={() => setFilterMethod(method)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                      filterMethod === method
                        ? 'bg-[#1e90ff] text-white'
                        : 'text-[#8b93a7] hover:bg-[#242933]'
                    }`}
                  >
                    {method}
                  </button>
                )
              )}
            </div>
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
                  <th className="text-center p-4 text-sm font-medium text-[#8b93a7]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEndpoints.map((endpoint) => {
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
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleToggleMonitoring(endpoint)}
                            className="p-1.5 hover:bg-[#1a1f29] rounded transition-colors"
                            title={
                              endpoint.status === 'healthy'
                                ? 'Pause Monitoring'
                                : 'Resume Monitoring'
                            }
                          >
                            {endpoint.status === 'healthy' ? (
                              <Pause className="w-4 h-4 text-[#ffa502]" />
                            ) : (
                              <Play className="w-4 h-4 text-[#00d084]" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedEndpoint(endpoint);
                              setShowDetailsModal(true);
                            }}
                            className="p-1.5 hover:bg-[#1a1f29] rounded transition-colors"
                            title="View Details"
                          >
                            <Activity className="w-4 h-4 text-[#8b93a7]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredEndpoints.length === 0 && (
          <div className="text-center py-12 text-[#8b93a7]">
            No endpoints found matching your criteria
          </div>
        )}
      </div>

      {/* Add Endpoint Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add API Endpoint"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const path = formData.get('path') as string;
            const method = formData.get('method') as string;
            const description = formData.get('description') as string;
            handleAddEndpoint(path, method, description);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Endpoint Path
            </label>
            <input
              type="text"
              name="path"
              required
              className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff] font-mono"
              placeholder="/api/v1/resource"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Method</label>
            <select
              name="method"
              required
              className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              required
              className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
              placeholder="Endpoint description"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 bg-[#242933] hover:bg-[#2d3540] rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors"
            >
              Add Endpoint
            </button>
          </div>
        </form>
      </Modal>

      {/* Endpoint Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title={selectedEndpoint?.path || 'Endpoint Details'}
        size="lg"
      >
        {selectedEndpoint && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-[#8b93a7] mb-1">Method</div>
                <div className="text-lg font-semibold">
                  {selectedEndpoint.method}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#8b93a7] mb-1">Status</div>
                <div className="text-lg font-semibold capitalize">
                  {selectedEndpoint.status}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#8b93a7] mb-1">Requests/min</div>
                <div className="text-lg font-semibold">
                  {selectedEndpoint.requestsPerMin.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#8b93a7] mb-1">Avg Latency</div>
                <div className="text-lg font-semibold">
                  {selectedEndpoint.avgLatency}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#8b93a7] mb-1">Error Rate</div>
                <div className="text-lg font-semibold">
                  {selectedEndpoint.errorRate}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#8b93a7] mb-1">Description</div>
                <div className="text-lg font-semibold">
                  {selectedEndpoint.description}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2d3540]/40">
              <h3 className="font-semibold mb-3">
                Performance Metrics (Last Hour)
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#242933] rounded-lg">
                  <span className="text-sm">p50 Latency</span>
                  <span className="font-mono text-sm">45ms</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#242933] rounded-lg">
                  <span className="text-sm">p95 Latency</span>
                  <span className="font-mono text-sm">123ms</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#242933] rounded-lg">
                  <span className="text-sm">p99 Latency</span>
                  <span className="font-mono text-sm">287ms</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-[#242933] hover:bg-[#2d3540] rounded-lg text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default APIs;
