var nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" });

function generateToken() {
  return Math.floor(Math.random() * 999999 + 1000000)
    .toString()
    .substring(1);
}

function sendVerificationEmail(nodemailer, email) {
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let code = generateToken();

  const mailOptions = {
    from: process.env.EMAIL_USERNAME, // Sender address
    to: `${email}`, // List of recipients
    subject: "Family to Family Email Verification", // Subject line
    text: `Enter the six digit code to verify your email: ${code}`, // Plain text body
  };

  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

  return code;
}

module.exports = { sendVerificationEmail };
