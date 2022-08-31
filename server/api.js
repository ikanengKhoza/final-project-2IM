import { Router } from "express";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
import pool from "./db";

const passport = require("passport");
const cookieSession = require("cookie-session");
const GithubStrategy = require("passport-github2").Strategy;
const router = Router();

const GITHUB_CLIENT_ID = "979bf3578c79fbc73e1e";

const CLIENT_URL = "http://localhost:3000/api/auth/github/callback";

const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(
	new GithubStrategy(
		{
			clientID: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
			callbackURL: CLIENT_URL,
		},
		function (accessToken, refreshToken, profile, done) {
			done(null, profile);
		}
	)
);

router.use(
	cookieSession({
		name: "session",
		keys: ["someone"],
	})
);

router.use(passport.initialize());
router.use(passport.session());

router.get("/", (_, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.json({ message: "world" });
});


router.get("/image/:imageId", function (req, res) {
	const imageId = req.params.imageId;
	console.log(imageId);
	pool
		.query("SELECT * FROM image_files WHERE id=$1", [imageId])
		.then((result) => {
			let data = result.rows[0].file;
			let img = Buffer.from(data, "base64");
			res.writeHead(200, {
				"Content-Type": result.rows[0].mimetype,
				"Content-Length": img.length,
			});
			res.end(img);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json(error);
		});
});


router.get("/listImages", function (req, res) {

	pool
		.query("SELECT * FROM image_files")
		.then((result) => res.json(result.rows.map((element) => element.id)))
		.catch((error) => {
			console.error(error);
			res.status(500).json(error);
		});
});

router.post("/upload", upload.single("image"), (req, res) => {
	console.log("hi", req.body);
	const path = req.file.path;
	const filename = req.file.filename;
	const mimetype = req.file.mimetype;
	const size = req.file.size;
	const user_id = req.body.user_id;
	const description = req.body.description;

	try {
		const data = fs.readFileSync(path, { encoding: "base64" });
		console.log(data);
		const query =
			"INSERT INTO image_files(user_id, filename, mimetype, size, file, description) VALUES ($1, $2, $3, $4, $5, $6)";
		pool
			.query(query, [user_id, filename, mimetype, size, data, description])
			.then(() => res.send("image created"))
			.catch((error) => {
				console.log(error);
				res.status(500).json(error);
			});
	} catch (err) {
		console.error(err);
	}
});

router.delete("/image/:imageId", function (req, res) {
	const imageId = req.params.imageId;

	pool.query("DELETE FROM image_files WHERE image_id=$1", [imageId])
	.then(() => pool.query("DELETE FROM image_files WHERE id=$1", [imageId]))
	.then(() => res.send(`Image ${imageId} deleted!`))
	.catch((error) => {
		console.error(error);
		res.status(500).json(error);
 });
  });

// router.get("/login", function (req, res) {
// 	// res.redirect("")
// });

router.get(
	"/auth/github",
	passport.authenticate("github", { scope: ["user:email", "read:org"] })
);

router.get(
	"/auth/github/callback",
	passport.authenticate("github", { failureRedirect: "/login" }),
	function (req, res) {
		console.log(req.user);
		res.redirect("/");
	}
);

router.get("/auth/github/authenticationstatus", (req, res) => {
	res.json({ isauthenticated: req.isAuthenticated() });
});


export default router;
