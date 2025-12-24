import { Service, APIEndpoint, LogEntry, Deployment } from '../types';

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Web App',
    description: 'Frontend Service',
    status: 'healthy',
    uptime: '99.98%',
    avgResponse: '32ms',
    requestsPerMin: '2.4K',
    errorRate: '0.01%',
    version: 'v2.4.1',
    deployedAt: '2h ago',
    icon: 'globe'
  },
  {
    id: '2',
    name: 'Auth API',
    description: 'Authentication',
    status: 'degraded',
    uptime: '99.87%',
    avgResponse: '145ms',
    requestsPerMin: '8.7K',
    errorRate: '0.12%',
    version: 'v3.2.1',
    deployedAt: '5h ago',
    icon: 'lock'
  },
  {
    id: '3',
    name: 'Data API',
    description: 'Data Layer',
    status: 'healthy',
    uptime: '99.95%',
    avgResponse: '78ms',
    requestsPerMin: '5.2K',
    errorRate: '0.02%',
    version: 'v1.8.3',
    deployedAt: '1d ago',
    icon: 'database'
  },
  {
    id: '4',
    name: 'Payment Service',
    description: 'Transactions',
    status: 'healthy',
    uptime: '99.99%',
    avgResponse: '56ms',
    requestsPerMin: '1.1K',
    errorRate: '0.00%',
    version: 'v4.1.2',
    deployedAt: '3d ago',
    icon: 'credit-card'
  },
  {
    id: '5',
    name: 'Notification Service',
    description: 'Messaging',
    status: 'healthy',
    uptime: '99.92%',
    avgResponse: '23ms',
    requestsPerMin: '3.8K',
    errorRate: '0.03%',
    version: 'v2.1.0',
    deployedAt: '12h ago',
    icon: 'bell'
  },
  {
    id: '6',
    name: 'Search Service',
    description: 'Elasticsearch',
    status: 'healthy',
    uptime: '99.96%',
    avgResponse: '89ms',
    requestsPerMin: '4.3K',
    errorRate: '0.01%',
    version: 'v7.2.1',
    deployedAt: '6h ago',
    icon: 'search'
  }
];

export const mockAPIEndpoints: APIEndpoint[] = [
  {
    id: '1',
    path: '/api/v1/users',
    description: 'User management',
    method: 'GET',
    status: 'healthy',
    requestsPerMin: 847,
    avgLatency: '45ms',
    errorRate: '0.01%'
  },
  {
    id: '2',
    path: '/api/v1/auth/login',
    description: 'Authentication',
    method: 'POST',
    status: 'degraded',
    requestsPerMin: 1200,
    avgLatency: '234ms',
    errorRate: '0.15%'
  },
  {
    id: '3',
    path: '/api/v1/products',
    description: 'Product catalog',
    method: 'GET',
    status: 'healthy',
    requestsPerMin: 543,
    avgLatency: '78ms',
    errorRate: '0.02%'
  },
  {
    id: '4',
    path: '/api/v1/orders',
    description: 'Order processing',
    method: 'POST',
    status: 'healthy',
    requestsPerMin: 287,
    avgLatency: '123ms',
    errorRate: '0.00%'
  },
  {
    id: '5',
    path: '/api/v1/search',
    description: 'Search service',
    method: 'GET',
    status: 'healthy',
    requestsPerMin: 2100,
    avgLatency: '89ms',
    errorRate: '0.01%'
  },
  {
    id: '6',
    path: '/api/v1/notifications',
    description: 'Push notifications',
    method: 'POST',
    status: 'degraded',
    requestsPerMin: 892,
    avgLatency: '312ms',
    errorRate: '0.18%'
  }
];

export const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '14:32:18.345',
    level: 'ERROR',
    service: 'auth-api',
    message: 'Failed to authenticate user: invalid token signature',
    traceId: 'trace-001'
  },
  {
    id: '2',
    timestamp: '14:32:17.892',
    level: 'WARN',
    service: 'data-api',
    message: 'Query execution exceeded 500ms threshold: SELECT * FROM users WHERE...',
    traceId: 'trace-002'
  },
  {
    id: '3',
    timestamp: '14:32:16.234',
    level: 'INFO',
    service: 'web-app',
    message: 'User session started for user_id: a7b3c9d2',
    traceId: 'trace-003'
  },
  {
    id: '4',
    timestamp: '14:32:15.123',
    level: 'INFO',
    service: 'auth-api',
    message: 'Token refresh successful for user_id: a7b3c9d2',
    traceId: 'trace-004'
  },
  {
    id: '5',
    timestamp: '14:32:14.567',
    level: 'WARN',
    service: 'cache',
    message: 'Cache miss for key: user_profile_a7b3c9d2',
    traceId: 'trace-005'
  },
  {
    id: '6',
    timestamp: '14:32:13.890',
    level: 'INFO',
    service: 'data-api',
    message: 'Database connection pool: 47/100 active connections',
    traceId: 'trace-006'
  },
  {
    id: '7',
    timestamp: '14:32:12.456',
    level: 'INFO',
    service: 'web-app',
    message: 'HTTP GET /api/users/profile completed in 45ms',
    traceId: 'trace-007'
  },
  {
    id: '8',
    timestamp: '14:32:11.789',
    level: 'INFO',
    service: 'auth-api',
    message: 'JWT token validated successfully',
    traceId: 'trace-008'
  }
];

export const mockDeployments: Deployment[] = [
  {
    id: '1',
    service: 'Auth API',
    version: 'v2.4.1',
    status: 'success',
    deployedBy: 'Danish',
    deployedAt: '2h ago',
    duration: '3m 42s',
    avatar: 'D'
  },
  {
    id: '2',
    service: 'Data API',
    version: 'v1.8.3',
    status: 'success',
    deployedBy: 'Sarah',
    deployedAt: '5h ago',
    duration: '2m 18s',
    avatar: 'S'
  },
  {
    id: '3',
    service: 'Web App',
    version: 'v3.1.0',
    status: 'rolled-back',
    deployedBy: 'Mike',
    deployedAt: '8h ago',
    duration: '1m 05s',
    avatar: 'M'
  },
  {
    id: '4',
    service: 'PostgreSQL',
    version: 'v14.2',
    status: 'success',
    deployedBy: 'Alex',
    deployedAt: '1d ago',
    duration: '5m 33s',
    avatar: 'A'
  }
];

export const generateChartData = (points: number = 14): any[] => {
  const data = [];
  const now = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60000);
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    
    data.push({
      time: `${hours}:${minutes}`,
      requests: Math.floor(Math.random() * 200000) + 600000,
      responseTime: Math.floor(Math.random() * 50) + 180,
    });
  }
  
  return data;
};
