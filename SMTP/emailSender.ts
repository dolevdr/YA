import cors, { CorsOptions } from "cors";
const nodemailer = require("nodemailer");

const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const corsOptions: CorsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req: any, res: any, next: any) => {
  try {
    const { from, to_recipient, subject, body } = req.body;
    let mailOptions = {
      from: from,
      to: to_recipient,
      subject: subject,
      text: body,
      html: `<b>${body}</b>`,
    };
    let transport = nodemailer.createTransport();
    await transport.sendMail(mailOptions);
    res.status(200).send('email sended successfully')
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
