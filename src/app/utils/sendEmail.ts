import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'islamikchannel328250@gmail.com',
      pass: 'eooy vofm tsaz mfoy',
    },
  });

  await transporter.sendMail({
    from: 'islamikchannel328250@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 100mins!', // Subject line
    text: 'remember change pass', // plain text body
    html, // html body
  });
};
