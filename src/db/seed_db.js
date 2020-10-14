import "dotenv/config";

import {accounts} from "./seeds/init_data";
import {connectDb, mongoose} from "./index";
import AccountModel from "../models/account";

const seedDBWithAccounts = async () => {
    const connection = await connectDb();
    await Promise.all(
        accounts.map(async ({balance, status}) => {
            const accountInstance = new AccountModel({
                balance,
                status,
            });
            await accountInstance.save();
        })
    );
    mongoose.connection.close()
};

seedDBWithAccounts().then(() => {
});
