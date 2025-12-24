import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import APIs from './pages/APIs';
import Databases from './pages/Databases';
import Logs from './pages/Logs';
import Alerts from './pages/Alerts';
import SettingsPage from './pages/Settings';
import { ToastContainer } from './components/common/Toast';
import { useToast } from './hooks/useToast';
import { TimeRange, Environment } from './types';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [environment, setEnvironment] = useState<Environment>('production');
  const { toasts, removeToast, showSuccess, showInfo } = useToast();

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    showInfo(`Time range changed to ${range.toUpperCase()}`);
  };

  const handleEnvironmentChange = (env: Environment) => {
    setEnvironment(env);
    showSuccess(`Switched to ${env} environment`);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#0f1419] text-[#e4e6eb]">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          timeRange={timeRange}
          onTimeRangeChange={handleTimeRangeChange}
        />

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          environment={environment}
          onEnvironmentChange={handleEnvironmentChange}
        />

        <main className="pt-[60px] lg:ml-[240px]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/apis" element={<APIs />} />
            <Route path="/databases" element={<Databases />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>

        <ToastContainer toasts={toasts} onClose={removeToast} />
      </div>
    </Router>
  );
};

export default App;
