var config = module.exports;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var PRODUCTION = process.env.NODE_ENV === "production";
config.saltRound = 10;
config.express = {
  port: process.env.PORT || 3131,
  ip: "127.0.0.1",
};

if (PRODUCTION) {
  mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
} else {
  mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    retryWrites: false,
  });
}
// config.db same deal
// config.email etc
// config.log