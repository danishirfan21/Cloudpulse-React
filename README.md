# CloudPulse - React Infrastructure Monitoring Dashboard

A production-ready, enterprise-grade monitoring dashboard built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Multi-page Application** - Dashboard, Services, APIs, Databases, Logs, Alerts, Settings
- **Fully Responsive** - Mobile-first design that works on all devices
- **Real-time Updates** - Live logs, metrics, and deployment tracking
- **Interactive Charts** - Using Recharts for beautiful data visualization
- **Type-Safe** - Built with TypeScript for better code quality
- **Production Ready** - Optimized build with code splitting

## 📦 Tech Stack

- **React 18** - Latest React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful icon library

## 🛠 Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📁 Project Structure

```
cloudpulse-react/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── common/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── LogsPanel.tsx
│   │   │   └── DeploymentsPanel.tsx
│   │   ├── services/
│   │   │   └── ServiceCard.tsx
│   │   └── apis/
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Services.tsx
│   │   ├── APIs.tsx
│   │   ├── Databases.tsx
│   │   ├── Logs.tsx
│   │   ├── Alerts.tsx
│   │   └── Settings.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── mockData.ts
│   ├── styles/
│   │   └── index.css
│   ├── App.tsx
│   └── index.tsx
├── public/
├── package.json
└── README.md
```

## 🎨 Design Principles

- **Visual Hierarchy** - Clear distinction between primary and secondary information
- **Operational Credibility** - Production-ready monitoring aesthetics
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Accessibility** - Semantic HTML and ARIA labels
- **Performance** - Optimized rendering and lazy loading

## 🔧 Configuration

### Environment Switching
Toggle between Production, Staging, and Development environments from the sidebar.

### Time Range Selection
Choose from 1h, 6h, 24h, 7d, or custom time ranges for metric display.

### Theme
Dark theme optimized for long monitoring sessions with reduced eye strain.

## 📊 Features by Page

### Dashboard
- System health overview
- Real-time metrics
- Request traffic charts
- Error rate monitoring
- Live log streaming
- Recent deployments

### Services
- 6 microservices monitoring
- Health status indicators
- Performance metrics
- Deployment tracking

### APIs
- Endpoint performance table
- Request/response metrics
- Error rate tracking
- Method-based filtering

### Databases (Coming Soon)
- Connection pool monitoring
- Query performance
- Slow query tracking

### Logs (Coming Soon)
- Real-time log streaming
- Multi-level filtering
- Search functionality

### Alerts (Coming Soon)
- Alert configuration
- Notification management
- Incident tracking

### Settings (Coming Soon)
- User preferences
- System configuration
- Integration settings

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the build folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json:
# "homepage": "https://yourusername.github.io/cloudpulse"
# "predeploy": "npm run build"
# "deploy": "gh-pages -d build"
npm run deploy
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://api.yourcompany.com
REACT_APP_WS_URL=wss://ws.yourcompany.com
REACT_APP_ENV=production
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 📝 License

MIT License - feel free to use this project for your portfolio or commercial projects.

## 👨‍💻 Author

**Danish**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Design inspired by Datadog, Grafana, and New Relic
- Icons by Lucide
- Charts powered by Recharts
- Styled with Tailwind CSS

## 📧 Contact

For questions or feedback, reach out at your.email@example.com

---

**Built with attention to detail, restraint over decoration, and production quality.**
