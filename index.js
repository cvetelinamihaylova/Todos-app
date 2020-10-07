const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

mongoose
    .connect('mongodb://localhost:27017/todos-demo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
        console.log('Database connected')
    });

const app = express();
app.use(express.urlencoded({ extended: true }));

const mustacheInstance = mustacheExpress();
mustacheInstance.cache = null;

app.engine('mustache', mustacheInstance);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use('/', routes);

app.listen(3000, function () {
    console.log('listening on :3000');
})


