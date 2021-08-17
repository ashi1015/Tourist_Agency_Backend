const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.touristGuides = require("./tourist-guide.model.js")(mongoose, mongoosePaginate);
db.vehicles = require("./vehicle.model")(mongoose, mongoosePaginate);

module.exports = db;
