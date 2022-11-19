/**
 * @file Main.gs
 * @summary Initialises the GS App and creates global variables.
 */

// global config settings

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

// classes that don't require multiple instances but do require configuration

// used by other classes
const gsValidateInstance = new GsValidate();

const gsCacheInstance = new GsCache({
  debug: gsConfig.debug,
});

const gsUtilsInstance = new GsUtils({
  deploymentIds: gsConfig.deploymentIds,
  scriptIds: gsConfig.scriptIds,
});

// functions

/**
 * doGet
 *
 * @summary Called when the user loads the web app in a web browser.
 * @returns {*} - HTML Template
 */
function doGet() {
  const page = new GsPage({
    imageFavicon: gsConfig.imageFavicon,
    imageLogo: gsConfig.imageLogo,
    organisationName: gsConfig.organisationName,
    pageTitle: gsConfig.pageTitle,
    tplFile: gsConfig.tplFile,
  });

  return page.template;
}
