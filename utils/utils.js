const responseUtils = require('./response.js');

const queryValidations = (req, res, next) => {
    if (!req.params){
        const err = {
            "status": 400,
            "reason": "no path parameters found"
        }
        responseUtils.errResponse(err, res);
        next(err);
        return;
    }
    if (!req.params.key) {
        const err = {
            "status": 400,
            "reason": "no path key parameter found"
        }
        responseUtils.errResponse(err, res);
        next(err);
        return;
    }
    if(req.query.timestamp){
        if(!isNumeric(req.query.timestamp)){
            const err = {
                "status":400,
                "reason": "invalid timeStamp"
            }
            responseUtils.errResponse(err, res);
            next(err);
            return;
        }
        if(parseFloat(req.query.timestamp)<0){
            const err = {
                "status":400,
                "reason": "timestamp cannot be negative"
            }
            responseUtils.errResponse(err, res);
            next(err);
            return;
        }
    }
    next();
}

const postValidations = (req, res, next) => {
    if (!req.body){
        const err = {
            "status":400,
            "reason": "no body found"
        }
        responseUtils.errResponse(err, res);
        next(err);
        return;
    }
    const keys = Object.keys(req.body);
    if ( keys.length == 0 ){
        const err = {
            "staus": 400,
            "reason": "no valid keys"
        }
        responseUtils.errResponse(err, res);
        next(err);
        return;
    }
    if ( keys.length > 1){
        const err = {
            "staus": 400,
            "reason": "too much keys"
        }
        responseUtils.errResponse(err, res);
        next(err);
        return;
    }
    next();
}

isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = {
    queryValidations,
    postValidations
}
