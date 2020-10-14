import logger from '../winston';
import responseFormat from '../utils/responseFormat';
import {SOMETHING_WRONG} from "../constants/strings";

export default (err, req, res, next) => {
    logger.error(err.message);
    res.status(400);
    return res.json(responseFormat({ error: SOMETHING_WRONG }, res.statusCode));
};
