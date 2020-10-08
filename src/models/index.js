const dbConfig = require('../config/database/db.config');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;

db.zones = require('./zone.model')(mongoose);

module.exports = db;