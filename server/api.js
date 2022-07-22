import { Router } from "express";
const router = Router();
import pool from "./db";
const multer = require("multer");
const upload = multer({ dest: "images/" });
const fs = require("fs");


router.post("/upload", upload.single("image"), (req, res) => {
	const filetypes = /jpeg|jpg|png|gif/;
	const mimetype = filetypes.test(req.file.mimetype);
	console.log(`${mimetype}: ${req.file.mimetype}`);
	if (!mimetype) {
		res.status(403).send(`{"error": "Bad file type, expected one of ${filetypes}, got ${req.file.mimetype}"}`);

		return;
	}
	const contents = fs.readFileSync(req.file.path, { encoding: "base64" });
	console.log("file data", req.file);
	console.log("file data", contents);
	pool.query(
		"INSERT INTO pics(uploader, contents, mimetype,  dateadded ) VALUES ($1, $2, $3, $4)  RETURNING id",
		["sam", contents, req.file.mimetype, "1"],
		(err, result) => {
			console.log(err, result);
			console.log(`Row IDL ${result.rows[0].id}`);
			res.send(`{"imageId": ${result.rows[0].id}}`);
		}
	);
	// res.sendStatus(200);
});

router.get("/image/:imageId", (req, res) => {
	pool.query(
		"SELECT contents, mimeType FROM pics WHERE id = $1", [req.params.imageId],
		(err, result) => {
			let img = Buffer.from(result.rows[0].contents, "base64");
			res.writeHead(200, {
				"Content-Type": result.rows[0].mimetype,
				"Content-Length": img.length,
			});
			res.end(img);
		}
	);
});

// const multer = require("multer");
// const path = require("path");

// const fileStorageEngine = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "./images");
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, new Date().valueOf() + "_" + file.originalname);
// 	},
// });

// router.get("/", (req, res) => {
// 	res.sendFile(path.join(__dirname, "index.html"));
// });

// const upload = multer({ storage: fileStorageEngine });

// router.post("/upload", upload.single("image"), (req, res) => {
// 	console.log(req.file);
// 	res.json("/image api");
// 	const newFilepath = req.body.filepath;
// 	const newMimetype = req.body.mimetype;
// 	const newSize= req.body.size;

// 	const query = "INSERT INTO images (filepath, mimetype, size) VALUES ($1, $2, $3, $4)";
// 	pool
//     .query(query, [ newFilepath, newMimetype, newSize])
//     .then(() => res.send("file uploaded"))
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json(error);
//     });
// });


// router.post("/multiple", upload.array("images", 3), (req, res) => {
// 	console.log(req.files);
// 	res.send("Multiple Files Upload Success");
// });
export default router;
