const express = require('express');
const path = require('path');
const env = require('./env.host.json');

const app = express();

const clusterify = require('./clusterify.js');

const routes = require('./routes');
const apis = require('./routes/apis');

app.locals.baseURL = env['PUBLIC_URL'];


//set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// allow headers
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', env['PUBLIC_URL']);
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With, AUTH, Content-Type');
    res.setHeader('Content-Type', 'application/json');
    next();
})

app.use('/', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    next();
}, routes);

app.use('/api', apis);

app.get('*', function (req, res) {
    res.send("It's 404", 404);
});

clusterify(app);

