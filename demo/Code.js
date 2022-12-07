/**
 * @file Code.gs
 * @summary Code file to use with a container-bound (spreadsheet attached) Apps Script project.
 * @see {@link https://github.com/dotherightthing/gsheet-search/blob/main/demo}
 */

const hostConfig = {
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

// ----------------------------
// Do not edit below this line.
// ----------------------------

/**
 * doGet
 *
 * @summary Function which runs when the web app is visited in a web browser. Do not edit.
 * @returns {*} - The GsheetSearch library will load the web page.
 */
function doGet() {
  const appTemplate = GsheetSearch.init(hostConfig, false);

  return appTemplate;
}

/**
 * gsCacheClear
 *
 * @summary Function which runs when the clear cache button is clicked. Do not edit.
 * @returns {*} Calls the function of the same name in the GsheetSearch library
 */
function gsCacheClear() {
  return GsheetSearch.gsCacheClear();
}

/**
 * gsSheetToJSON
 *
 * @summary Function which runs when a sheet is selected (including when the app first loads). Do not edit.
 * @param {string} sheetTitle Sheet title
 * @returns {object} The spreadsheet in JSON format
 */
function gsSheetToJSON(sheetTitle) {
  return GsheetSearch.gsSheetToJSON(sheetTitle);
}
