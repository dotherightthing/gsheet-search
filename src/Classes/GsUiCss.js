/**
 * @file GsUiCss.js
 */
class GsUiCss {
  /**
   * @class
   * @summary Manage dynamic CSS
   * @public
   * @param {object} config                  - Module configuration.
   * @param {Array}  config.fixedPositionIds - IDs of elements that use fixed positioning, used to generate CSS variables
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      fixedPositionIds,
    } = config;

    Object.assign(this, {
      fixedPositionIds,
    });

    // subscribe to other module's events

    pubsub.subscribe([ 'domready' ], () => {
      this.injectHeightVariables(); // handles any new elements added
    });

    pubsub.subscribe('windowLoad', () => {
      this.injectHeightVariables();
    });
  }

  /* Getters and Setters */

  /**
   * fixedPositionIds
   *
   * @type {Array}
   */
  get fixedPositionIds() {
    return this._fixedPositionIds;
  }

  set fixedPositionIds(fixedPositionIds) {
    this._fixedPositionIds = GsValidate.validate(fixedPositionIds, 'Array', 'GsUiCss.fixedPositionIds');
  }

  /* Instance methods */

  /**
   * injectHeightVariables
   *
   * @summary Store heights of fixed position elements
   */
  injectHeightVariables() {
    const {
      fixedPositionIds,
    } = this;

    const styleEl = document.getElementById('heights'); // <style></style>
    let cssVariables = '';

    fixedPositionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el !== null) {
        cssVariables += `
--height-fixed-${id}: ${el.offsetHeight / 16}rem;`;
      }
    });

    const styles = `

:root {
  ${cssVariables}
}
`;

    styleEl.innerHTML = styles;
  }

  /* Static methods */

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GsUiCss} instance of class
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
          throw new Error('GsUiCss.getInstance requires a configuration object the first time it is called and none was cached');
        }
      }

      this.instance = new GsUiCss(_config);
    }

    return this.instance;
  }
}
