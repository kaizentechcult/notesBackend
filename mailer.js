import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import "dotenv/config";
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

const sendMail = (name, userEmail, OTPgen) => {
  let response = {
    body: {
      name,
      intro: "This is the OTP for your Registration",
      table: {
        data: [
          {
            item: "OTP",
            description: OTPgen,
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

  return transporter
    .sendMail(message)
    .then(() => {
      return { msg: "you should receive an email" };
    })
    .catch((error) => {
      return { error };
    });
};

export default sendMail;

