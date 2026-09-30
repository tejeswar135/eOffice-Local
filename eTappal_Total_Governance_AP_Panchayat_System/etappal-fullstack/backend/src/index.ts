import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// API Gateway Mount
app.use('/api', apiRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'e-Tappal Tottenham Fullstack Backend API',
    office: 'Madanapuram Gram Panchayat, Saravakota Mandal',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`e-Tappal Full-Stack Backend API running on port ${PORT}`);
  console.log(`Target Office: Madanapuram GP (Saravakota, Srikakulam)`);
  console.log(`Health Check : http://localhost:${PORT}/health`);
  console.log(`=======================================================`);
});
