const isString = value => typeof value === 'string' || value instanceof String;

const isNumber = value => typeof value === 'number' && isFinite(value);

const isInteger = value => isNumber(value) && Number.isInteger(value);

const isPositiveInteger = value => isInteger(value) && value > 0;

const isFloat = value => (isNumber(value) && value % 1 !== 0) || value === 0;

const isArray = value => Array.isArray(value);

const isObject = value => value && typeof value === 'object';

const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);

export {
    isString,
    isNumber,
    isInteger,
    isPositiveInteger,
    isFloat,
    isArray,
    isObject,
    isEmpty
};
