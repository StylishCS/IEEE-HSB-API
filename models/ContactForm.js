const mongoose = require("mongoose");
const contactFormSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
  },
  { timestamps: true }
);

const ContactForm = mongoose.model("ContactForm", contactFormSchema);
exports.ContactForm = ContactForm;
