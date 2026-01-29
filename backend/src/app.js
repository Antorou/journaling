const express = require('express');
const cors = require('cors');
const entryRoutes = require('./routes/entryRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/entries', entryRoutes);

app.use(errorHandler);

module.exports = app;