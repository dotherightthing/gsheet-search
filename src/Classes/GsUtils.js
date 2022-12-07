/**
 * @file GsUtils.js
 */
class GsUtils {
  /**
   * @class
   * @summary Utility methods.
   * @public
   */

  /* Static methods */

  /**
   * getIndefiniteArticle
   *
   * @summary Get the appropriate indefinite article for the specified string
   * @memberof GsUtils
   * @static
   * @param {string} str - String
   * @returns {string} indefiniteArticle
   */
  static getIndefiniteArticle(str) {
    const firstLetter = str.slice(0, 1).toLowerCase();
    const strLower = str.toLowerCase();

    let art = (firstLetter.match(/^(a|e|i|o|u)$/)) ? 'an' : 'a';

    if (strLower === 'null') {
      art = '';
    }

    return art;
  }

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GsUtils} instance of class
   * @see {@link https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927}
   * @see {@link https://stackoverflow.com/a/50285439}
   */
  static getInstance(config) {
    let _config = config;

    if (!this.instance) {
      if (typeof _config === 'undefined') {
        const cacheKey = 'config';
        const cachedConfig = GsCache.getCacheItem(cacheKey, true);

        if (GsValidate.isObject(cachedConfig)) {
          _config = cachedConfig;
        } else {
          throw new Error('GsUtils.getInstance requires a configuration object the first time it is called and none was cached');
        }
      }

      this.instance = new GsUtils(_config);
    }

    return this.instance;
  }

  /**
   * stringBooleanToBoolean
   *
   * @summary Convert a string to a boolean value
   * @memberof GsUtils
   * @static
   * @param {string} str - String to convert
   * @returns {boolean|string} output
   */
  static stringBooleanToBoolean(str) {
    let output = str;

    // spreadsheet expects a boolean
    if (str.toLowerCase() === 'true') {
      output = true;
    } else if (str.toLowerCase() === 'false') {
      output = false;
    }

    return output;
  }

  /**
   * stringToCapitalised
   *
   * @summary Capitalise a string
   * @memberof GsUtils
   * @static
   * @param {string} str - String to convert
   * @returns {string} capitalisedStr
   */
  static stringToCapitalised(str) {
    if (typeof str !== 'string') {
      return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * stringToId
   *
   * @summary Convert a string into a form safe for use as an HTML id attribute.
   * @memberof GsUtils
   * @static
   * @param {string} str - String to convert
   * @returns {string} safeStr
   */
  static stringToId(str) {
    if (typeof str !== 'string') {
      return '';
    }

    // Note: "/" is a valid ID character in HTML5, but fails in querySelector.
    let safeStr = str
      .trim()
      .toLowerCase()
      .replaceAll(/([ /.,'"!()])+/g, '-')
      .replaceAll(/[-]{2,}/g, '-'); // --

    if (safeStr[safeStr.length - 1] === '-') {
      safeStr = safeStr.slice(0, -1);
    }

    return safeStr;
  }
}
