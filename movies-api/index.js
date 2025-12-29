import authenticate from './authenticate';
import './db';
import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import usersRouter from './api/users';
import reviewsRouter from './api/reviews'; // <--- ADD THIS
import cors from 'cors';

dotenv.config();

const errHandler = (err, req, res, next) => {
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here is the details: ${err.stack} `);
};

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/reviews', reviewsRouter); // <--- ADD THIS
app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});