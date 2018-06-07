const historysModel = require("../models/historyModel.js");

const insert = (key, value, buffer, type, time) => {
    const history = new historysModel({
        "key": key,
        "type": type,
        "value": value,
        "buffer": buffer,
        "time": time
    });
    return history.save((err, data) => {
        if(err) {
            console.error("insert history error: ", history, err);
            return err;
        } else {
            console.log("insert history success: ", history, data);
            return data;
        }
    });
}

const findByKeyAndTime = (key, time) => {
    return historysModel.find({"key":key})
        .where('time').lt(time)
        .sort( { "time": "desc"})
        .limit(1)
        .exec();
};

module.exports = {
    insert,
    findByKeyAndTime
}
