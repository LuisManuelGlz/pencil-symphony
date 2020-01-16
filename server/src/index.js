const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

// inicializaciones
dotenv.config();
const app = express();
const mongoose = require('./data/database');

// configuraciones
app.set('port', process.env.PORT || 4001);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(multer({ dest: path.resolve(__dirname, 'public/upload') }).single('image'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// archivos estáticos
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/post', require('./routes/postRoutes'));

// escuchando el servidor
app.listen(app.get('port'), () => {
  console.log(`Server listening at http://localhost:${app.get('port')} 🌎`);
});
