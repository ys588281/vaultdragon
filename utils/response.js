const errResponse = (err, res) => {
    const status = (err.status)?err.status:500;
    const reason = (err.reason)?err.reason:err;
    res.status(status).json({
        "reason":reason
    });
}

const jsonResponse = (data, status, res) => {
    res.status(status).json(data);
}


module.exports = {
    errResponse,
    jsonResponse
}
