/**
 * @file GsUi.js
 */
class GsUi {
  /**
   * @class
   * @summary UI helpers.
   * @public
   */
  constructor() {
    // private settings
    this.focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]:not(.dialog-tabtrap)';

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
    this._focusableSelector = gsValidateInstance.validate(focusableSelector, 'string1', 'GsUi.focusableSelector');
  }

  /* Instance methods */

  /**
   * createCustomEvent
   *
   * Create a synthetic event which can be triggered
   * and which will then invoke the element's matching event listener
   *
   * @param {string} eventName Event name
   * @returns {*} CustomEvent
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events}
   */
  createCustomEvent(eventName) {
    return new CustomEvent(eventName, { bubbles: true, cancelable: true });
  }

  /**
   * debounce
   *
   * @summary Debounce methods do not execute when invoked. Instead, they wait for a predetermined time before executing.
   *  If the same method is called again, the previous is cancelled and the timer restarts.
   * @param {Function} callback The function to execute after the debounce time
   * @param {number} wait The amount of time to wait
   * @param {boolean} immediate Fire immediately
   * @returns {Function} The debounced function
   * @see {@link https://www.freecodecamp.org/news/debounce-javascript-tutorial-how-to-make-your-js-wait-up/}
   * @see {@link https://davidwalsh.name/javascript-debounce-function}
   */
  debounce(callback, wait, immediate) {
    let timeout;

    return (...args) => {
      const context = this;
      const later = () => {
        timeout = null;

        if (!immediate) {
          callback.apply(context, args);
        }
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        callback.apply(context, args);
      }
    };
  }

  /**
   * enableActiveStates
   *
   * @summary Fix for iOS which does not apply the active state by default, applied per-element for better performance
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

  /**
   * log
   *
   * @summary Log a string to the console
   * @param {string} str String to log
   */
  log(str) {
    console.log(str); // eslint-disable-line no-console
  }

  /**
   * stringToId
   *
   * @summary Convert a string into a form safe for use as an HTML id attribute.
   * @param {string} str - String to convert
   * @returns {string} safeStr
   */
  stringToId(str) {
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