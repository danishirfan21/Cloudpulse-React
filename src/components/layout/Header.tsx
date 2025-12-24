import React, { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { TimeRange } from '../../types';

interface HeaderProps {
  onMenuClick: () => void;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, timeRange, onTimeRangeChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const timeRanges: TimeRange[] = ['1h', '6h', '24h', '7d', 'custom'];

  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-[#1a1f29] border-b border-[#2d3540]/40 z-50">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Mobile menu button */}
        <button 
          className="lg:hidden p-2 hover:bg-[#242933] rounded-lg transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1e90ff] rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <span className="text-lg font-semibold">CloudPulse</span>
        </div>

        {/* Global Search */}
        <div className="flex-1 max-w-md mx-4 md:mx-8 hidden md:block">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Type here to start searching..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b93a7]" />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Time Range Selector */}
          <div className="hidden md:flex items-center gap-1 bg-[#242933] rounded-lg p-1">
            {timeRanges.map((range) => (
              <button 
                key={range}
                onClick={() => onTimeRangeChange(range)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  timeRange === range 
                    ? 'bg-[#1e90ff] text-white' 
                    : 'hover:bg-[#1a1f29]'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Alert Bell */}
          <button className="relative p-2 hover:bg-[#242933] rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ffa502] rounded-full pulse-dot"></span>
          </button>

          {/* User Avatar */}
          <div className="w-8 h-8 bg-[#1e90ff] rounded-full flex items-center justify-center text-sm font-medium">
            D
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
