const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/auth');
const addressesRouter = require('./routes/addresses');
const counterTypeRouter = require('./routes/counter_types');
const counterRouter = require('./routes/counters');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/addresses', addressesRouter);
app.use('/counter_types', counterTypeRouter)
app.use('/counters', counterRouter)

module.exports = app;
