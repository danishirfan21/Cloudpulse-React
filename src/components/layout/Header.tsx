import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TimeRange } from '../../types';
import { mockServices, mockAPIEndpoints } from '../../utils/mockData';

interface HeaderProps {
  onMenuClick: () => void;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

interface SearchResult {
  type: 'service' | 'api' | 'page';
  title: string;
  description: string;
  path: string;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  timeRange,
  onTimeRangeChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const timeRanges: TimeRange[] = ['1h', '6h', '24h', '7d', 'custom'];

  const pages: SearchResult[] = [
    {
      type: 'page',
      title: 'Dashboard',
      description: 'Overview and metrics',
      path: '/',
    },
    {
      type: 'page',
      title: 'Services',
      description: 'Microservices monitoring',
      path: '/services',
    },
    {
      type: 'page',
      title: 'APIs',
      description: 'API endpoint monitoring',
      path: '/apis',
    },
    {
      type: 'page',
      title: 'Databases',
      description: 'Database health',
      path: '/databases',
    },
    { type: 'page', title: 'Logs', description: 'System logs', path: '/logs' },
    {
      type: 'page',
      title: 'Alerts',
      description: 'Alert management',
      path: '/alerts',
    },
    {
      type: 'page',
      title: 'Settings',
      description: 'Application settings',
      path: '/settings',
    },
  ];

  const notifications = [
    {
      id: '1',
      title: 'High Memory Usage',
      message: 'Data API exceeded 85% threshold',
      time: '2m ago',
      read: false,
    },
    {
      id: '2',
      title: 'Deployment Complete',
      message: 'Auth API v2.4.1 deployed',
      time: '15m ago',
      read: false,
    },
    {
      id: '3',
      title: 'SSL Certificate',
      message: 'Certificate expires in 7 days',
      time: '1h ago',
      read: true,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    // Search services
    mockServices.forEach((service) => {
      if (
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'service',
          title: service.name,
          description: service.description,
          path: '/services',
        });
      }
    });

    // Search APIs
    mockAPIEndpoints.forEach((api) => {
      if (
        api.path.toLowerCase().includes(query) ||
        api.description.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'api',
          title: api.path,
          description: api.description,
          path: '/apis',
        });
      }
    });

    // Search pages
    pages.forEach((page) => {
      if (
        page.title.toLowerCase().includes(query) ||
        page.description.toLowerCase().includes(query)
      ) {
        results.push(page);
      }
    });

    setSearchResults(results.slice(0, 8));
    setShowResults(true);
  }, [searchQuery]);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.path);
    setSearchQuery('');
    setShowResults(false);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'service':
        return '🔧';
      case 'api':
        return '⚡';
      case 'page':
        return '📄';
      default:
        return '•';
    }
  };

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
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-[#1e90ff] rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold">CloudPulse</span>
        </Link>

        {/* Global Search */}
        <div
          className="flex-1 max-w-md mx-4 md:mx-8 hidden md:block"
          ref={searchRef}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search services, APIs, pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b93a7]" />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowResults(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b93a7] hover:text-[#e4e6eb]"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-[#1a1f29] border border-[#2d3540]/40 rounded-lg shadow-xl overflow-hidden">
                {searchResults.map((result, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleResultClick(result)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#242933] transition-colors text-left border-b border-[#2d3540]/40 last:border-0"
                  >
                    <span className="text-lg">
                      {getResultIcon(result.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {result.title}
                      </div>
                      <div className="text-xs text-[#8b93a7] truncate">
                        {result.description}
                      </div>
                    </div>
                    <div className="text-xs text-[#8b93a7] capitalize">
                      {result.type}
                    </div>
                  </button>
                ))}
              </div>
            )}
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
          <div className="relative" ref={notificationsRef}>
            <button
              className="relative p-2 hover:bg-[#242933] rounded-lg transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ffa502] rounded-full pulse-dot"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-[#1a1f29] border border-[#2d3540]/40 rounded-lg shadow-xl overflow-hidden">
                <div className="p-4 border-b border-[#2d3540]/40">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    <button
                      className="text-xs text-[#1e90ff] hover:underline"
                      onClick={() => navigate('/alerts')}
                    >
                      View All
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-[#2d3540]/40 last:border-0 hover:bg-[#242933] transition-colors cursor-pointer ${
                        !notif.read ? 'bg-[#1e90ff]/5' : ''
                      }`}
                      onClick={() => {
                        navigate('/alerts');
                        setShowNotifications(false);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {!notif.read && (
                          <div className="w-2 h-2 bg-[#1e90ff] rounded-full mt-1.5"></div>
                        )}
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {notif.title}
                          </div>
                          <div className="text-xs text-[#8b93a7] mt-1">
                            {notif.message}
                          </div>
                          <div className="text-xs text-[#8b93a7] mt-2">
                            {notif.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div
            className="w-8 h-8 bg-[#1e90ff] rounded-full flex items-center justify-center text-sm font-medium cursor-pointer hover:ring-2 hover:ring-[#1e90ff]/50 transition-all"
            onClick={() => navigate('/settings')}
          >
            D
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;