var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "uc.chamod.public@gmail.com",
      pass: "jhqwpvtnluihkawp"
    },
  });

module.exports = transporter;