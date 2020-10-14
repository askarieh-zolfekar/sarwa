import {NOT_VALID_FILTERS, NOT_VALID_LIMIT, NOT_VALID_PAGE} from "../../../constants/strings";
import {isEmpty, isObject, isPositiveInteger} from "../../../utils/is";

export default function listAccountsValidation(page, filters, limit) {
    if (!isEmpty(page) && !isPositiveInteger(parseInt(page))) {
        return {error: NOT_VALID_PAGE};
    }
    if (!isEmpty(limit) && !isPositiveInteger(parseInt(limit))) {
        return {error: NOT_VALID_LIMIT};
    }
    if (!isEmpty(filters) && !isObject(filters)) {
        return {error: NOT_VALID_FILTERS};
    }

    return true;
};
