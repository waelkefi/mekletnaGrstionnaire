const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");

// Configure AWS with your credentials and the region where your S3 bucket is located.
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3();
const bucketName = process.env.AWS_S3_BUCKET_NAME; // Specify your S3 bucket name.

// Create a multer storage configuration to handle uploads.
const storage = multer.memoryStorage();

// Create a multer instance using the storage configuration.
const uploadMulter = multer({ storage });

const uploadFileToS3 = (req, res, next) => {
    uploadMulter.array("activityImages", 10)(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        return next(err);
      }
  
      if (!req.files || req.files.length === 0) {
        console.log("No files to upload.");
        return next();
      }
  
      const uploadedUrls = []; // Initialize an array to store the uploaded URLs.
  
      // Loop through the uploaded files and upload each file to S3.
      req.files.forEach((file) => {
        const requestData = JSON.parse(req.body.data);
  
        let fileName;
  
        if (requestData.hasOwnProperty("cuisineType")) {
          fileName = "activities/restaurants/activityPic" + "-" + Date.now() + path.extname(file.originalname);
        } else if (requestData.hasOwnProperty("starNumber")){
          fileName = "activities/accomodation/activityPic" + "-" + Date.now() + path.extname(file.originalname);
        } else if (requestData.hasOwnProperty("difficulty")){
            fileName = "activities/entertainement/activityPic" + "-" + Date.now() + path.extname(file.originalname);
        }else if (requestData.hasOwnProperty("transportType")){
            fileName = "activities/transport/activityPic" + "-" + Date.now() + path.extname(file.originalname);
        } else {
            fileName = "activities/divers/activityPic" + "-" + Date.now() + path.extname(file.originalname);
        }
  
        // Upload the file to S3.
        const params = {
          Bucket: bucketName,
          Key: fileName,
          Body: file.buffer,
          ContentType: "image/jpg",
        };
  
        s3.upload(params, (err, data) => {
          if (err) {
            console.error("Error uploading file to S3:", err);
            return next(err);
          } else {
            console.log("File uploaded to S3:", data.Location);
            uploadedUrls.push(data.Location); // Add the URL to the array.
          }
  
          if (uploadedUrls.length === req.files.length) {
            // If all files have been uploaded, attach the array to the request object.
            req.uploadedUrls = uploadedUrls;
            next(); // Continue to the next middleware.
          }
  });
});
    });
};

module.exports = {
    uploadFileToS3,
};