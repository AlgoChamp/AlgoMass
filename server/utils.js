const {client} = require('./config/redis.js')

const errorResponse = (code, message) => {
    return {
        status: "error",
        data: null,
        error: {
            code: code,
            message: message
        }
    }
}

const successResponse = (data) => {
    return {
        status: "ok",
        data: data
    }
}

const getFromRedis = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data) => {

            if (err) {
                reject(err);
            } else {
                resolve(data);
            }

        });
    })
}


module.exports = { getFromRedis, errorResponse, successResponse }
