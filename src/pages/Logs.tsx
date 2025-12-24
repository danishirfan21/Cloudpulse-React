import React, { useState } from 'react';
import { mockLogs } from '../utils/mockData';
import { Search, Filter } from 'lucide-react';

const Logs: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const levelColors: { [key: string]: { bg: string; text: string } } = {
    ERROR: { bg: '#ff4757', text: '#ffffff' },
    WARN: { bg: '#ffa502', text: '#ffffff' },
    INFO: { bg: '#1e90ff', text: '#ffffff' },
    DEBUG: { bg: '#8b93a7', text: '#ffffff' },
  };

  const filteredLogs =
    selectedLevel === 'all'
      ? mockLogs
      : mockLogs.filter((log) => log.level === selectedLevel);

  return (
    <div className="p-4 md:p-6 lg:p-10 w-full overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">System Logs</h1>
            <p className="text-[#8b93a7]">
              Real-time log streaming and analysis
            </p>
          </div>
          <button className="px-4 py-2 bg-[#242933] hover:bg-[#2d3540] rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Level Filter */}
        <div className="flex items-center gap-2 bg-[#1a1f29] rounded-lg p-1 w-fit border border-[#2d3540]/40">
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

        {/* Logs Container */}
        <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 overflow-hidden">
          <div className="bg-[#242933] border-b border-[#2d3540]/40 px-4 py-3 flex items-center justify-between">
            <div className="text-sm font-medium">Live Logs</div>
            <div className="flex items-center gap-2 text-xs text-[#8b93a7]">
              <div className="w-2 h-2 bg-[#00d084] rounded-full pulse-healthy"></div>
              Streaming
            </div>
          </div>

          <div className="font-mono text-xs overflow-auto max-h-[600px]">
            {filteredLogs.map((log) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
