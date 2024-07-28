const CryptoJS = require("crypto-js");
const encryptPayload = (payload) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    process.env.ENCRYPTION_KEY
  ).toString();
};
const decryptPayload = (encryptedPayload) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedPayload,
    process.env.ENCRYPTION_KEY
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

module.exports = { encryptPayload, decryptPayload };
