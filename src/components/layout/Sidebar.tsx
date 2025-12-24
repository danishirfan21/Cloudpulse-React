import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Server, 
  Code, 
  Database, 
  FileText, 
  Bell, 
  Settings 
} from 'lucide-react';
import { Environment } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  environment: Environment;
  onEnvironmentChange: (env: Environment) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  environment, 
  onEnvironmentChange 
}) => {
  const navItems = [
    { path: '/', label: 'Overview', icon: LayoutDashboard, badge: null },
    { path: '/services', label: 'Services', icon: Server, badge: { type: 'dot', color: 'success' } },
    { path: '/apis', label: 'APIs', icon: Code, badge: { type: 'count', value: 2, color: 'warning' } },
    { path: '/databases', label: 'Databases', icon: Database, badge: null },
    { path: '/logs', label: 'Logs', icon: FileText, badge: null },
    { path: '/alerts', label: 'Alerts', icon: Bell, badge: null },
    { path: '/settings', label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-[60px] bottom-0 w-[240px] bg-[#1a1f29] border-r border-[#2d3540]/40 overflow-y-auto transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-[#1e90ff]/10 text-[#1e90ff]'
                    : 'text-[#e4e6eb] hover:bg-[#242933]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge?.type === 'dot' && (
                    <span className={`ml-auto w-2 h-2 bg-[#00d084] rounded-full ${isActive ? '' : 'opacity-60'}`}></span>
                  )}
                  {item.badge?.type === 'count' && (
                    <span className="ml-auto px-1.5 py-0.5 bg-[#ffa502]/20 text-[#ffa502] text-xs rounded font-mono">
                      {item.badge.value}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Environment Switcher & Health */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2d3540]/40 bg-[#1a1f29] space-y-4">
          {/* Environment Pills */}
          <div className="flex items-center gap-1 bg-[#242933] rounded-lg p-1">
            {(['production', 'staging', 'dev'] as Environment[]).map((env) => (
              <button
                key={env}
                onClick={() => onEnvironmentChange(env)}
                className={`flex-1 px-2 py-1.5 text-xs font-medium rounded transition-colors ${
                  environment === env
                    ? 'bg-[#00d084] text-white'
                    : 'text-[#8b93a7] hover:bg-[#1a1f29]'
                }`}
              >
                {env.charAt(0).toUpperCase() + env.slice(1)}
              </button>
            ))}
          </div>

          {/* Health Score */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="none" className="text-[#242933]"/>
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="none" className="text-[#00d084]" strokeDasharray="125.6" strokeDashoffset="3.14" strokeLinecap="round"/>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-medium">99</span>
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium">Health Score</div>
              <div className="text-xs text-[#8b93a7]">Last 24h</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
