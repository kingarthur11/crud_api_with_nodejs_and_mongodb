const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();

const url = 'mongodb://localhost:27017/test'

const db = {}
db.mongoose = mongoose;
db.url = url;
db.user = require('./user')(mongoose)

module.exports = db;

