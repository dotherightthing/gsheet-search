/**
 * @file Main.gs
 * @summary Initialises the GS App and creates global variables.
 */

// global config settings

const gsConfig = {
  sheetName: 'Names',
  spreadsheetId: '1n4QOxfS3hDe3v9KKZt3HObIQZpQnk2sKT-GFcMXHjOc',
};

// classes that don't require multiple instances but do require configuration

const gsUtilsInstance = new GsUtils({
  deploymentIds: {
    appsScriptEditor: '1_5vomwUsWKlMA07DtaWmGBJlup7M-kCIhcnVhH4PdLf_pgGNmqPTxoHj',
    head: 'AKfycbxDAU1hFDr2beTfsx9TkcIBqoUkIbfCgoKsCdDYsxwc',
    // pub: '',
  },
  scriptIds: {
    app: '1_5vomwUsWKlMA07DtaWmGBJlup7M-kCIhcnVhH4PdLf_pgGNmqPTxoHj',
    // testSpreadsheet: '',
    // masterSpreadsheet: '',
  },
  spreadsheetIds: {
    master: '1n4QOxfS3hDe3v9KKZt3HObIQZpQnk2sKT-GFcMXHjOc',
    // test: '',
  },
});

const gsSheetInstance = new GsSheet({
  sheetName: gsConfig.sheetName,
  spreadsheetId: gsConfig.spreadsheetId,
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
    imageFavicon: 'https://images.squarespace-cdn.com/content/v1/5509fa79e4b068c780a986a4/1439431242134-20WAGLYZ8SPU3VYP8K0E/favicon.png',
    imageLogo: 'http://images.squarespace-cdn.com/content/v1/5509fa79e4b068c780a986a4/1499595271907-XVPJW6WB8ZGN618V1154/layer3.png?format=500w',
    organisationName: 'Nocar Cargo',
    pageTitle: 'POD Search',
    tplFile: 'Search',
  });

  return page.template;
}
