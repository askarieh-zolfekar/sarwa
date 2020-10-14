import validator from 'validator';
import { isString, isEmpty } from './is';

export default function isMongoID(id) {
  return isString(id) && !isEmpty(id) && validator.isMongoId(id);
};
