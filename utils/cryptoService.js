const CryptoJS = require("crypto-js");

// Middleware to encrypt payload
const encryptPayload = (payload) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    "ENCRYPTION_KEY"
  ).toString();
};

// Middleware to decrypt payload
const decryptPayload = (encryptedPayload) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPayload, "ENCRYPTION_KEY");
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

module.exports = { encryptPayload, decryptPayload };
