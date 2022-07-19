import { Router } from "express";
const router = Router();

const multer = require("multer");
const multerS3 = require("multer-s3");

const AWS = require("aws-sdk");

const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new AWS.S3({
	bucketName: bucketName,
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
});

const uploadS3 = multer({
	storage: multerS3({
		s3: s3,
		acl: "public-read",
		bucket: "bucket-name",
		metadata: (req, file, cb) => {
			cb(null, { fieldName: file.fieldname });
		},
		key: (req, file, cb) => {
			cb(null, Date.now().toString() + "-" + file.originalname);
		},
	}),
});

router.post("/upload", uploadS3.single("image"), (req, res) => {
	console.log(req.file);
	res.send("upload successful");
});

// const path = require("path");

// const multer = require("multer");

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "--" + file.originalname);
//   },
// });

// router.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// const upload = multer({ storage: fileStorageEngine });

// router.post("/upload", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   res.send("Single FIle upload success");
// });

export default router;
