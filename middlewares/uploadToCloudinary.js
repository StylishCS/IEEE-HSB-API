const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

async function uploadToCloudinary(req, res, next) {
  try {
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      req.cloudinaryResult = result;
    }
    next();
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return res
      .status(500)
      .json({ error: "Error uploading file to Cloudinary" });
  }
}

module.exports = uploadToCloudinary;
