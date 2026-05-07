const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwt");

module.exports = (req, res, next) => {
    const token =
        req.headers.authorization?.split(" ")[1] ||
        req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token expired or invalid" });
    }
};