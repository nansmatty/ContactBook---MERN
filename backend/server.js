import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

import contactRoutes from './router/contact.js';
import authRoutes from './router/auth.js';
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use('/contact', contactRoutes);
app.use('/auth', authRoutes);

//---------------------------deployment code-----------------------------------//

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running..');
  });
}
//---------------------------deployment code----------------------------------//

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on ${PORT}`));
