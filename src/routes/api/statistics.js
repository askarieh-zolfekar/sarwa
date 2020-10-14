import express from "express";
import StatisticsController from '../../controllers/StatisticsController';

const router = express.Router();

// @route   GET api/statistics
// @desc    Overview account statistics
// @access  public
router.get("/", StatisticsController.overviewAccountStatistics);

export default router;
