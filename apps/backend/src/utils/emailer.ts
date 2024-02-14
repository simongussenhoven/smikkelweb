import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 2525,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // define email
  const mailOptions = {
    from: "Smikkelweb <info@smikkelweb.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: 
  }

  // send
  await transport.sendMail(mailOptions)
}
