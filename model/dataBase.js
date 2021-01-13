const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test';

const db = {}
db.mongoose = mongoose;
db.url = url;
db.user = require('./user')(mongoose)

console.log(db);

module.exports = db;

