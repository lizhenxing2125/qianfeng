var express = require('express');
var router = express.Router();
var userControl = require("../control/user");

/* GET users listing. */
router.post('/register', userControl.register);

router.post('/login', userControl.login);

module.exports = router;
