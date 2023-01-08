const mongoose = require("mongoose");
mongoose.set("strictQuery", true);



const emailSchema = new mongoose.Schema({
  to_recipient: String,
  subject: String,
  body: String,
});

const Emails = mongoose.model("Emails", emailSchema);

export const insertEmails = async (
  to_recipient: string,
  subject: string,
  body: string
) => {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

    const e = new Emails({
      to_recipient: to_recipient,
      subject: subject,
      body: body,
    });
    await e.save();
    console.log("Mail saved successfully!");
  } catch (e) {
    console.log(e);
  } finally {
    mongoose.connection.close()
  }
};
