/**
 * @file GsPage.js
 */
class GsPage {
  /**
   * @class
   * @summary Properties and methods relating to the HTML templating.
   * @public
   * @param {object} config                    - Module configuration.
   * @param {string} config.imageLogo          - Image displayed at the bottom of the page and in the background.
   * @param {string} config.organisationName   - Used in web browser web browser page title.
   * @param {string} config.pageTemplate       - HTML template file.
   * @param {string} config.pageTitle          - Web browser page title.
   * @param {string} config.sheetResultHeader  - Column headers to use for results.
   * @param {string} config.sheetSearchHeaders - Column headers to search and filter by.
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      imageLogo,
      organisationName,
      pageTemplate,
      pageTitle,
      sheetResultHeader,
      sheetSearchHeaders,
    } = config;

    Object.assign(this, {
      config,
      imageLogo,
      organisationName,
      pageTemplate,
      pageTitle,
      sheetResultHeader,
      sheetSearchHeaders,
    });

    this.template = this.createHtmlTemplate(config);
  }

  /* Setters and Getters */

  /**
   * config
   *
   * @type {object}
   */
  get config() {
    return this._config;
  }

  set config(config) {
    this._config = GsValidate.validate(config, 'object', 'GsPage.config');
  }

  /**
   * imageLogo
   *
   * @type {string}
   */
  get imageLogo() {
    return this._imageLogo;
  }

  set imageLogo(imageLogo) {
    this._imageLogo = GsValidate.validate(imageLogo, 'string1', 'GsPage.imageLogo');
  }

  /**
   * organisationName
   *
   * @type {string}
   */
  get organisationName() {
    return this._organisationName;
  }

  set organisationName(organisationName) {
    this._organisationName = GsValidate.validate(organisationName, 'string1', 'GsPage.organisationName');
  }

  /**
   * pageTemplate
   *
   * @type {string}
   */
  get pageTemplate() {
    return this._pageTemplate;
  }

  set pageTemplate(pageTemplate) {
    this._pageTemplate = GsValidate.validate(pageTemplate, 'string1', 'GsPage.pageTemplate');
  }

  /**
   * pageTitle
   *
   * @type {string}
   */
  get pageTitle() {
    return this._pageTitle;
  }

  set pageTitle(pageTitle) {
    this._pageTitle = GsValidate.validate(pageTitle, 'string1', 'GsPage.pageTitle');
  }

  /* Instance methods */

  /**
   * addMetaTags
   *
   * @summary The app runs within a nested iframe. Add meta tags to the parent page.
   * @memberof GsPage
   * @param {object} tpl HtmlTemplate object
   * @returns {object} tpl - HtmlTemplate object
   * @see {@link https://developers.google.com/web/fundamentals/native-hardware/fullscreen/}
   * @see {@link https://appcropolis.com/apple-mobile-web-app-capable/}
   * @see {@link https://issuetracker.google.com/issues/176760976|Add to Home Screen icon for iphone}
   * @see {@link https://issuetracker.google.com/issues/213486384|htmlOutput - Add support for language attribute}
   * @see {@link https://yagisanatode.com/2021/08/18/how-to-isValidUser-specific-users-on-a-web-app-in-google-apps-scripts/}
   */
  addMetaTags(tpl) {
    const {
      organisationName,
      pageTitle,
    } = this;

    // allow the web app to be embedded in a page using an iframe (optional)
    tpl.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

    // <meta name="viewport" content="width=device-width, initial-scale=1">
    tpl.addMetaTag('viewport', 'width=device-width, initial-scale=1');

    // automatically open the app in fullscreen when it is launched from the iOS home screen (after 'Add to Home Screen')
    // <meta name="apple-mobile-web-app-capable" content="yes">
    tpl.addMetaTag('apple-mobile-web-app-capable', 'yes');

    tpl.setTitle(`${pageTitle} | ${organisationName}`);

    return tpl;
  }

  /**
   * createHtmlTemplate
   *
   * @summary Generates an HtmlTemplate object from the HTML file and the supplied template variables
   * @memberof GsPage
   * @returns {object} page Page
   * @see {@link https://developers.google.com/apps-script/guides/html/templates#code.gs_3}
   * @see {@link https://developers.google.com/apps-script/reference/html/html-template}
   * @see {@link https://www.youtube.com/watch?v=VyNJtjH84Aw}
   */
  createHtmlTemplate() {
    const {
      config,
      imageLogo,
      organisationName,
      pageTemplate,
      pageTitle,
    } = this;

    // HtmlTemplate object
    let tpl = HtmlService.createTemplateFromFile(pageTemplate);

    // create variables object
    const tplVariables = {
      tplConfig: JSON.stringify(config), // pass entire config to the frontend
      tplCompanyLogo: imageLogo,
      tplCompanyName: organisationName,
      tplPageTitle: pageTitle,
    };

    // merge variables object into the template object
    // tpl = { ...tpl, ...tplVariables };
    tpl = Object.assign(tpl, tplVariables);

    tpl = tpl.evaluate();
    tpl = this.addMetaTags(tpl);

    return tpl;
  }

  /* Static methods */

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @param {object} config Config
   * @returns {GsPage} instance of class
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
          throw new Error('GsPage.getInstance requires a configuration object the first time it is called and none was cached');
        }
      }

      this.instance = new GsPage(_config);
    }

    return this.instance;
  }

  /**
   * include
   *
   * @summary Import the specified file content into the current file, evaluating any variables that are passed in. Note: nested includes are not supported.
   * @memberof GsPage
   * @static
   * @param {string} filename - File name
   * @param {object} [tplVariables=null] Template variables
   * @returns {string} HTML file contents
   * @see {@link https://developers.google.com/apps-script/guides/html/best-practices#code.gs}
   */
  static include(filename, tplVariables = null) {
    let tpl;

    if (tplVariables !== null) {
      tpl = HtmlService.createTemplateFromFile(filename);

      // merge variables object into the template object
      tpl = Object.assign(tpl, tplVariables);

      // replace placeholders with values
      tpl = tpl.evaluate();
    } else {
      tpl = HtmlService.createHtmlOutputFromFile(filename);
    }

    return tpl.getContent().trim();
  }
}
