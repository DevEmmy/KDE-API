import nodemailer from "nodemailer";
import settings from "../constants/settings";
import Mail from "nodemailer/lib/mailer";
import { InternalServerError } from "../helpers/error-responses";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: settings.nodemailer.email,
    pass: settings.nodemailer.password,
  },
});

const sendMail = async (mailOptions: Mail.Options) => {
  try {
    await transporter.sendMail({
      ...mailOptions,
      from: settings.nodemailer.email,
    });
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export default sendMail;
