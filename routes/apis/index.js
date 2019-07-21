const express = require('express');
const router = express.Router();
const dbInitializeModule = require('../../modules/DbInitializer');
const dbInitialized = new dbInitializeModule();
const checkDBConnectionModel = require('../../model/CheckDbConnectionModel');

router.get('/', function (req, res) {
    res.send({ "welcome": "It's running" });
});

router.get('/checkDBConnection', function (req, res) {
   new checkDBConnectionModel(req,res,dbInitialized.connection);
});

module.exports = router;