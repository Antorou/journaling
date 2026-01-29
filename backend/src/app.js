const express = require('express');
const cors = require('cors');
const entryRoutes = require('./routes/entryRoutes')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/entries', entryRoutes);

app.get('/ping', (req, res) => res.send('pong 🏓'));

module.exports = app;