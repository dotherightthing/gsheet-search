/**
 * @file Gs.js
 */
class Gs {
  /**
   * @class
   * @summary Parent class.
   * @public
   */
  constructor() {
    // instantiate required classes, optionally passing on the config object
    this.gsValidateInstance = new GsValidate();
  }

  /* Getters and Setters */

  /**
   * gsValidateInstance
   *
   * @type {object}
   */
  get gsValidateInstance() {
    return this._gsValidateInstance;
  }

  set gsValidateInstance(gsValidateInstance) {
    this._gsValidateInstance = gsValidateInstance;
  }

  /* Instance methods */

  /* Static methods */
}
