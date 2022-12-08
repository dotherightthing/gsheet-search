/**
 * @file Middleware.gs
 * @summary Expose GS classes to:
 *  - Spreadsheet / container-bound Apps Script project, which consumes GS as a library.
 * @see {@link https://github.com/dotherightthing/gsheet-search/blob/main/demo}
 */

/* eslint-disable no-unused-vars */
/* global cbConfig:writable */

/**
 * doGet
 *
 * @summary Function which runs when the web app is visited in a web browser. Do not edit.
 * @returns {*} - The GsheetSearch library will load the web page.
 */
function doGet() {
  const appTemplate = GsheetSearch.init(cbConfig, false);

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
