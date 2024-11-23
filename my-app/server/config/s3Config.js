const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

// AWS S3 Client Configuration
const s3 = new S3Client({
    region: process.env.AWS_REGION_NAME,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const uniqueFileName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueFileName);
        },
        acl: "public-read", // File is publicly readable
        contentType: (req, file, cb) => {
            const mimeTypes = {
                "image/jpeg": "image/jpeg",
                "image/png": "image/png",
                "image/gif": "image/gif",
            };
            const mimeType = mimeTypes[file.mimetype] || "application/octet-stream"; 
            cb(null, mimeType);
        },
        contentDisposition: 'inline',
    }),
});
module.exports = upload;
