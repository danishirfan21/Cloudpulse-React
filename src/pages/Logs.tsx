import React, { useState, useEffect } from 'react';
import { mockLogs } from '../utils/mockData';
import { Search, Filter, Download, Play, Pause } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/common/Toast';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState(mockLogs);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const { toasts, removeToast, showSuccess, showInfo } = useToast();

  // Get unique services
  const services = [
    'all',
    ...Array.from(new Set(mockLogs.map((log) => log.service))),
  ];

  const levelColors: { [key: string]: { bg: string; text: string } } = {
    ERROR: { bg: '#ff4757', text: '#ffffff' },
    WARN: { bg: '#ffa502', text: '#ffffff' },
    INFO: { bg: '#1e90ff', text: '#ffffff' },
    DEBUG: { bg: '#8b93a7', text: '#ffffff' },
  };

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel;
    const matchesService =
      selectedService === 'all' || log.service === selectedService;
    const matchesSearch =
      searchQuery === '' ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesService && matchesSearch;
  });

  // Simulate real-time log streaming
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const newLog = {
        id: String(Date.now()),
        timestamp: new Date().toTimeString().slice(0, 12),
        level: ['INFO', 'WARN', 'ERROR', 'DEBUG'][
          Math.floor(Math.random() * 4)
        ] as any,
        service:
          services[Math.floor(Math.random() * (services.length - 1)) + 1],
        message: [
          'Request processed successfully',
          'Cache miss for user session',
          'Database query completed',
          'API rate limit check passed',
          'Background job queued',
        ][Math.floor(Math.random() * 5)],
        traceId: `trace-${Math.random().toString(36).substring(7)}`,
      };

      setLogs((prev) => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
    }, 3000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const handleExport = () => {
    const logText = filteredLogs
      .map(
        (log) =>
          `[${log.timestamp}] [${log.level}] [${log.service}] ${log.message} ${
            log.traceId || ''
          }`
      )
      .join('\n');

    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showSuccess('Logs exported successfully');
  };

  const handleClearLogs = () => {
    setLogs([]);
    showInfo('Logs cleared');
  };

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming);
    showInfo(isStreaming ? 'Log streaming paused' : 'Log streaming resumed');
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 w-full overflow-x-hidden">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">System Logs</h1>
            <p className="text-[#8b93a7]">
              Real-time log streaming and analysis
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-[#242933] hover:bg-[#2d3540] rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              className="px-4 py-2 bg-[#ff4757] hover:bg-[#ff4757]/90 rounded-lg text-sm font-medium transition-colors"
              onClick={handleClearLogs}
            >
              Clear Logs
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Total Logs</div>
            <div className="text-2xl font-bold">{logs.length}</div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#ff4757]/20 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Errors</div>
            <div className="text-2xl font-bold text-[#ff4757]">
              {logs.filter((l) => l.level === 'ERROR').length}
            </div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#ffa502]/20 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Warnings</div>
            <div className="text-2xl font-bold text-[#ffa502]">
              {logs.filter((l) => l.level === 'WARN').length}
            </div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#1e90ff]/20 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Info</div>
            <div className="text-2xl font-bold text-[#1e90ff]">
              {logs.filter((l) => l.level === 'INFO').length}
            </div>
          </div>
          <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-4">
            <div className="text-sm text-[#8b93a7] mb-1">Debug</div>
            <div className="text-2xl font-bold text-[#8b93a7]">
              {logs.filter((l) => l.level === 'DEBUG').length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1f29] border border-[#2d3540]/40 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b93a7]" />
            </div>
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2 bg-[#1a1f29] rounded-lg p-1 border border-[#2d3540]/40">
            <Filter className="w-4 h-4 ml-2 text-[#8b93a7]" />
            {['all', 'ERROR', 'WARN', 'INFO', 'DEBUG'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  selectedLevel === level
                    ? 'bg-[#1e90ff] text-white'
                    : 'text-[#8b93a7] hover:bg-[#242933]'
                }`}
              >
                {level.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Service Filter */}
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="bg-[#1a1f29] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
          >
            {services.map((service) => (
              <option key={service} value={service}>
                {service === 'all' ? 'All Services' : service}
              </option>
            ))}
          </select>
        </div>

        {/* Logs Container */}
        <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 overflow-hidden">
          <div className="bg-[#242933] border-b border-[#2d3540]/40 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium">Live Logs</div>
              <div className="flex items-center gap-2 text-xs text-[#8b93a7]">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isStreaming ? 'bg-[#00d084] pulse-healthy' : 'bg-[#8b93a7]'
                  }`}
                ></div>
                {isStreaming ? 'Streaming' : 'Paused'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoScroll}
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="w-3 h-3 rounded border-[#2d3540] bg-[#1a1f29] text-[#1e90ff]"
                />
                Auto-scroll
              </label>
              <button
                onClick={toggleStreaming}
                className="p-1.5 hover:bg-[#1a1f29] rounded transition-colors"
                title={isStreaming ? 'Pause streaming' : 'Resume streaming'}
              >
                {isStreaming ? (
                  <Pause className="w-4 h-4 text-[#ffa502]" />
                ) : (
                  <Play className="w-4 h-4 text-[#00d084]" />
                )}
              </button>
            </div>
          </div>

          <div className="font-mono text-xs overflow-auto max-h-[600px]">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-3 border-b border-[#2d3540]/40 hover:bg-[#242933]/50 transition-colors"
                >
                  <div className="text-[#8b93a7] whitespace-nowrap">
                    {log.timestamp}
                  </div>
                  <div
                    className="px-2 py-0.5 rounded font-medium whitespace-nowrap"
                    style={{
                      backgroundColor: levelColors[log.level].bg,
                      color: levelColors[log.level].text,
                    }}
                  >
                    {log.level}
                  </div>
                  <div className="text-[#1e90ff] whitespace-nowrap">
                    {log.service}
                  </div>
                  <div className="flex-1 text-[#e4e6eb]">{log.message}</div>
                  {log.traceId && (
                    <div className="text-[#8b93a7] text-xs whitespace-nowrap">
                      {log.traceId}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-[#8b93a7]">
                {searchQuery
                  ? 'No logs found matching your search'
                  : 'No logs available'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
