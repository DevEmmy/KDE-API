"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const settings = {
    mongo: {
        url: process.env.DB_URI,
    },
    port: process.env.PORT || 3001,
    bank: {
        apiKey: process.env.API_KEY,
        uri: process.env.BANK_URI,
        clientSecret: process.env.CLIENT_SECRET,
    },
    frontendUrl: process.env.CLIENT_URL,
    cloudinary: {
        apiKey: process.env.CLOUD_API_KEY,
        apiSecret: process.env.CLOUD_API_SECRET,
        name: process.env.CLOUD_NAME,
    },
    domainName: process.env.DOMAIN_NAME,
    nodemailer: {
        email: process.env.EMAIL_ADDRESS,
        password: process.env.EMAIL_TEST_PASSWORD,
    },
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    kde: {
        account: process.env.KDE_ACCOUNT,
        bank: process.env.KDE_BANK,
    },
};
exports.default = settings;
