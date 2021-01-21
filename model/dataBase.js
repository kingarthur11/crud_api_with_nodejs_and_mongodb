const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.DB_URL

const db = {}
db.mongoose = mongoose;
db.url = url;
db.user = require('./user')(mongoose)

module.exports = db;

