import responseFormat from "../../utils/responseFormat";
import StatisticsService from "../../services/StatisticsService";
const StatisticsServiceInstance = new StatisticsService();

module.exports = {overviewAccountStatistics};

/**
 * @description get overview statistics about the accounts
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @param next {function} Express next object
 * @returns {Promise<*>}
 */
async function overviewAccountStatistics(req, res, next) {
    try {
        const totalBalance = await StatisticsServiceInstance.getTotalAccountsBalance();
        const statusOverview = await StatisticsServiceInstance.getStatusOverview();
        return res.send(responseFormat({totalBalance, statusOverview}, res.statusCode));
    } catch (err) {
        next(err);
    }
}
