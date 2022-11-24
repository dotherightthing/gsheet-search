/**
 * @file GsValidate.js
 */
class GsValidate {
  /**
   * @class
   * @summary Validation methods.
   * @public
   */

  /* Setters and Getters */

  /* Instance methods */

  /**
   * errorMessage
   *
   * @summary Generate a validation error message.
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @param {Array} types - Expected type(s)
   * @param {string} identifier - Label to use in error message
   */
  errorMessage(value, types, identifier) {
    const actualType = typeof value;
    const actualTypeArticle = this.getIndefiniteArticle(actualType);
    const typeSeparator = ', or ';
    let typeArticle;
    let typesStr = '';

    types.forEach((type) => {
      typeArticle = this.getIndefiniteArticle(type);
      typesStr += `${typeArticle} ${type}${typeSeparator}`;
    });

    // remove trailing separator
    typesStr = typesStr.slice(0, (-1 * typeSeparator.length));

    throw new Error(`${identifier} must be ${typesStr}, not ${actualTypeArticle} ${actualType}`);
  }

  /**
   * getIndefiniteArticle
   *
   * @summary Get the appropriate indefinite article for the specified string
   * @memberof GsValidate
   * @param {string} str - String
   * @returns {string} indefiniteArticle
   * @see {@link https://github.com/dotherightthing/kaicycle-run-mobile-tests}
   */
  getIndefiniteArticle(str) {
    const firstLetter = str.slice(0, 1).toLowerCase();
    const strLower = str.toLowerCase();

    let art = (firstLetter.match(/^(a|e|i|o|u)$/)) ? 'an' : 'a';

    if (strLower.match(/^(null|undefined)$/)) {
      art = '';
    }

    return art;
  }

  /**
   * isArray
   *
   * @summary Validate that a value is an array
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   */
  isArray(value) {
    return (Array.isArray(value));
  }

  /**
   * isBoolean
   *
   * @summary Validate that a value is a boolean
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   */
  isBoolean(value) {
    return (typeof value === 'boolean');
  }

  /**
   * isNull
   *
   * @summary Validate that a value is null
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   */
  isNull(value) {
    return (value === null);
  }

  /**
   * isNumber
   *
   * @summary Validate that a value is a number
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   */
  isNumber(value) {
    return (!isNaN(value)); // eslint-disable-line no-restricted-globals
  }

  /**
   * isObject
   *
   * @summary Validate that a value is an object
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   */
  isObject(value) {
    return (Object.prototype.toString.call(value) === '[object Object]');
  }

  /**
   * isString
   *
   * @summary Validate that a value is a string (even an empty one)
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   */
  isString(value) {
    return (typeof value === 'string');
  }

  /**
   * isString1
   *
   * @summary Validate that a value is a string of at least one character in length
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @returns {boolean} valid
   */
  isString1(value) {
    return (value.trim().length > 0);
  }

  /**
   * isTypeOf
   *
   * @summary Validate that a value is a string of a specific type
   * @memberof GsValidate
   * @param {*} value - Value to validate
   * @param {string} type - Type
   * @returns {boolean} valid
   */
  isTypeOf(value, type) {
    return (typeof value === type);
  }

  /**
   * stringToCapitalised
   *
   * @summary Capitalise a string
   * @memberof GsValidate
   * @param {string} str - String to convert
   * @returns {string} capitalisedStr
   */
  stringToCapitalised(str) {
    if (typeof str !== 'string') {
      return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
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
   * @todo Test
   */
  validate(value, type, identifier, condition = true) {
    if (condition) {
      const types = type.split('|');
      let valid = false;

      // type can be singular (e.g. 'number') or multiple (e.g. 'number|string|boolean')
      types.every((t) => {
        const validationMethod = `is${this.stringToCapitalised(t)}`;

        if (validationMethod.match(/^(isArray|isBoolean|isNull|isNumber|isObject|isString|isString1|isTypeOf)$/)) {
          if (validationMethod === 'isTypeOf') {
            valid = this[validationMethod](value, type);
          } else {
            valid = this[validationMethod](value);
          }

          // value is valid if any type is valid
          if (valid) {
            return false; // stop looping
          }
        } else {
          throw new Error(`krmValidateInstance.validate does not support type ${type}`);
        }

        return true; // continue looping
      });

      if (!valid) {
        throw new Error(this.errorMessage(value, types, identifier));
      }
    }

    return value;
  }

  /* Static methods */
}
