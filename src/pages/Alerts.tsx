import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Bell,
  Filter,
  Search,
} from 'lucide-react';
import Modal from '../components/common/Modal';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/common/Toast';

interface Alert {
  id: string;
  title: string;
  service: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  time: string;
  acknowledged: boolean;
}

interface AlertRule {
  id: string;
  name: string;
  condition: string;
  severity: 'critical' | 'warning' | 'info';
  notifications: string[];
}

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
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
  ]);

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: '1',
      name: 'High CPU Usage',
      condition: 'CPU usage > 80%',
      severity: 'critical',
      notifications: ['Email', 'Slack'],
    },
  ]);

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [showAcknowledged, setShowAcknowledged] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, removeToast, showSuccess, showInfo } = useToast();

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

  const handleAcknowledge = (alertId: string) => {
    const alert = alerts.find((a) => a.id === alertId);
    setAlerts(
      alerts.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
    showSuccess(`Alert "${alert?.title}" acknowledged`);
  };

  const handleAcknowledgeAll = () => {
    setAlerts(alerts.map((a) => ({ ...a, acknowledged: true })));
    showSuccess('All alerts acknowledged');
  };

  const handleClearAcknowledged = () => {
    setAlerts(alerts.filter((a) => !a.acknowledged));
    showInfo('Acknowledged alerts cleared');
  };

  const handleAddRule = (
    name: string,
    condition: string,
    severity: string,
    notifications: string[]
  ) => {
    setIsSubmitting(true);

    setTimeout(() => {
      const newRule: AlertRule = {
        id: String(alertRules.length + 1),
        name,
        condition,
        severity: severity as 'critical' | 'warning' | 'info',
        notifications,
      };

      setAlertRules([newRule, ...alertRules]);
      showSuccess(`Alert rule "${name}" created successfully`);
      setShowConfigModal(false);
      setIsSubmitting(false);
    }, 1000);
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity =
      filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesAcknowledged = showAcknowledged || !alert.acknowledged;
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesAcknowledged && matchesSearch;
  });

  const activeCount = alerts.filter((a) => !a.acknowledged).length;
  const criticalCount = alerts.filter(
    (a) => a.severity === 'critical' && !a.acknowledged
  ).length;
  const warningCount = alerts.filter(
    (a) => a.severity === 'warning' && !a.acknowledged
  ).length;

  return (
    <div className="p-4 md:p-6 lg:p-10 w-full overflow-x-hidden">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Alerts</h1>
            <p className="text-[#8b93a7]">
              Manage and respond to system alerts
            </p>
          </div>
          <div className="flex gap-2">
            {activeCount > 0 && (
              <button
                className="px-4 py-2 bg-[#00d084] hover:bg-[#00d084]/90 rounded-lg text-sm font-medium transition-colors"
                onClick={handleAcknowledgeAll}
              >
                Acknowledge All
              </button>
            )}
            <button
              className="px-4 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors"
              onClick={() => setShowConfigModal(true)}
            >
              Configure Rules
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Active Alerts</div>
            <div className="text-2xl font-bold">{activeCount}</div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#ff4757]/20 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Critical</div>
            <div className="text-2xl font-bold text-[#ff4757]">
              {criticalCount}
            </div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#ffa502]/20 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Warnings</div>
            <div className="text-2xl font-bold text-[#ffa502]">
              {warningCount}
            </div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Acknowledged</div>
            <div className="text-2xl font-bold">
              {alerts.filter((a) => a.acknowledged).length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search alerts..."
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
              {['all', 'critical', 'warning', 'info'].map((severity) => (
                <button
                  key={severity}
                  onClick={() => setFilterSeverity(severity)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors capitalize ${
                    filterSeverity === severity
                      ? 'bg-[#1e90ff] text-white'
                      : 'text-[#8b93a7] hover:bg-[#242933]'
                  }`}
                >
                  {severity}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 bg-[#1a1f29] rounded-lg px-4 py-2 border border-[#2d3540]/40 cursor-pointer">
              <input
                type="checkbox"
                checked={showAcknowledged}
                onChange={(e) => setShowAcknowledged(e.target.checked)}
                className="w-4 h-4 rounded border-[#2d3540] bg-[#242933] text-[#1e90ff]"
              />
              <span className="text-sm">Show Acknowledged</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        {alerts.some((a) => a.acknowledged) && (
          <div className="flex justify-end">
            <button
              onClick={handleClearAcknowledged}
              className="text-sm text-[#8b93a7] hover:text-[#e4e6eb] transition-colors"
            >
              Clear Acknowledged Alerts
            </button>
          </div>
        )}

        {/* Alerts List */}
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
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
                        <button
                          className="px-3 py-1 bg-[#242933] hover:bg-[#2d3540] rounded text-sm transition-colors"
                          onClick={() => handleAcknowledge(alert.id)}
                        >
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

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12 text-[#8b93a7]">
            {searchQuery
              ? 'No alerts found matching your search'
              : 'No active alerts'}
          </div>
        )}

        {/* Alert Rules Section */}
        {alertRules.length > 0 && (
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6">
            <h2 className="text-lg font-semibold mb-4">
              Active Alert Rules ({alertRules.length})
            </h2>
            <div className="space-y-2">
              {alertRules.map((rule) => (
                <div
                  key={rule.id}
                  className="flex items-center justify-between p-3 bg-[#242933] rounded-lg"
                >
                  <div>
                    <div className="text-sm font-medium">{rule.name}</div>
                    <div className="text-xs text-[#8b93a7] mt-1">
                      {rule.condition}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        rule.severity === 'critical'
                          ? 'bg-[#ff4757]/20 text-[#ff4757]'
                          : rule.severity === 'warning'
                          ? 'bg-[#ffa502]/20 text-[#ffa502]'
                          : 'bg-[#1e90ff]/20 text-[#1e90ff]'
                      }`}
                    >
                      {rule.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Configure Rules Modal */}
      <Modal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title="Configure Alert Rules"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name') as string;
            const condition = formData.get('condition') as string;
            const severity = formData.get('severity') as string;

            const notifications: string[] = [];
            if (formData.get('email')) notifications.push('Email');
            if (formData.get('slack')) notifications.push('Slack');
            if (formData.get('pagerduty')) notifications.push('PagerDuty');

            handleAddRule(name, condition, severity, notifications);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Rule Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
              placeholder="e.g., High CPU Usage"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Condition</label>
            <select
              name="condition"
              required
              className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
            >
              <option>CPU usage &gt; 80%</option>
              <option>Memory usage &gt; 85%</option>
              <option>Response time &gt; 500ms</option>
              <option>Error rate &gt; 1%</option>
              <option>Disk space &lt; 10%</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Severity</label>
            <select
              name="severity"
              required
              className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
            >
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Notification Channels
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="email"
                  defaultChecked
                  className="rounded border-[#2d3540] bg-[#242933] text-[#1e90ff]"
                />
                <span className="text-sm">Email</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="slack"
                  defaultChecked
                  className="rounded border-[#2d3540] bg-[#242933] text-[#1e90ff]"
                />
                <span className="text-sm">Slack</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="pagerduty"
                  className="rounded border-[#2d3540] bg-[#242933] text-[#1e90ff]"
                />
                <span className="text-sm">PagerDuty</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowConfigModal(false)}
              className="px-4 py-2 bg-[#242933] hover:bg-[#2d3540] rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Rule'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Alerts;
