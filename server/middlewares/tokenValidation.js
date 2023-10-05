const secret = "secret";
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        return res.status(401).json({
            message: "Access token is missing",
          });
    }

    const token = header.split(" ")[1]
    
    jwt.verify(token, secret, (err, userInfo) => {
        if (err) {
            res.status(403).end();
            return;
        }

        req.userInfo = userInfo;
        next();
    });
};

module.exports = validateToken