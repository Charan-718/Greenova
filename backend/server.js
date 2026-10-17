const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const reportsRouter = require('./routes/reports');
const itemsRouter = require('./routes/items');
const diyProjectsRouter = require('./routes/diyProjects');
const videosRouter = require('./routes/videos');

const app = express();
const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/greenova';

// Middleware
app.use(cors({
  origin: true, // Reflect request origin (supports localhost:3000, production domains, etc.)
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health and Info Routes
app.get('/', (req, res) => {
  res.json({
    name: 'GreeNova API',
    description: 'Community Waste Management & Recycling Backend Service',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      health: 'GET /api/health',
      reports: 'GET, POST /api/reports',
      wasteItems: 'GET, POST /api/items',
      diyProjects: 'GET, POST /api/diy-projects',
      videos: 'GET, POST /api/videos'
    }
  });
});

app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const stateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: stateMap[dbState] || 'unknown'
  });
});

// Mount Feature API Routes
app.use('/api/reports', reportsRouter);
app.use('/api/items', itemsRouter);
app.use('/api/diy-projects', diyProjectsRouter);
app.use('/api/videos', videosRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// MongoDB Connection & Server Start
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`✅ MongoDB Connected successfully: ${mongoose.connection.host}`);
  })
  .catch((err) => {
    console.error(`⚠️ MongoDB Connection Warning: ${err.message}`);
    console.log('ℹ️ Server will continue running, but database operations require an active MongoDB connection.');
  });

app.listen(PORT, () => {
  console.log(`🚀 GreeNova Backend running on http://localhost:${PORT}`);
  console.log(`📋 API Health Check: http://localhost:${PORT}/api/health`);
});
