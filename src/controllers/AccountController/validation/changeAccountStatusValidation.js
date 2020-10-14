import {NOT_VALID_STATUS, NOT_VALID_ID} from "../../../constants/strings";
import isStatus from "../../../utils/isStatus";
import isMongoID from "../../../utils/isMongoID";

export default function changeAccountStatusValidation(id, newStatus) {
    if (!isMongoID(id)) {
        return {error: NOT_VALID_ID};
    }
    if (!isStatus(newStatus)) {
        return {error: NOT_VALID_STATUS};
    }

    return true;
};
