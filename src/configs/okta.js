module.exports = {
    domain: process.env.AUTH0_DOMAIN,
    issuer: process.env.Auth0_ISSUER,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    redirectUri: process.env.AUTH0_REDIRECT_URI,
};