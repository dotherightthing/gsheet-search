/**
 * @file GsPage.js
 */
class GsPage extends Gs {
  /**
   * @class
   * @summary Properties and methods relating to the HTML templating.
   * @public
   * @param {object} config                    - Module configuration.
   * @param {string} config.imageFavicon       - Image displayed when the page is bookmarked.
   * @param {string} config.imageLogo          - Image displayed at the bottom of the page and in the background.
   * @param {string} config.organisationName   - Web browser page title.
   * @param {string} config.pageTitle          - Web browser page title.
   * @param {string} config.sheetResultHeader  - Column headers to use for results.
   * @param {string} config.sheetSearchHeaders - Column headers to search and filter by.
   * @param {string} config.tplFile            - HTML template file.
   */
  constructor(config = {}) {
    super();

    // select the relevant arguments from the config object passed in
    this.imageFavicon = config.imageFavicon;
    this.imageLogo = config.imageLogo;
    this.organisationName = config.organisationName;
    this.pageTitle = config.pageTitle;
    this.sheetResultHeader = config.sheetResultHeader;
    this.sheetSearchHeaders = config.sheetSearchHeaders;
    this.tplFile = config.tplFile;

    this.template = this.createHtmlTemplate(config);
  }

  /* Setters and Getters */

  /**
   * imageFavicon
   *
   * @type {string}
   */
  get imageFavicon() {
    return this._imageFavicon;
  }

  set imageFavicon(imageFavicon) {
    this._imageFavicon = this.gsValidateInstance.validate(imageFavicon, 'string1', 'GsPage.imageFavicon');
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
    this._imageLogo = this.gsValidateInstance.validate(imageLogo, 'string1', 'GsPage.imageLogo');
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
    this._organisationName = this.gsValidateInstance.validate(organisationName, 'string1', 'GsPage.organisationName');
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
    this._pageTitle = this.gsValidateInstance.validate(pageTitle, 'string1', 'GsPage.pageTitle');
  }

  /**
   * tplFile
   *
   * @type {string}
   */
  get tplFile() {
    return this._tplFile;
  }

  set tplFile(tplFile) {
    this._tplFile = this.gsValidateInstance.validate(tplFile, 'string1', 'GsPage.tplFile');
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
      imageFavicon,
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

    tpl.setFaviconUrl(imageFavicon);

    return tpl;
  }

  /**
   * createHtmlTemplate
   *
   * @summary Generates an HtmlTemplate object from the HTML file and the supplied template variables
   * @memberof GsPage
   * @param {object} config Config
   * @returns {object} provided page in the urlquery '?page=[PAGEID]' or main index page
   * @see {@link https://developers.google.com/apps-script/guides/html/templates#code.gs_3}
   * @see {@link https://developers.google.com/apps-script/reference/html/html-template}
   * @see {@link https://www.youtube.com/watch?v=VyNJtjH84Aw}
   */
  createHtmlTemplate(config) {
    const {
      imageLogo,
      organisationName,
      pageTitle,
      tplFile,
    } = this;

    // HtmlTemplate object
    let tpl = HtmlService.createTemplateFromFile(tplFile);

    // create variables object
    const tplVariables = {
      tplConfig: JSON.stringify(config),
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
