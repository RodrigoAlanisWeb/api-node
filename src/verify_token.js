const jwt = require('jsonwebtoken');
const { secret } = require('./secret');

function verify_token(req,res,next){
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            msg: "No token provided"
        })
    }

    const decoded = jwt.verify(token,secret);
    req.userId =  decoded.id;
    next();
}

module.exports = verify_token;