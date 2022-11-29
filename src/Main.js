/**
 * @file Main.gs
 * @summary Initialises the GS App and creates global variables.
 */

// global config settings

// these are the standalone settings
// when used as a library, the host project passes its own config into GsheetSearch.doGet()

let standalone = true;

const gsConfig = {
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
 * @summary Called when the user loads the web app in a web browser.
 * @param {object} config - Config
 * @returns {*} - HTML Template
 */
function doGet(config) {
  // when consumed as a library, an object is passed to this function
  // when tested directly, the default object is passed
  if (Object.prototype.hasOwnProperty.call(config, 'queryString')) { // default object
    // eslint-disable-next-line no-param-reassign
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

  // eslint-disable-next-line no-console
  console.log('Gsheet Search loaded as standalone: ', standalone, ', with config: ', config);

  const page = new GsPage(config);

  return page.template;
}
