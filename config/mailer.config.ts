import nodemailer from 'nodemailer';
import settings from '../constants/settings';
import Mail from 'nodemailer/lib/mailer';
import { BadRequestError, InternalServerError } from '../helpers/error-responses';
import { Data, renderFile } from 'ejs';
import path from 'path';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: settings.nodemailer.email,
    pass: settings.nodemailer.password,
  },
  from: settings.nodemailer.email,
});

const sendMail = async (mailOptions: Mail.Options) => {
  try {
    await transporter.sendMail({
      from: settings.nodemailer.email,
      ...mailOptions,
    });
  } catch (error: any) {
    throw new InternalServerError(error);
  }
};

export const renderTemplate = function <T extends Data = {}>(filename: string, data?: T): string {
  let html = '';

  const file = path.join(__dirname, settings.nodeEnv === 'development' ? '../templates' : '../../templates', filename);

  renderFile(file, data ?? {}, (err, str) => {
    if (err) throw new BadRequestError(`Unable to read template ${err}`);

    html = str;
  });

  return html;
};

export default sendMail;
