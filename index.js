const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));

const mustacheInstance = mustacheExpress();
mustacheInstance.cache = null;

app.engine('mustache', mustacheInstance);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
    res.render('index', {});
});
app.post('/todos', function(req, res){
    res.json(req.body);
});

app.listen(3000, function(){
    console.log('listening on :3000');
})


