import express from 'express';
import productRoutes from './routes/productRoutes.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Example REST API');
});

app.use(express.json());

app.use('/api/products', productRoutes);

app.use((req, res) => {
  res.status(404).json({error: 'Resource not found'});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
