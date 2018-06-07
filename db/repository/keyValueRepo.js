const keyValuesModel = require("../models/keyValueModel.js");

const findByKey = (key) => {
    return keyValuesModel.findOne({"key":key}).exec();
};

const findOneAndUpdate = (condition, update) => {
    return keyValuesModel.findOneAndUpdate(condition, update, (err, data) => {
        if(err) {
            console.error("findOneAndUpdate error: ", condition, update, err);
            return err;
        } else {
            console.log("findOneAndUpdate success: ", condition, update, data);
            return data;
        }
    });
};

const insert = (key, value, buffer, type) => {
    const keyValue = new keyValuesModel({
        "key": key,
        "type": type,
        "value": value,
        "buffer": buffer
    });
    return keyValue.save((err, data) => {
        if(err) {
            console.error("insert error: ", keyValue, err);
            return err;
        } else {
            console.log("insert success: ", keyValue, data);
            return data;
        }
    });
};

module.exports = {
    findByKey,
    findOneAndUpdate,
    insert
};
