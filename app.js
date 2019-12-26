const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.use(express.json({limit: '10kb'}));
app.use(express.static(`${__dirname}/client/public`));

app.use('/api/auth', require('./routes/auth.route'));
module.exports = app;
