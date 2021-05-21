const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./products.model.js")(mongoose);
db.sizes = require("./sizes.model.js")(mongoose);
db.flavors = require("./flavors.model.js")(mongoose);
db.SKUList = require("./SKUList.model.js")(mongoose);

module.exports = db;