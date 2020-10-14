import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const accountSchema = new mongoose.Schema(
	{
		balance: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
accountSchema.plugin(mongoosePaginate);

const Account = mongoose.model("Account", accountSchema);

export default Account;
