import { Router } from "express";
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const router = Router();

const GITHUB_CLIENT_ID = "979bf3578c79fbc73e1e";

const CLIENT_URL = "http://localhost:3000/auth/github/callback";

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

router.get("/", (_, res) => {
	res.json({ message: "world" });
});

router.get("/login", function (req, res) {
	//how to redirect to login page...aaaaaaaaa
});

router.get(
	"/auth/github",
	passport.authenticate("github", { scope: ["user:email", "read:org"] })
);

router.get(
	"/auth/github/callback",
	passport.authenticate("github", { failureRedirect: "/login" }),
	function (req, res) {
		// Successful authentication, redirect home.
		//find if user is cyf membre....filter by id if not => res.redirect('/some other page');
		console.log(req.user);
		//redirectioong to 3000 root   i can use http://5000/
		res.redirect("/");
	}
);

export default router;
