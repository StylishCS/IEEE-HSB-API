const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

async function uploadArrayToCloudinary(req, res, next) {
  try {
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { resource_type: "auto" },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );

            streamifier.createReadStream(file.buffer).pipe(stream);
          })
      );

      const results = await Promise.all(uploadPromises);
      req.cloudinaryResults = results;
    }
    next();
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error);
    return res
      .status(500)
      .json({ error: "Error uploading files to Cloudinary" });
  }
}

module.exports = uploadArrayToCloudinary;
