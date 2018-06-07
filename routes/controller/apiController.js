const moment = require("moment");
const keyValueRepo = require("../../db/repository/keyValueRepo.js");
const historyRepo = require("../../db/repository/historyRepo.js");
const utils = require("../../utils/index.js");

const getKeyValue = (req, res, next) => {
    const key = req.params.key;
    if(req.query.timestamp){
        const timeStamp = req.query.timestamp*1000;
        historyRepo.findByKeyAndTime(key, timeStamp)
        .then( data => {
            if(!data || data == null || data.length == 0){
                return Promise.reject({
                    status:404,
                    reason: `${key} not found`
                });
            } else {
                const response = {
                    "value": data[0].value
                }
                utils.response.jsonResponse(response, 200, res);
                Promise.resolve(response);
            }
        })
        .catch( err => {
            console.error("err: ", err);
            utils.response.errResponse(err, res);
        })
    } else {
        keyValueRepo.findByKey(key)
        .then( data => {
            if ( data == null ){
                return Promise.reject({
                    status:404,
                    reason: `${key} not found`
                });
            } else {
                let response = {};
                switch (data.type) {
                    case 'string': {
                        response.value = data.value;
                        break;
                    }
                    case 'object':{
                        response.value = data.value;
                        break;
                    }
                    case 'buffer': {
                        response.value = data.buffer;
                        break;
                    }
                }
                utils.response.jsonResponse(response, 200, res);
                Promise.resolve(response);
            }
        })
        .catch( err => {
            console.error("err: ", err);
            utils.response.errResponse(err, res);
        })
    }
}

const postKeyValue = (req, res, next) => {
    const keys = Object.keys(req.body);
    const key = keys[0];
    const value = req.body[key];
    const condition = { "key": key }
    let update = { "key": key }
    let type = '';
    let vvalue = null;
    let buffer = null;
    if(Buffer.isBuffer(value)){
        type = 'buffer';
        update.type = type;
        update.buffer = value;
        buffer = value;
    } else if (typeof value === 'string'){
        type = 'string';
        update.type = type;
        update.value = value;
        vvalue = value;
    } else if (typeof value === 'object'){
        type = 'object';
        update.type = type;
        update.value = JSON.stringify(value);
        vvalue = JSON.stringify(value);
    }
    const now = Date.now();
    keyValueRepo.findByKey(key)
    .then( data => {
        if( data != null ){
            console.log(condition);
            console.log(update);
            return keyValueRepo.findOneAndUpdate(condition, update);
        } else {
            return keyValueRepo.insert(key, vvalue, buffer, type);
        }
    })
    .then( data => {
        return historyRepo.insert(key, vvalue, buffer, type, now);
    })
    .then( data => {
        const response = {"key":key, "value":value, "timestamp": moment(now).format("hh:mm A") };
        utils.response.jsonResponse(response, 200, res);
        Promise.resolve(response);
    })
    .catch( err => {
        console.error("err: ", err);
        utils.response.errResponse(err, res);
        Promise.reject(err);
    })
}


module.exports = {
    getKeyValue,
    postKeyValue
}
