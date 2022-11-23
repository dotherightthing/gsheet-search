/**
 * @file Main.gs
 * @summary Initialises the GS App and creates global variables.
 */

// global config settings

console.log('Gsheet Search loaded');

let gsValidateInstance;
let gsCacheInstance;
let gsUtilsInstance;
const gsConfig = {
  debug: false,
  deploymentIds: {
    appsScriptEditor: '1_5vomwUsWKlMA07DtaWmGBJlup7M-kCIhcnVhH4PdLf_pgGNmqPTxoHj',
    head: 'AKfycbxDAU1hFDr2beTfsx9TkcIBqoUkIbfCgoKsCdDYsxwc',
    // pub: '',
  },
  imageFavicon: 'https://images.squarespace-cdn.com/content/v1/5509fa79e4b068c780a986a4/1439431242134-20WAGLYZ8SPU3VYP8K0E/favicon.png',
  imageLogo: 'http://images.squarespace-cdn.com/content/v1/5509fa79e4b068c780a986a4/1499595271907-XVPJW6WB8ZGN618V1154/layer3.png?format=500w',
  organisationName: 'Nocar Cargo',
  pageTitle: 'Gsheet Search',
  scriptIds: {
    app: '1_5vomwUsWKlMA07DtaWmGBJlup7M-kCIhcnVhH4PdLf_pgGNmqPTxoHj',
    // masterSpreadsheet: '',
  },
  sheetName: 'Names',
  tplFile: 'Search',
};

// functions

/**
 * doGet
 *
 * @summary Called when the user loads the web app in a web browser.
 * @param {object} config - Config
 * @returns {*} - HTML Template
 */
function doGet(config) {
  // when consumed as a library, an object is passed to this function
  // when tested directly, the default object is passed
  if (Object.prototype.hasOwnProperty.call(config, 'queryString')) { // default object
    config = gsConfig; // app config
  } else {
    // used as a library
    standalone = false;
  }

  console.log('Gsheet Search initialised standalone', standalone, 'with config', config);

  // classes that don't require multiple instances but do require configuration

  // used by other classes
  gsValidateInstance = new GsValidate();

  gsCacheInstance = new GsCache({
    debug: config.debug,
  });

  gsUtilsInstance = new GsUtils({
    deploymentIds: config.deploymentIds,
    scriptIds: config.scriptIds,
  });

  console.log('gsUtilsInstance.deploymentIds', gsUtilsInstance.deploymentIds);

  const page = new GsPage({
    imageFavicon: config.imageFavicon,
    imageLogo: config.imageLogo,
    organisationName: config.organisationName,
    pageTitle: config.pageTitle,
    tplFile: config.tplFile,
  });

  return page.template;
}
