/**
 * @file GsUtils.js
 */
class GsUtils extends Gs {
  /**
   * @class
   * @summary Utility methods.
   * @public
   */

  /* Setters and Getters */

  /* Instance methods */

  /* Static methods */

  /**
   * classFactory
   *
   * @summary Create an instance of a class using the Factory Abstract pattern.
   * @memberof GsUtils
   * @static
   * @param {string} className - Name of class to create an instance of
   * @param {object} config - Parameters required by class constructor
   * @returns {*} Instance of the specified class
   * @see {@link https://stackoverflow.com/a/73945595}
   */
  static classFactory(className, config) {
    const classMap = new Map([
      [ 'GsPage', GsPage ],
    ]);

    const Class = classMap.get(className, config);

    return new (Class)(config);
  }

  /**
   * classInstanceToObject
   *
   * @summary A class instance can be passed from the backend to the frontend via template parameters.
   *  However once on the frontend it appears to lose contact with its parent class.
   *  This means that its properties can't be accessed because the class setter has prefixed them with underscores.
   * @memberof GsUtils
   * @static
   * @param {*} classInstance - classInstance to convert
   * @returns {object} Object
   */
  static classInstanceToObject(classInstance) {
    const { ...objWithUnderscores } = classInstance;
    const keys = Object.keys(objWithUnderscores);
    const obj = {};

    // remove leading underscores added by the class setters
    keys.forEach((key) => {
      const objKey = key.replace('_', ''); // replaces first/leading underscore
      obj[objKey] = objWithUnderscores[key];
    });

    // return an object for use on the frontend
    return obj;
  }

  /**
   * objectToClassInstance
   *
   * @summary Caching an instance converts it into an object. Convert it back into an instance of a class.
   * @memberof GsUtils
   * @static
   * @param {object} obj - Object to convert
   * @param {string} className - Name of class to create an instance of
   * @returns {*} Instance of the specified class
   */
  static objectToClassInstance(obj, className) {
    const keys = Object.keys(obj);
    const config = {};

    // remove leading underscores added by the class setters
    keys.forEach((key) => {
      const configKey = key.replace('_', ''); // replaces first/leading underscore
      config[configKey] = obj[key];
    });

    const instance = GsUtils.classFactory(className, config);

    // return a new instance that has access to class methods and properties
    return instance;
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
