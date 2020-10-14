import {isEmpty} from "./is";
import {STATUS} from "../models/status";

const isStatus = value =>
    !isEmpty(STATUS[value]);

export default isStatus;
