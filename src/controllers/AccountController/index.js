import responseFormat from "../../utils/responseFormat";
import changeAccountStatusValidation from "./validation/changeAccountStatusValidation";

import AccountService from "../../services/AccountService";
import FormatService from "../../services/FormatService";
import listAccountsValidation from "./validation/listAccountsValidation";
const AccountServiceInstance = new AccountService();
const FormatServiceInstance = new FormatService();

module.exports = {listAccounts, changeAccountStatus, getAccountFilters};

/**
 * @description List accounts in a pagination way with filters that are passed through a query field called filters
 * @param req {object} Express req object, it contains page, filters in the params
 * @param res {object} Express res object
 * @param next {function} Express next object
 * @returns {Promise<*>}
 */
async function listAccounts(req, res, next) {
    const {page, filters, limit} = req.query;

    const isValid = listAccountsValidation(page, filters, limit);
    if (isValid.error) {
        return res.status(400).json(FormatServiceInstance.formatResponse(isValid, res.statusCode));
    }

    try {
        const accountList = await AccountServiceInstance.paginateAccounts({page, filters, limit});
        return res.json(FormatServiceInstance.formatResponse(accountList, res.statusCode));
    } catch (err) {
        next(err);
    }
}

/**
 * @description List account filters
 * @param req {object} Express req object, it contains page, filters in the params
 * @param res {object} Express res object
 * @param next {function} Express next object
 * @returns {Promise<*>}
 */
async function getAccountFilters(req, res, next) {
    const filtersObject = AccountServiceInstance.accountsFilters();
    res.json(FormatServiceInstance.formatResponse(filtersObject, res.statusCode));
}
/**
 * @description Change accounts status based on the workflow conditions
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next object
 * @returns {Promise<*>}
 */
async function changeAccountStatus(req, res, next) {
    // extract data from body and params
    const {id} = req.params;
    const {status} = req.body;

    // validate the request fields
    const isValid = changeAccountStatusValidation(id, status);
    if (isValid.error) {
        return res.status(400).json(FormatServiceInstance.formatResponse(isValid, res.statusCode));
    }

    try {
        const result = await AccountServiceInstance.changeAccountStatus(id, status);
        if (result.error) {
            return res.status(400).json(FormatServiceInstance.formatResponse(result, res.statusCode));
        }
        return res.json(FormatServiceInstance.formatResponse(result, res.statusCode));
    } catch (err) {
        next(err);
    }
}
