const axios = require("axios");
const jwt = require("jsonwebtoken");
const okta = require("../configs/okta");
const jwtConfig = require("../configs/jwt");
const logger = require("../utils/logger");

// 1. LOGIN → Redirect to Okta

exports.login = (req, res) => {
    logger.log("[fn: login] Login started");

    const url =
        `https://${okta.domain}/authorize?` +
        `client_id=${okta.clientId}` +
        `&response_type=code` +
        `&scope=openid profile email` +
        `&redirect_uri=${okta.redirectUri}`;

    res.redirect(url);
};

// 2. CALLBACK → Handle Okta response
exports.callback = async (req, res) => {

    try {
        logger.log("[fn: callback] Callback started");
        const { code } = req.query;


        // Exchange code for token
        const tokenResponse = await axios.post(
            `https://${okta.domain}/oauth/token`,
            new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: okta.redirectUri,
                client_id: okta.clientId,
                client_secret: okta.clientSecret,
            })
        );

        const accessToken = tokenResponse.data.access_token;


        // Create JWT (your app token)
        const appToken = jwt.sign(
            { oktaToken: accessToken },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresIn }
        );

        // Send token to frontend
        res.redirect(`http://localhost:3000/auth/callback?token=${appToken}`);
        logger.log("App token :");
        logger.log(appToken);



    } catch (err) {
        logger.error("[fn: callback - Error] Authentication failed");
        res.status(500).json({ message: "Authentication failed", err });
    }
};

// 3. SESSION CHECK
exports.me = (req, res) => {

    res.json({ user: req.user });
    console.log(req.user);
};