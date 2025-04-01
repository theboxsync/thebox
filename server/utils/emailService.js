const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'norberto43@ethereal.email',
      pass: 'kXtTknyA7DfaAxSk2c'
  }
});

async function sendEmail({ to, subject, html }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
