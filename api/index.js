require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const client = require('./services/database');
client.connect();

// 3rd party Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.json({ type: ['json', '+json'] }));

// Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/transaction', require('./routes/transaction'));

// Bootstrap
app.get('/api', (req, res) => {
  res.send('Welcome to the mintage.guide API!');
});

// Listen to port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});