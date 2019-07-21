const express = require('express');
const router = express.Router();
const path = require('path');

let ensureLogin = function (req, res) {
    if (req.headers.auth) {
        next();
    } else {
        res.redirect('/user/login');
    }
}

router.get('/', ensureLogin, function (req, res) {
    res.render(path.join(__dirname, '../views') + '/index');
});

router.get('/user/login', function (req, res) {
    res.render(path.join(__dirname, '../views') + '/user/login');
})

module.exports = router;