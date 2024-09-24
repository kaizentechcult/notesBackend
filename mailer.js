import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import "dotenv/config";
const userEmail = "soorajnambiar8@gmail.com";
const EMAIL = process.env.MAIL_USER;
const PASSWORD = process.env.MAIL_USER_PASSWORD;
let config = {
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
};

let transporter = nodemailer.createTransport(config);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

let response = {
  body: {
    name: "Kaizen Notes",
    intro: "This is the OTP for your Registration",
    table: {
      data: [
        {
          item: "OTP",
          description: "918839",
        },
      ],
    },
    outro: "Looking forward to see ya!",
  },
};

let mail = MailGenerator.generate(response);

let message = {
  from: EMAIL,
  to: userEmail,
  subject: "Email Verification",
  html: mail,
};

transporter
  .sendMail(message)
  .then(() => {
    return console.log({
      msg: "you should receive an email",
    });
  })
  .catch((error) => {
    return console.log({ error });
  });
