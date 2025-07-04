import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import mainRouter from './routes/main.routes';
import path from 'path';
import { adminGenerate } from './utils/admin-generate';

const clientBuildPath = path.join(__dirname, '../../client/dist');

// 🧱 Chemin vers le dossier "dist" généré par Vite

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const origin = process.env.ORIGIN 
app.use(express.static(clientBuildPath));
app.get('/', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
})

// ✅ Autorise le front à utiliser les cookies (avec CORS)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:4173',
  origin
];

const corsOptions = {
  origin: function (origin:any, callback:any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};



// ❌ SUPPRIME cette ligne, elle cause le crash !
// app.options('/*', cors(corsOptions));

// ✅ Garde UNIQUEMENT celle-ci
app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log('➡️ Request:', req.method, req.path);
  console.log('🧾 Origin:', req.headers.origin);
  console.log('🍪 Cookies:', req.headers.cookie);
  next();
});
// Sécurité et autres middlewares
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api', mainRouter);

// Sert les fichiers Vite (HTML, JS, CSS...)
app.use(express.static(clientBuildPath));

// Fallback SPA : renvoie index.html pour toute route non-API
app.get('/', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});
app.get('/blogs', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});
app.get('/prices', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});
app.get('/gallery', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
}
);







// Lancement du serveur
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync().then(() => {
    void adminGenerate();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  });
}

export default app;
