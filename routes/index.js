const express = require('express');
const user = require('./user');

const router = express.Router();
user(router);

module.exports = router;
