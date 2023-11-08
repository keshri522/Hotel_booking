const nodemailer = require("nodemailer");

const sendOtpEmail = async (req, res) => {
  // console.log("the details are", req.user, req.body.email);
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525,
      secure: false,
      auth: {
        user: process.env.ETHEREALUSER, // Your Gmail email address
        pass: process.env.ETHEREALPASS, // Your Gmail password or an app-specific password
      },
    });

    const info = await transporter.sendMail({
      from: '"Keshri Hotel 👻" <rkeshri522@gmail.com>',
      to: req.body.email,
      subject: "Your OTP is !",
      text: `Hello, your OTP is: ${req.user}`,
      html: `<p>Your OTP is: <strong>${req.user}</strong></p>`,
    });
  } catch (error) {
    // console.error(error);
    throw new Error(error);
  }
};
module.exports = sendOtpEmail;
// calling the functon
