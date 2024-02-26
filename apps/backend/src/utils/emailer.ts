import nodemailer from 'nodemailer';
import { getPasswordResetEmail } from './emails/passwordReset';
import AppError from './appError';

export const sendEmail = async (options) => {
  const auth = {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth
  });

  // define email
  const mailOptions = {
    from: "Smikkelweb <noreply@smikkelweb.com>",
    to: options.email,
    subject: options.subject,
    html: getPasswordResetEmail(options.resetURL)
  }

  // send
  try {
    await transport.sendMail(mailOptions)
  }
  catch (err) {
    console.log(err)
    new AppError('There was an error sending the email. Please try again later', 500)
  }
}
