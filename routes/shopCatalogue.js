var express = require('express');
var router = express.Router();
var app=express();
var Controller= require('../Controller/shopCatalogController');
router.post('/', Controller.loginandGetToken);
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
module.exports = router;
