require('dotenv').config();

const config = {
    server: {
        hostname: process.env.SERVER_HOSTNAME,
        port: process.env.SERVER_PORT,
    },
    jwt: {
        secret: process.env.JWTSECRET,
    },
    database: {
        url: process.env.DATABASE_URL,
    },
    authserver: {
        authority: 'https://localhost:5001',
        audience: 'web_api_resource'
    }
};

module.exports = config;
