import { Router } from "express";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
import pool from "./db";

const router = Router();

router.get("/", (_, res) => {
	res.json({ message: "world" });
});

router.post("/upload", upload.single("image"), (req, res) => {
	//console.log(req.file);
	const path = req.file.path;
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const size = req.file.size;


	try {
		const data = fs.readFileSync(path, { encoding: "base64" });
		console.log(data);
        const query = "INSERT INTO image_files(filename, mimetype, size, file) VALUES ($1, $2, $3, $4)";
        pool.query(query, [filename, mimetype, size, data])
        .then(() => res.send("image created"))
        .catch((error) => {
         console.log(error);
         res.status(500).json(error);

        });

	} catch (err) {
		console.error(err);


    }
});

export default router;
