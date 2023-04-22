import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

app.use(cors());
app.get('/api/test', (req, res) => {
  const time = new Date();
  res.json('hello world 2 ' + time);
});

if (process.env.VITE_API_PORT) {
  app.listen(process.env.VITE_API_PORT);
  console.log('server running');
}

export default app;
