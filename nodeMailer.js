import nodemailer from "nodemailer";

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider
  auth: {
    user: "kaizentechcult@gmail.com", // Your email address
    pass: "cult(KCC)kaizen-135", // Your email password or app-specific password
  },
});

// Set up email data
let mailOptions = {
  from: '"Your Name" <your-email@gmail.com>', // Sender address
  to: "receiver-email@example.com", // List of receivers
  subject: "Hello", // Subject line
  text: "Hello world?", // Plain text body
  html: "<b>Hello world?</b>", // HTML body
};

// Send mail
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log("Error: ", error);
  }
  console.log("Message sent: %s", info.messageId);
});
