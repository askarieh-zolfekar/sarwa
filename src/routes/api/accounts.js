import express from "express";
import AccountService from '../../services/AccountService';
import AccountController from '../../controllers/AccountController';
import StatisticsController from '../../controllers/StatisticsController';

const AccountServiceInstance = new AccountService();
const router = express.Router();

// @route   GET api/accounts
// @desc    List accounts with pagination
// @access  public
router.get("/", AccountController.listAccounts);

// @route   GET api/accounts/filters
// @desc    List accounts with pagination
// @access  public
router.get("/filters", AccountController.getAccountFilters);

// @route   PUT api/accounts/:id/status
// @desc    Update the status of the account with the following ID
// @access  public
router.put("/:id/status", AccountController.changeAccountStatus);



export default router;
