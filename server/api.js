import { Router } from "express";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const util = require("util");
const fs = require("fs");
const unlinkFile = util.promisify(fs.unlink);

const router = Router();

const { uploadFile, getFileStream } = require("./s3");

router.get("/images/:key", (req, res) => {
	console.log(req.params);
	const key = req.params.key;
	const readStream = getFileStream(key);

	readStream.pipe(res);
});

router.post("/images", upload.single("image"), async (req, res) => {
	const file = req.file;
	console.log(file);

	// apply filter
	// resize

	const result = await uploadFile(file);
	await unlinkFile(file.path);
	console.log(result);
	const description = req.body.description;
	console.log(description);
	res.send({ imagePath: `/images/${result.Key}` });
});

export default router;
