/**
 * @file GsUiLoader.js
 */
class GsUiLoader {
  /**
   * @class
   * @summary Toggle a loading animation
   * @public
   * @param {object} config                  - Module configuration.
   * @param {string} config.loaderComponentClass   - Class selector of the loader element
   * @param {string} config.loaderDataAttr         - Data attribute used to manage state
   * @param {string} config.loaderDescriptionClass - Class selector of the loader description
   * @param {number} config.loaderHideDelay        - Number of milliseconds to wait before hiding the loader
   * @param {string} config.loaderParentDataAttr   - Data attribute used to manage state of parent element
   * @param {string} config.loaderRunLoaderId      - ID selector of the loader component that appears in the overlay
   * @param {string} config.loaderRunSaverId       - ID selector of the loader component that appears save status bar
   * @param {string} config.loaderTitleClass       - Class selector of the loader title
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      loaderComponentClass,
      loaderDataAttr,
      loaderDescriptionClass,
      loaderHideDelay,
      loaderParentDataAttr,
      loaderRunLoaderId,
      loaderRunSaverId,
      loaderTitleClass,
    } = config;

    Object.assign(this, {
      loaderComponentClass,
      loaderDataAttr,
      loaderDescriptionClass,
      loaderHideDelay,
      loaderParentDataAttr,
      loaderRunLoaderId,
      loaderRunSaverId,
      loaderTitleClass,
    });

    // publish events for other modules to subscribe to

    // subscribe to other module's events

    // Run form

    pubsub.subscribe('selectForm/defaultRunSelected', () => {
      this.show(loaderRunLoaderId, false);
    });

    pubsub.subscribe('runForm/loading', () => {
      this.show(loaderRunLoaderId, true, 'Loading runs...');
    });

    pubsub.subscribe('runForm/loaded', () => {
      this.show(loaderRunLoaderId, 'complete', 'Runs loaded.');
    });

    pubsub.subscribe('runForm/loaderror', (data) => {
      this.show(loaderRunLoaderId, 'error', 'Runs could not be loaded.', data);
    });

    // Run form

    pubsub.subscribe('runForm/saving', () => {
      this.show(loaderRunSaverId, true, 'Saving changes...');
    });

    pubsub.subscribe('runForm/saved', () => {
      this.show(loaderRunSaverId, 'complete', 'Saved changes.');
    });

    pubsub.subscribe('runForm/saveerror', (data) => {
      this.show(loaderRunSaverId, false, 'Changes could not be saved.', data);
    });
  }

  /* Getters and Setters */

  /**
   * loaderComponentClass
   *
   * @type {string}
   */
  get loaderComponentClass() {
    return this._loaderComponentClass;
  }

  set loaderComponentClass(loaderComponentClass) {
    this._loaderComponentClass = GsValidate.validate(loaderComponentClass, 'string1', 'GsUiLoader.loaderComponentClass');
  }

  /**
   * loaderDataAttr
   *
   * @type {string}
   */
  get loaderDataAttr() {
    return this._loaderDataAttr;
  }

  set loaderDataAttr(loaderDataAttr) {
    this._loaderDataAttr = GsValidate.validate(loaderDataAttr, 'string1', 'GsUiLoader.loaderDataAttr');
  }

  /**
   * loaderDescriptionClass
   *
   * @type {string}
   */
  get loaderDescriptionClass() {
    return this._loaderDescriptionClass;
  }

  set loaderDescriptionClass(loaderDescriptionClass) {
    this._loaderDescriptionClass = GsValidate.validate(loaderDescriptionClass, 'string1', 'GsUiLoader.loaderDescriptionClass');
  }

  /**
   * loaderHideDelay
   *
   * @type {number}
   */
  get loaderHideDelay() {
    return this._loaderHideDelay;
  }

  set loaderHideDelay(loaderHideDelay) {
    this._loaderHideDelay = GsValidate.validate(loaderHideDelay, 'number', 'GsUiLoader.loaderHideDelay');
  }

  /**
   * loaderParentDataAttr
   *
   * @type {string}
   */
  get loaderParentDataAttr() {
    return this._loaderParentDataAttr;
  }

  set loaderParentDataAttr(loaderParentDataAttr) {
    this._loaderParentDataAttr = GsValidate.validate(loaderParentDataAttr, 'string1', 'GsUiLoader.loaderParentDataAttr');
  }

  /**
   * loaderRunLoaderId
   *
   * @type {string}
   */
  get loaderRunLoaderId() {
    return this._loaderRunLoaderId;
  }

  set loaderRunLoaderId(loaderRunLoaderId) {
    this._loaderRunLoaderId = GsValidate.validate(loaderRunLoaderId, 'string1', 'GsUiLoader.loaderRunLoaderId');
  }

  /**
   * loaderRunSaverId
   *
   * @type {string}
   */
  get loaderRunSaverId() {
    return this._loaderRunSaverId;
  }

  set loaderRunSaverId(loaderRunSaverId) {
    this._loaderRunSaverId = GsValidate.validate(loaderRunSaverId, 'string1', 'GsUiLoader.loaderRunSaverId');
  }

  /**
   * loaderTitleClass
   *
   * @type {string}
   */
  get loaderTitleClass() {
    return this._loaderTitleClass;
  }

  set loaderTitleClass(loaderTitleClass) {
    this._loaderTitleClass = GsValidate.validate(loaderTitleClass, 'string1', 'GsUiLoader.loaderTitleClass');
  }

  /* Instance methods */

  /**
   * show
   *
   * Hide or show the loader (icon visibility is set in CSS).
   *
   * @param {string} loaderId Loader ID (loaderRunLoaderId or loaderRunSaverId depending on context)
   * @param {string} isLoading Loading state (true|false|error)
   * @param {string} [title] Visible title
   * @param {string} [description] Visible description
   * @see {@link https://loading.io/css/}
   */
  show(loaderId, isLoading, title = null, description = null) {
    const {
      loaderComponentClass,
      loaderDataAttr,
      loaderDescriptionClass,
      loaderHideDelay = 0,
      loaderParentDataAttr,
      loaderTitleClass,
    } = this;

    // <div id="ID" data-is-loading="false" class="loader">
    //   <div class="loader-icon">
    //     <div class="is-loading"></div>
    //     <div class="is-loading-error"></div>
    //   </div>
    //   <div class="loader-title"></div>
    //   <div class="loader-description small"></div>
    // </div>

    const loaderEl = document.getElementById(loaderId);
    const showEl = loaderEl.classList.contains(loaderComponentClass) ? loaderEl : document.querySelector(`#${loaderId} .${loaderComponentClass}`);
    const titleEl = document.querySelector(`#${loaderId} .${loaderTitleClass}`);
    const descriptionEl = document.querySelector(`#${loaderId} .${loaderDescriptionClass}`);
    const titleText = (title !== null) ? title : '';
    const descriptionText = (description !== null) ? description : '';

    titleEl.innerText = titleText;
    descriptionEl.innerText = descriptionText;

    loaderEl.setAttribute(loaderDataAttr, isLoading);
    loaderEl.parentElement.setAttribute(loaderParentDataAttr, isLoading);

    if ((isLoading === true) || (isLoading === 'error')) {
      // show
      showEl.removeAttribute('hidden');

      if (loaderId === 'dates-loader') {
        loaderEl.previousElementSibling.setAttribute('hidden', true);
      }
    } else { // false || complete
      // hide
      setTimeout(() => {
        showEl.setAttribute('hidden', true);

        if (loaderId === 'dates-loader') {
          loaderEl.previousElementSibling.removeAttribute('hidden');
        }
      }, loaderHideDelay);
    }
  }

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GsUiLoader} instance of class
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
          throw new Error('GsUiLoader.getInstance requires a configuration object the first time it is called and none was cached');
        }
      }

      this.instance = new GsUiLoader(_config);
    }

    return this.instance;
  }
}
