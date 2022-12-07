/**
 * @file GsUi.js
 */
class GsUi {
  /**
   * @class
   * @summary UI helpers.
   * @public
   * @param {object} config                   - Module configuration.
   * @param {Array} config.focusableSelectors - UI elements which can be focussed by the user.
   */
  constructor(config = {}) {
    this.focusableSelector = config.focusableSelectors.join(', ');

    // subscribe to other module's events

    pubsub.subscribe([ 'domready' ], () => {
      this.enableActiveStates('body');
    });
  }

  /* Getters and Setters */

  /**
   * focusableSelector
   *
   * @type {string}
   */
  get focusableSelector() {
    return this._focusableSelector;
  }

  set focusableSelector(focusableSelector) {
    this._focusableSelector = GsValidate.validate(focusableSelector, 'string1', 'GsUi.focusableSelector');
  }

  /* Instance methods */

  /**
   * enableActiveStates
   *
   * @summary Fix for iOS which does not apply the active state by default, applied per-element for better performance
   * @memberof GsUi
   * @param {string} parentSelector Parent selector
   * @see {@link https://developers.google.com/web/fundamentals/design-and-ux/input/touch/#enabling_active_state_support_on_ios}
   * @see {@link http://stackoverflow.com/a/28771425}
   * @see {@link https://codepen.io/dotherightthingnz/pen/bGwaGmM}
   */
  enableActiveStates(parentSelector) {
    const {
      focusableSelector,
    } = this;

    if (/iP(hone|ad)/.test(window.navigator.userAgent)) {
      // focus event does not bubble
      const focusableSelectorElements = document.querySelectorAll(`${parentSelector} ${focusableSelector}`);
      const emptyFunction = () => { };

      focusableSelectorElements.forEach((focusableSelectorElement) => {
        focusableSelectorElement.addEventListener('touchstart', emptyFunction, false);
      });
    }
  }

  /* Static methods */

  /**
   * createCustomEvent
   *
   * @summary Create a synthetic event which can be triggered and which will then invoke the element's matching event listener
   * @memberof GsUi
   * @static
   * @param {string} eventName Event name
   * @returns {*} CustomEvent
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events}
   */
  static createCustomEvent(eventName) {
    return new CustomEvent(eventName, { bubbles: true, cancelable: true });
  }

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @memberof GsUi
   * @static
   * @param {object} config Config
   * @returns {GsUi} instance of class
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
          throw new Error('GsUi.getInstance requires a configuration object the first time it is called and none was cached');
        }
      }

      this.instance = new GsUi(_config);
    }

    return this.instance;
  }

  /**
   * log
   *
   * @summary Log a string to the console
   * @memberof GsUi
   * @static
   * @param {string} str String to log
   */
  static log(str) {
    console.log(str); // eslint-disable-line no-console
  }
}
