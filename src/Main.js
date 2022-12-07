/**
 * @file Main.gs
 * @summary Initialises the GS App.
 */

// global config settings

// these are the standalone settings
// when used as a library, the host project passes its own config into GsheetSearch.init()

const standaloneConfig = {
  // Link to an image such as the one on your organisation's website
  imageLogo: 'https://via.placeholder.com/500x138/fff/000/png?text=Logo',
  // Name of your organisation
  organisationName: 'Busytown',
  // Title for the bookmarked web app
  pageTitle: 'Gsheet Search',
  // One or more sheets in your Google spreadsheet
  sheets: [
    {
      // Title shown in tab at bottom of Google spreadsheet
      title: 'Names',
      // Prefix you use when setting named ranges (GsSheet1Search, GsSheet1Result, GsSheet1DisplayGroupA, GsSheet1DisplayGroupB, GsSheet1DisplayGroupC)
      namedRangePrefix: 'GsSheet1',
    },
  ],
  // Copy and paste SPREADSHEET_ID from the spreadsheet URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=0
  spreadsheetId: '1DBYIoppZpZ1db6Vvg2LTm3zKvMnq0bEKOzEKGFcEvk4',
  // Whether the search results should remain visible while changing sheets
  filtersFocusTypeahead: true,
};

// functions

/**
 * doGet
 *
 * @summary Called when the user loads the web app in a web browser. This autostarts the app.
 * @returns {string} - App template
 */
function doGet() {
  const appTemplate = init(standaloneConfig, true);

  return appTemplate;
}

/**
 * doGet
 *
 * @param {object} config - Config
 * @param {boolean} standalone - True if loaded directly, False if loaded as a library.
 * @returns {*} - HTML Template
 */
function init(config, standalone = false) {
  // hardcoded developer-only properties

  config.debug = false;
  config.fixedPositionIds = [];

  config.focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex="0"]:not(.dialog-tabtrap)',
  ];

  config.formId = 'search';
  config.radiosContainerId = 'data-sources';
  config.filterClass = 'filter';
  config.filtersContainerId = 'data-filters';
  config.typeaheadId = 'typeahead';
  config.pageTemplate = 'Search';

  // eslint-disable-next-line no-console
  console.log('Gsheet Search loaded as standalone: ', standalone, ', with config: ', config);

  // generate singleton instances up front while we have the config
  // so we don't need to keep passing it around
  // note: order is important
  GsUtils.getInstance(config);

  // store the config so that it can be accessed by instantiations in Middleware.js
  // which don't seem to be aware of prior instantiations.
  const cacheKey = 'config';
  GsCache.setCacheItem(cacheKey, config, true);

  return GsPage.getInstance(config).createHtmlTemplate();
}
