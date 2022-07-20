import { Router } from "express";
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const router = Router();

GITHUB_CLIENT_ID = "979bf3578c79fbc73e1e";
GITHUB_CLIENT_SECRET = "1fe4fa0c3b3e4122f8db5f888f5626933429ebb5";
// const CLIENT_URL = "http://localhost:3000/auth/github/callback";


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
		callbackURL: "http://localhost:3100/auth/github/callback",
	  },
	  function (accessToken, refreshToken, profile, done) {
		done(null, profile);
	  }
	)
  );

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});


router.get("/login", function(req,res){
	//how to redirect to login page...aaaaaaaaa
  });

router.get("/auth/github",
	passport.authenticate("github", { scope: [ "user:email", "read:org" ] }
	));

router.get("/auth/github/callback",
	passport.authenticate("github", { failureRedirect: "/login" }),
	function(req, res) {
	  // Successful authentication, redirect home.
	  //find if user is cyf membre....filter by id if not => res.redirect('/some other page');
	  console.log(req.user);
	  //redirectioong to 3000 root   i can use http://5000/
	  res.redirect("/");
	});


export default router;
