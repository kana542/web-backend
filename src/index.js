import express from 'express';
import userRoutes from './routes/userRoutes.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Example REST API');
});

app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({error: 'Resource not found'});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
