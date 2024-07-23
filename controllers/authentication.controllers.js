const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

async function adminLoginController(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong Email or Password");
    }
    const valid = bcrypt.compareSync(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json("Wrong Email or Password");
    }
    if (user.category === "participant") {
      return res.status(401).json("Wrong Email or Password");
    }

    let otp = Math.floor(1000 + Math.random() * 9000);
    const expiresIn = new Date();
    expiresIn.setMinutes(expiresIn.getMinutes() + 5);
    user.otp = {
      code: bcrypt.hashSync(otp.toString(), 10),
      expire: expiresIn,
    };
    await user.save();

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
      name: user.name,
      email: user.email,
      otp: otp,
    };
    const filePath = path.join(
      __dirname,
      "..",
      "public",
      "mail-template",
      "otp-mail.ejs"
    );
    const fileContent = fs.readFileSync(filePath, "utf8");
    const modifiedEmailTemplate = ejs.render(fileContent, data);

    const mailOptions = {
      from: "ieee.hsb.official@gmail.com",
      to: user.email,
      subject: "Your OTP Code",
      html: modifiedEmailTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json("Error sending email");
      }
      console.log("Email sent: " + info.response);
    });

    return res.status(200).json("Verification Code Sent..");
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function verifyAdminLoginController(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong Email or OTP");
    }

    if (new Date() > user.otp.expire) {
      return res.status(401).json("OTP has expired");
    }

    const validOtp = bcrypt.compareSync(req.body.otp, user.otp.code);
    if (!validOtp) {
      return res.status(401).json("Wrong Email or OTP");
    }
    let userWithoutPassword = { ...user };
    delete userWithoutPassword._doc.password;
    delete userWithoutPassword._doc.refreshToken;
    delete userWithoutPassword._doc.otp;
    userWithoutPassword = userWithoutPassword._doc;
    const refreshToken = jwt.sign(
      { ...userWithoutPassword },
      process.env.JWT_SECRET_ADMIN,
      {
        expiresIn: "30d",
      }
    );
    const accessToken = jwt.sign(
      { ...userWithoutPassword },
      process.env.JWT_SECRET_ADMIN,
      {
        expiresIn: "5m",
      }
    );
    user.refreshToken = bcrypt.hashSync(refreshToken, 10);
    user.otp.code = null;
    user.otp.expire = null;
    await user.save();
    return res
      .status(200)
      .json({ user: userWithoutPassword, refreshToken, accessToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
async function adminRefreshTokenController(req, res) {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json("Unauthorized");
    }
    const refreshToken = req.header("Authorization").split(" ")[1];
    if (!refreshToken) {
      return res.status(401).json("Unauthorized");
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_ADMIN);
    if (!decoded) {
      return res.status(401).json("Unauthorized");
    }
    const user = await User.findById(decoded._id);
    if (!user) {
      console.log("flag2");
      return res.status(401).json("Unauthorized");
    }
    if (user.category == "PARTICIPANT") {
      console.log("flag3");
      return res.status(401).json("Unauthorized");
    }
    const valid = bcrypt.compareSync(refreshToken, user.refreshToken);
    if (!valid) {
      console.log("flag4");
      return res.status(401).json("Unauthorized");
    }
    let userWithoutPassword = { ...user };
    delete userWithoutPassword._doc.password;
    delete userWithoutPassword._doc.refreshToken;
    delete userWithoutPassword._doc.otp;
    userWithoutPassword = userWithoutPassword._doc;
    const accessToken = jwt.sign(
      { ...userWithoutPassword },
      process.env.JWT_SECRET_ADMIN,
      {
        expiresIn: "5m",
      }
    );
    return res.status(200).json(accessToken);
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  adminLoginController,
  verifyAdminLoginController,
  adminRefreshTokenController,
};
