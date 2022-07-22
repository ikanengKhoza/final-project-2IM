import { Router } from "express";
import pool from "./db";
const router = Router();
const multer = require("multer");
//const fs = require("fs");
const path = require("path");
const upload = multer({ dest: "uploads/" });

router.get("/upload/:filename", (req, res) => {
	const { filename } = req.params;
    pool
        .select("*")
        .from("images")
        .where({ filename })
        .then((images) => {
            if (images[0]) {
                const dirname = path.resolve();
                const fullfilepath = path.join(
                                         dirname,
                                         images[0].filepath);
                return res
                           .type(images[0].mimetype)
                           .sendFile(fullfilepath);
            }
            return Promise.reject(
                new Error("Image does not exist")
            );
        })
        .catch((err) => res
                          .status(404)
                          .json(
                              {
                                  success: false,
                                  message: "not found",
                                  stack: err.stack,
                               }
                          ),
        );
});

router.post("/upload", upload.single("image"), (req, res) => {
	const { filename, mimetype, size } = req.file;
    const filepath = req.file.path;
	pool
        .insert({
            filename,
            filepath,
            mimetype,
            size,
        })
        .into("images")
        .then(() => res.json({ success: true, filename }))
        .catch((err) => res
                          .json(
                              {
                                  success: false,
                                  message: "cannot upload",
                                  stack: err.stack,
                              }
                          )
        );
});


export default router;
