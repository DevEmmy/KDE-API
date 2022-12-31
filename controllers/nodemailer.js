const nodemailer = require('nodemailer');
require("dotenv").config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 432,
    secure: true,
    auth: {
      user: 'kingdavidelites@gmail.com',
      type: 'OAuth2',
    user: 'eolaosebikan60@gmail.com',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  });

const sendMail = (receiver)=>{
    const mailOptions = {
        from: 'kingdavidelites@gmail.com',
        to: receiver,
        subject: 'Hello from Nodemailer',
        html: '<h1>Welcome</h1><p>This is a test email sent using Nodemailer</p>'
      };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendMail
}