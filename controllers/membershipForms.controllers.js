const { MembershipForm } = require("../models/MembershipForm");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

async function submitMembershipFormController(req, res) {
  try {
    await MembershipForm.create(req.body);
    return res.status(201).json("Created");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getMembershipFormsController(req, res) {
  try {
    const forms = await MembershipForm.find();
    return res.status(200).json(forms);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function approveFormController(req, res) {
  try {
    const form = await MembershipForm.findById(req.params.id);
    if (!form) {
      return res.status(404).json("Application not found");
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    const data = {
      name: form.name,
    };
    const filePath = path.join(
      __dirname,
      "..",
      "public",
      "mail-template",
      "approvement.ejs"
    );
    const fileContent = fs.readFileSync(filePath, "utf8");
    const modifiedEmailTemplate = ejs.render(fileContent, data);
    const mailOptions = {
      from: "ieee.hsb.official@gmail.com",
      to: form.email,
      subject: "IEEE Membership Approvement",
      html: modifiedEmailTemplate,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw error;
      }
      console.log("Email sent: " + info.response);
    });
    await MembershipForm.findByIdAndDelete(req.params.id);
    return res.status(200).json("Approved");
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  approveFormController,
  getMembershipFormsController,
  submitMembershipFormController,
};
