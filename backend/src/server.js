require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`[Server] Lancé sur le port ${PORT} en mode ${process.env.NODE_ENV || 'development'}`);
});