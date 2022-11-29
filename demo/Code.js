const gsConfig = {
  // Link to an image such as the one on your organisation's website
  imageLogo: 'https://via.placeholder.com/500x138/fff/000/png?text=Logo',
  // Name of your organisation
  organisationName: 'Default',
  // Title for the bookmarked web app
  pageTitle: 'Gsheet Search',
  // One or more sheets in your Google spreadsheet
  sheets: [
    {
      // Title shown in tab at bottom of Google spreadsheet
      title: 'Sheet1',
      // Prefix you use when setting named ranges (GsSheet1Search, GsSheet1Result, GsSheet1DisplayGroupA, GsSheet1DisplayGrouB, GsSheet1DisplayGroupC)
      namedRangePrefix: 'GsSheet1',
    },
  ],
  // Copy and paste SPREADSHEET_ID from the spreadsheet URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=0
  spreadsheetId: 'SPREADSHEET_ID',
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
  return GsheetSearch.doGet(gsConfig);
}

/**
 * gsSheetToJSON
 *
 * @summary Function which runs whenever a sheet is selected (including when the app first loads). Do not edit.
 * @param {object} config Configuration object
 * @param {string} sheetTitle Sheet title
 * @returns {object} The spreadsheet in JSON format
 */
function gsSheetToJSON(config, sheetTitle) {
  return GsheetSearch.gsSheetToJSON(config, sheetTitle);
}
