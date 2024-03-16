const express = require('express');
const morgan = require('morgan');
const router = require('./routes/routes');

const app = express();

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "public"));
app.set('view engine', 'ejs');

app.use('/', router);

module.exports = app;