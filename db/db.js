const mongoose = require('mongoose');
const configs = require('../config.js');
mongoose.Promise = global.Promise;
mongoose.connect(configs.mongodb);

mongoose.connection.on('error', function (err) {
  console.log('vaultdragon database connection failed. '+err)
});
// Connection established
mongoose.connection.once('open', function () {
  console.log('vaultdragon database connection established');
});
