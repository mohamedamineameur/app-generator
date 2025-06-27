import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import mainRouter from './routes/main.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Fix universel pour autoriser localhost avec cookies
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', mainRouter);

if (process.env.NODE_ENV !== 'test') {
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  });
}

export default app;
