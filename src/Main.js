/**
 * @file Main.gs
 * @summary Initialises the GS App and creates global variables.
 */

// global config settings

// these are the standalone settings
// when used as a library, the host project passes its own config into GsheetSearch.doGet()

let standalone = true;

const gsConfig = {
  imageFavicon: 'https://images.squarespace-cdn.com/content/v1/5509fa79e4b068c780a986a4/1439431242134-20WAGLYZ8SPU3VYP8K0E/favicon.png', // TODO use script property
  imageLogo: 'http://images.squarespace-cdn.com/content/v1/5509fa79e4b068c780a986a4/1499595271907-XVPJW6WB8ZGN618V1154/layer3.png?format=500w', // TODO use script property
  organisationName: 'Nocar Cargo', // TODO use script property
  pageTitle: 'Gsheet Search', // TODO use spreadsheet title
  sheets: [
    {
      title: 'Names',
      namedRangePrefix: 'GsSheet1',
    },
    {
      title: 'Door codes',
      namedRangePrefix: 'GsSheet2',
    },
    {
      title: 'Terms of service',
      namedRangePrefix: 'GsSheet3',
    },
  ],
  spreadsheetId: '1n4QOxfS3hDe3v9KKZt3HObIQZpQnk2sKT-GFcMXHjOc',
  filtersFocusTypeahead: true,
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
    // used as a library, config is passed in
    standalone = false;
  }

  // hardcoded developer-only properties
  config.debug = false;
  config.fixedPositionIds = [];
  config.formId = 'search';
  config.radiosContainerId = 'data-sources';
  config.filterClass = 'filter';
  config.filtersContainerId = 'data-filters';
  config.typeaheadId = 'typeahead';
  config.tplFile = 'Search';

  console.log('Gsheet Search loaded as standalone: ', standalone, ', with config: ', config);

  const page = new GsPage(config);

  return page.template;
}
