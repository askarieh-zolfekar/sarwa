import mongoose from "mongoose";

const connectDb = () =>
	mongoose
		.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Mongodb is connected");
		})
		.catch((err) => {
			console.log("Mongodb failed to connect", err)
		});

export { mongoose, connectDb };
