# Data Dashboard

A modern, responsive data visualization dashboard built with React and D3.js. This application provides real-time trend analysis with interactive charts and a clean, professional interface.


## Features

- 📊 Interactive D3.js charts with hover effects
- 📱 Fully responsive design for all devices
- 🔍 Real-time search functionality
- 📈 Trend analysis with growth indicators
- 🎨 Modern UI with Tailwind CSS
- 🚀 Optimized performance
- 🔒 Production-ready with security headers

## Tech Stack

- **Frontend Framework:** React
- **Styling:** Tailwind CSS
- **Charts:** D3.js
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Container:** Docker
- **Server:** Nginx

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker (optional)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

3. Vercel Live Link
the application will be available at `https://dash-board-project-omega.vercel.app/`

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t data-dashboard .
```

2. Run the container:
```bash
docker run -p 3000:80 data-dashboard
```

The application will be available at `http://localhost:3000`

## Project Structure

```
data-dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── TrendCard.jsx
│   │   └── TrendChart.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── Dockerfile
├── nginx.conf
├── package.json
└── README.md
```

## Key Components

- **Dashboard:** Main container component that manages the application state and layout
- **TrendCard:** Displays individual trend information with growth indicators
- **TrendChart:** Interactive D3.js chart component with hover effects and responsive design

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Code Style

The project uses ESLint for code linting with React-specific rules. Configuration can be found in `eslint.config.js`.

## Production Deployment

The project includes a production-optimized Docker configuration with:

- Multi-stage build process
- Nginx server with:
  - Gzip compression
  - Cache control
  - Security headers
  - SPA routing support

## Performance Optimizations

- Lazy loading of components
- Image optimization
- Efficient D3.js rendering
- Tailwind CSS purging unused styles
- Gzip compression in production

## Browser Support

The dashboard is optimized for modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

