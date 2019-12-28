const express = require('express');
const helmet = require('helmet');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(helmet());

app.use(express.json({limit: '10kb'}));
app.use(express.static(`${__dirname}/client/public`));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/links', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

app.use(globalErrorHandler);
module.exports = app;
