import { Router } from "express";
//const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");

//const multerS3 = require("multer-s3");

const router = Router();

//const s3 = new S3Client();

router.get("/", (_, res) => {
	res.json({ message: "world" });
});

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./images");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "--" + file.originalname);
	},
});

const upload = multer({ storage: fileStorageEngine });

router.post("/upload", upload.single("image"), (req, res) => {
	const title = req.body.title;
	const author = req.body.author;

	console.log(req.file);
	console.log(title, author);
	res.send("single file upload success");
});

export default router;
