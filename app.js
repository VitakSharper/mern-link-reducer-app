const express = require('express');

const app = express();
app.use(express.json({limit: '10kb'}));

app.use('/api/auth', require('./routes/auth.route'));
module.exports = app;
