import {DROPDOWN_FILTER} from "../constants";

const MongooseService = require("./MongooseService");
import AccountModel from "../models/account";
import {isEmpty} from "../utils/is";
import {ACCOUNT_NOT_FOUND, NOT_ALLOWED_TO_CHANGE_STATUS} from "../constants/strings";
import {buildStatusFilters, getStatusAsArray, STATUS, STATUS_WORKFLOW} from "../models/status";

const destructAccount = account => ({
    id: account._id,
    balance: account.balance,
    status: STATUS[account.status],
    workflow: STATUS_WORKFLOW[account.status]
});

class AccountService {
    /**
     * @description Create an instance of Data Access layer using AccountService
     */
    constructor() {
        this.MongooseServiceInstance = new MongooseService(AccountModel);
    }

    /**
     * @description check if the current account status can move to the new status and return the new status
     * if that is possible, otherwise return null
     * @param account {object} Object containing details about the account that we need to change its status
     * @param status {string} represent the new status that we want to change the account to it
     * @returns {object<status|null>}
     */
    getStatusIfAllowedToMoveTo(account, status) {
        const newStatusFlow = STATUS_WORKFLOW[account.status].filter(item => item.status.code === status);
        return isEmpty(newStatusFlow) || !newStatusFlow[0].condition(account) ? null : newStatusFlow[0];
    };

    /**
     * @description Retrieve pages of the accounts
     * @param {number} [page] the page number, default value 1
     * @param filters {object} Object containing all required filters
     * @param {number} [limit] the page number, default value 1
     * @returns {Promise<{object}>}
     */
    async paginateAccounts({page = 1, filters = {}, limit}) {
        try {
            const result = await this.MongooseServiceInstance.paginate({page, filters, limit});
            result.docs = result.docs.map(account => destructAccount(account));
            return result;
        } catch (err) {
            return err;
        }
    }

    /**
     * @description Retrieve list of the filters that can be applied for accounts with the related values
     * @returns {{object}}
     */
    accountsFilters() {
        return {
            status: {
                type: DROPDOWN_FILTER,
                name: 'Status',
                code: 'status',
                values: buildStatusFilters(true)
            }
        };
    }

    /**
     * @description Change the status of an account
     * @param accountID {string} the account mongodb id
     * @param status {string} the new status code
     * @returns {Promise<{error: *}|{account: object}>}
     */
    async changeAccountStatus(accountID, status) {
        try {
            // get the account by id then return error if it doesn't exist
            let account = await this.MongooseServiceInstance.findById(accountID);
            if (!account) {
                return {
                    error: ACCOUNT_NOT_FOUND
                }
            }

            console.log(accountID);
            console.log(status);
            // check if it is allowed to change the status of the account to the new status
            const newStatusFlow = this.getStatusIfAllowedToMoveTo(account, status);
            console.log('newStatusFlow', newStatusFlow)
            if (isEmpty(newStatusFlow)) {
                return {error: NOT_ALLOWED_TO_CHANGE_STATUS};
            }

            // update the account with the new status
            account = await this.MongooseServiceInstance.update(accountID, {status});

            return destructAccount(account);

        } catch (e) {
            await Promise.reject(e);
        }
    }

}

export default AccountService;
