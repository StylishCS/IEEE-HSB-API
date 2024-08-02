const { ContactForm } = require("../models/ContactForm");

async function submitContactFormController(req, res) {
  try {
    await ContactForm.create(req.body);
    return res.status(201).json("Created");
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getContactFormsController(req, res) {
  try {
    const forms = await ContactForm.find();
    return res.status(200).json(forms);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { getContactFormsController, submitContactFormController };
