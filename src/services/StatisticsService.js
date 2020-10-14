import MongooseService from "./MongooseService";
import AccountModel from "../models/account";

class StatisticsService {
    /**
     * @description Create an instance of Data Access layer using AccountService
     */
    constructor() {
        this.MongooseServiceInstance = new MongooseService(AccountModel);
    }

    async getStatusOverview() {
        try{
            const statusesOverview = await this.MongooseServiceInstance.aggregate([
                {
                    $group: {
                        _id: '$status',
                        count: {$sum: 1},
                        totalBalance: {$sum: '$balance'}
                    }
                }
            ]);
            return statusesOverview;
        } catch (e) {
            await Promise.reject(e);
        }
    }

    async getTotalAccountsBalance() {
        try{
            const result = await this.MongooseServiceInstance.aggregate([
                {
                    $group: {
                        _id: null,
                        count: {$sum: 1},
                        totalBalance: {$sum: '$balance'}
                    }
                }
            ]);
            return result;
        } catch (e) {
            await Promise.reject(e);
        }
    }
}

export default StatisticsService;
