export interface Service {
  id: string;
  name: string;
  description: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  avgResponse: string;
  requestsPerMin: string;
  errorRate: string;
  version: string;
  deployedAt: string;
  icon: string;
}

export interface APIEndpoint {
  id: string;
  path: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status: 'healthy' | 'degraded' | 'down';
  requestsPerMin: number;
  avgLatency: string;
  errorRate: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
  service: string;
  message: string;
  traceId?: string;
}

export interface Deployment {
  id: string;
  service: string;
  version: string;
  status: 'success' | 'failed' | 'rolled-back';
  deployedBy: string;
  deployedAt: string;
  duration: string;
  avatar: string;
}

export interface MetricCard {
  title: string;
  value: string;
  unit?: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  status?: 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
}

export interface ChartDataPoint {
  time: string;
  value: number;
  label?: string;
}

export interface AlertConfig {
  id: string;
  name: string;
  service: string;
  condition: string;
  threshold: number;
  severity: 'critical' | 'warning' | 'info';
  enabled: boolean;
  notifications: string[];
}

export type TimeRange = '1h' | '6h' | '24h' | '7d' | 'custom';
export type Environment = 'production' | 'staging' | 'dev';
