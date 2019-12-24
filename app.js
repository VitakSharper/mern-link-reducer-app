const express = require('express');

const app = express();


app.use('/api/auth', require('./routes/auth.route'));
module.exports = app;
