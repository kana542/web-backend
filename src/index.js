import express from 'express';
import cors from 'cors';

import userRouter from './routes/user-router.js';
import entryRouter from './routes/entry-router.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use(cors());

app.use('/', express.static('public'));
app.use(express.json());

app.get('/api/', (req, res) => {
  console.log('Get pyyntö api juureen havaittu');
  console.log(req.url);
  res.send('REST API');
});

app.use('/api/users', userRouter);
app.use('/api/entries', entryRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
