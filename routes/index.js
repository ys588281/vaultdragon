const express = require('express');
const router = express.Router();
const utils = require('../utils/index.js');
const apiController = require('./controller/apiController.js');

router.use( (req, res, next) => {
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE,HEAD');
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, content-type, Access-Control-Request-Methods");
	next();
});

router.route("/object/:key").get(utils.utils.queryValidations, apiController.getKeyValue);

router.route("/object").post(utils.utils.postValidations, apiController.postKeyValue);

module.exports = router;
