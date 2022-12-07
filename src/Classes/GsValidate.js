/**
 * @file GsValidate.js
 */
class GsValidate {
  /**
   * @class
   * @summary Validation methods.
   * @public
   */

  /* Static methods */

  /**
   * errorMessage
   *
   * @summary Generate a validation error message.
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @param {Array} types - Expected type(s)
   * @param {string} identifier - Label to use in error message
   * @static
   */
  static errorMessage(value, types, identifier) {
    const actualType = typeof value;
    const actualTypeArticle = GsUtils.getIndefiniteArticle(actualType);
    const typeSeparator = ', or ';
    let typeArticle;
    let typesStr = '';

    types.forEach((type) => {
      typeArticle = GsUtils.getIndefiniteArticle(type);
      typesStr += `${typeArticle} ${type}${typeSeparator}`;
    });

    // remove trailing separator
    typesStr = typesStr.slice(0, (-1 * typeSeparator.length));

    throw new Error(`${identifier} must be ${typesStr}, not ${actualTypeArticle} ${actualType}`);
  }

  /**
   * isArray
   *
   * @summary Validate that a value is an array
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   * @static
   */
  static isArray(value) {
    return (Array.isArray(value));
  }

  /**
   * isBoolean
   *
   * @summary Validate that a value is a boolean
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   * @static
   */
  static isBoolean(value) {
    return (typeof value === 'boolean');
  }

  /**
   * isNull
   *
   * @summary Validate that a value is null
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   * @static
   */
  static isNull(value) {
    return (value === null);
  }

  /**
   * isNumber
   *
   * @summary Validate that a value is a number
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   * @static
   */
  static isNumber(value) {
    return (!isNaN(value)); // eslint-disable-line no-restricted-globals
  }

  /**
   * isObject
   *
   * @summary Validate that a value is an object
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   * @static
   */
  static isObject(value) {
    return (Object.prototype.toString.call(value) === '[object Object]');
  }

  /**
   * isString
   *
   * @summary Validate that a value is a string (even an empty one)
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   * @static
   */
  static isString(value) {
    return (typeof value === 'string');
  }

  /**
   * isString1
   *
   * @summary Validate that a value is a string of at least one character in length
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   * @static
   */
  static isString1(value) {
    if (typeof value === 'string') {
      return (value.trim().length > 0);
    }

    return false;
  }

  /**
   * isStringE
   *
   * @summary Validate that a value is a string of E (E = Error)
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   * @static
   */
  static isStringE(value) {
    if (typeof value === 'string') {
      return (value === 'E');
    }

    return false;
  }

  /**
   * isTypeOf
   *
   * @summary Validate that a value is a string of a specific type
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @param {string} type - Type
   * @returns {boolean} valid
   * @static
   */
  static isTypeOf(value, type) {
    return (typeof value === type);
  }

  /**
   * validate
   *
   * @summary Validate a value against a type.
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @param {string} type - Expected type
   * @param {string} identifier - Label to use in error message
   * @param {boolean} condition - Validate if condition is true
   * @returns {*} value
   * @static
   */
  static validate(value, type, identifier, condition = true) {
    if (condition) {
      const types = type.split('|');
      let valid = false;

      // type can be singular (e.g. 'number') or multiple (e.g. 'number|string|boolean')
      types.every((t) => {
        const validationMethod = `is${GsUtils.stringToCapitalised(t)}`;

        if (validationMethod.match(/^(isArray|isBoolean|isNull|isNumber|isObject|isString|isString1|isStringE|isTypeOf)$/)) {
          if (validationMethod === 'isTypeOf') {
            valid = GsValidate[validationMethod](value, type);
          } else {
            valid = GsValidate[validationMethod](value);
          }

          // value is valid if any type is valid
          if (valid) {
            return false; // stop looping
          }
        } else {
          throw new Error(`GsValidate.validate does not support type ${type}`);
        }

        return true; // continue looping
      });

      if (!valid) {
        throw new Error(GsValidate.errorMessage(value, types, identifier));
      }
    }

    return value;
  }
}
