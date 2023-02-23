const nodemailer = require('nodemailer');
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service:"gmail",
    host: 'smtp.zoho.com',
    port: 456,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_TEST_PASSWORD
    }
  });

const sendMail = (receiver, sender, subject, html)=>{
    const mailOptions = {
        from: `${sender}<${process.env.EMAIL_ADDRESS}>`,
        to: receiver,
        subject: subject,
        html: html
      };
      console.log("sending...")

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}

// sendMail("eolaosebikan60@gmail.com", "Emmanuel", "Test Mail", ``);

module.exports = {
    sendMail
}