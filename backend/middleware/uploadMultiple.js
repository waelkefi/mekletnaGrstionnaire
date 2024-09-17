const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3"); // Updated import statement
const path = require("path");
const express = require("express");
const router = express.Router();


// Configure AWS S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION, // Replace with your desired AWS region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Create a multer storage engine that uploads to S3
const storage = multerS3({
  s3: s3Client,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  //acl: "public-read", // Set the appropriate ACL permissions
  contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set the content type
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const folder = 'activities/restaurants/';
    const key = folder + "activityPic" + "-" + Date.now() + path.extname(file.originalname);
    cb(null, key);
  },
});

// Function to sanit_ize files and send an error for unsupported files
function sanitizeFile(file, cb) {
  // Define the allowed extensions
  const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

  // Check allowed extensions
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  // Mime type must be an image
  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // No errors
  } else {
    // Pass an error message to the callback, which can be displayed in the frontend
    cb("Error: File type not allowed!");
  }
}

// Create multer instance with S3 storage
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 4, // 4mb file size
  },
}).array("activityImages", 10); // Set the maximum number of images to be uploaded.

router.post("/", (req, res) => {
  console.log("Request:", req); // Log the request object
  console.log("Response:", res); // Log the response object
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "File upload failed." });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    const imageUrls = req.files.map((file) => file.location);

    res.status(200).json({ success: "File(s) uploaded successfully.", imageUrls });
  });
});

module.exports = upload;
