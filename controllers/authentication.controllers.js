const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { encryptPayload } = require("../utils/cryptoService");
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
        throw error;
      }
      console.log("Email sent: " + info.response);
    });

    return res.status(200).json("Verification Code Sent..");
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function resendOtpController(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong Email or Password");
    }
    if (!user.otp.code) {
      return res.status(400).json("No OTP Exist");
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
        throw error;
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
    const user = await User.findOne({ email: req.body.email }).select(
      "-password -refreshToken"
    );
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
    let userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      faculty: user.faculty,
      level: user.level,
      category: user.category,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    const encryptedRefreshTokenPayload = encryptPayload(userData);
    const refreshToken = jwt.sign(
      { encryptedRefreshTokenPayload },
      process.env.JWT_SECRET_ADMIN,
      {
        expiresIn: "30d",
      }
    );
    user.refreshToken = crypto
      .createHash("SHA256")
      .update(refreshToken)
      .digest("hex");
    user.otp.code = null;
    user.otp.expire = null;
    userData.refreshToken = user.refreshToken;
    await user.save();
    userData.updatedAt = user.updatedAt;
    const encryptedAccessTokenPayload = encryptPayload(userData);
    const accessToken = jwt.sign(
      { encryptedAccessTokenPayload },
      process.env.JWT_SECRET_ADMIN,
      {
        expiresIn: "5m",
      }
    );
    res.setHeader("Set-Cookie", [
      `accessToken=${accessToken}; HttpOnly; SameSite=None; Path=/; Max-Age=${300000}; Secure=True;`,
      `refreshToken=${refreshToken}; HttpOnly; SameSite=None; Path=/; Max-Age=${
        30 * 24 * 60 * 60 * 1000
      }; Secure=True;`,
    ]);
    delete userData.refreshToken;
    return res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
async function adminRefreshTokenController(req, res) {
  try {
    if (!req.cookies.refreshToken) {
      return res.status(401).json("Unauthorized");
    }
    const refreshToken = req.cookies.refreshToken;
    const newHashValue = crypto
      .createHash("SHA256")
      .update(refreshToken)
      .digest("hex");
    if (newHashValue != req.user.refreshToken) {
      return res.status(401).json("Unauthorized");
    }
    const encryptedAccessTokenPayload = encryptPayload(req.user);
    const accessToken = jwt.sign(
      { encryptedAccessTokenPayload },
      process.env.JWT_SECRET_ADMIN,
      {
        expiresIn: "5m",
      }
    );
    res.setHeader("Set-Cookie", [
      `accessToken=${accessToken}; HttpOnly; SameSite=None; Path=/; Max-Age=${300000}; Secure=True;`,
    ]);
    return res.status(200).json("Access Token Refreshed.");
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  adminLoginController,
  verifyAdminLoginController,
  adminRefreshTokenController,
  resendOtpController,
};
