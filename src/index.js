import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDb } from "./db";
import errorHandling from "./middleware/errorHandling";
import morgan from "morgan";
import morganFormat from "./morgan";
import winston from "./winston";

import accountRouter from './routes/api/accounts';
import statisticsRouter from './routes/api/statistics';
import helmet from "helmet";

const path = require("path");
const app = express();
// event emitter + testing

// Express.js security with HTTP headers
app.use(helmet());

app.use(cors());

// Morgan logger with winston as a destination
app.use(morgan(morganFormat, { stream: winston.stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'react-app/build')));

app.get("/", (req, res) => {
	console.log("test")
	res.sendFile(path.join(__dirname + "/react-app/build/index.html"));
});

app.use("/api/accounts", accountRouter);
app.use("/api/statistics", statisticsRouter);

app.use(errorHandling);

connectDb().then(async () => {
	app.listen(process.env.PORT, () =>
		console.log(`App ready and listening on port ${process.env.PORT}!`)
	);
});
