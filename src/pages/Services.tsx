import React, { useState } from 'react';
import { mockServices } from '../utils/mockData';
import Modal from '../components/common/Modal';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/common/Toast';
import {
  Globe,
  Lock,
  Database,
  CreditCard,
  Bell,
  Search,
  Activity,
  Filter,
  RotateCw,
  Play,
  Pause,
  XCircle,
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
  const [services, setServices] = useState(mockServices);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'healthy' | 'degraded' | 'down'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toasts, removeToast, showSuccess, showError, showInfo } = useToast();

  const filteredServices = services.filter((service) => {
    const matchesFilter =
      filterStatus === 'all' || service.status === filterStatus;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleRestartService = (service: any) => {
    showInfo(`Restarting ${service.name}...`);
    setTimeout(() => {
      showSuccess(`${service.name} restarted successfully`);
    }, 2000);
  };

  const handleStopService = (service: any) => {
    showInfo(`Stopping ${service.name}...`);
    setTimeout(() => {
      const updatedServices = services.map((s) =>
        s.id === service.id ? { ...s, status: 'down' as const } : s
      );
      setServices(updatedServices);
      showError(`${service.name} stopped`);
    }, 1500);
  };

  const handleStartService = (service: any) => {
    showInfo(`Starting ${service.name}...`);
    setTimeout(() => {
      const updatedServices = services.map((s) =>
        s.id === service.id ? { ...s, status: 'healthy' as const } : s
      );
      setServices(updatedServices);
      showSuccess(`${service.name} started successfully`);
    }, 1500);
  };

  const handleDeploy = (serviceName: string, version: string) => {
    showInfo(`Deploying ${serviceName} ${version}...`);
    setTimeout(() => {
      showSuccess(`${serviceName} ${version} deployed successfully`);
      setShowDeployModal(false);
    }, 2000);
  };

  return (
    <div className="p-4 md:p-6 lg:p-10">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Services</h1>
            <p className="text-[#8b93a7]">
              Monitor all microservices and their health status
            </p>
          </div>
          <button
            className="px-4 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors"
            onClick={() => setShowDeployModal(true)}
          >
            Deploy Service
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1f29] border border-[#2d3540]/40 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b93a7]" />
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#1a1f29] rounded-lg p-1 border border-[#2d3540]/40">
            <Filter className="w-4 h-4 ml-2 text-[#8b93a7]" />
            {(['all', 'healthy', 'degraded', 'down'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors capitalize ${
                  filterStatus === status
                    ? 'bg-[#1e90ff] text-white'
                    : 'text-[#8b93a7] hover:bg-[#242933]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
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
                className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6 hover:border-[#1e90ff]/40 transition-all group"
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

                {/* Actions */}
                <div className="pt-4 border-t border-[#2d3540]/40 flex items-center justify-between gap-2">
                  <div className="text-xs text-[#8b93a7]">
                    {service.version} • {service.deployedAt}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleRestartService(service)}
                      className="p-1.5 hover:bg-[#242933] rounded transition-colors"
                      title="Restart"
                    >
                      <RotateCw className="w-4 h-4 text-[#8b93a7]" />
                    </button>
                    {service.status === 'down' ? (
                      <button
                        onClick={() => handleStartService(service)}
                        className="p-1.5 hover:bg-[#242933] rounded transition-colors"
                        title="Start"
                      >
                        <Play className="w-4 h-4 text-[#00d084]" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStopService(service)}
                        className="p-1.5 hover:bg-[#242933] rounded transition-colors"
                        title="Stop"
                      >
                        <Pause className="w-4 h-4 text-[#ff4757]" />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedService(service);
                        setShowServiceDetails(true);
                      }}
                      className="p-1.5 hover:bg-[#242933] rounded transition-colors"
                      title="Details"
                    >
                      <Activity className="w-4 h-4 text-[#8b93a7]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 text-[#8b93a7]">
            No services found matching your criteria
          </div>
        )}
      </div>

      {/* Deploy Service Modal */}
      <Modal
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        title="Deploy New Service"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const serviceName = formData.get('serviceName') as string;
            const version = formData.get('version') as string;
            handleDeploy(serviceName, version);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Service Name
            </label>
            <input
              type="text"
              name="serviceName"
              required
              className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
              placeholder="e.g., Auth API"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Version</label>
            <input
              type="text"
              name="version"
              required
              className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
              placeholder="e.g., v2.4.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Environment
            </label>
            <select className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]">
              <option>Production</option>
              <option>Staging</option>
              <option>Development</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowDeployModal(false)}
              className="px-4 py-2 bg-[#242933] hover:bg-[#2d3540] rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors"
            >
              Deploy
            </button>
          </div>
        </form>
      </Modal>

      {/* Service Details Modal */}
      <Modal
        isOpen={showServiceDetails}
        onClose={() => setShowServiceDetails(false)}
        title={selectedService?.name || 'Service Details'}
        size="lg"
      >
        {selectedService && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-[#8b93a7] mb-1">Status</div>
                <div className="text-lg font-semibold capitalize">
                  {selectedService.status}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#8b93a7] mb-1">Version</div>
                <div className="text-lg font-semibold">
                  {selectedService.version}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#8b93a7] mb-1">Uptime</div>
                <div className="text-lg font-semibold">
                  {selectedService.uptime}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#8b93a7] mb-1">
                  Average Response
                </div>
                <div className="text-lg font-semibold">
                  {selectedService.avgResponse}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#8b93a7] mb-1">Requests/min</div>
                <div className="text-lg font-semibold">
                  {selectedService.requestsPerMin}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#8b93a7] mb-1">Error Rate</div>
                <div className="text-lg font-semibold">
                  {selectedService.errorRate}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2d3540]/40">
              <h3 className="font-semibold mb-3">Recent Events</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-[#242933] rounded-lg">
                  <div className="w-2 h-2 bg-[#00d084] rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm">Deployment successful</div>
                    <div className="text-xs text-[#8b93a7]">
                      {selectedService.deployedAt}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#242933] rounded-lg">
                  <div className="w-2 h-2 bg-[#1e90ff] rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm">Health check passed</div>
                    <div className="text-xs text-[#8b93a7]">5 minutes ago</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowServiceDetails(false)}
                className="px-4 py-2 bg-[#242933] hover:bg-[#2d3540] rounded-lg text-sm transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleRestartService(selectedService);
                  setShowServiceDetails(false);
                }}
                className="px-4 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors"
              >
                Restart Service
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Services;
