import express from "express";
import morgan from "morgan";
import path from "path";

import router from "./api";
import {
	configuredHelmet,
	httpsOnly,
	logErrors,
	pushStateRouting,
} from "./middleware";

const apiRoot = "/api";
const staticDir = path.join(__dirname, "static");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(configuredHelmet());
app.use(morgan("dev"));

app.use(cors());

if (app.get("env") === "production") {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use(apiRoot, router);

app.use(express.static(staticDir));
app.use(pushStateRouting(apiRoot, staticDir));

app.use(logErrors());

export default app;
