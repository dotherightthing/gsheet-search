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
 * @param {object} e Event object containing information about any request parameters.
 * @returns {*} - The GsheetSearch library will load the web page.
 * @example <https://script.google.com/.../dev>
 * // returns app
 * @example <https://script.google.com/.../dev/json>
 * // returns error message
 * @example <https://script.google.com/.../dev/json/names>
 * // returns Names sheet in JSON format
 */
function doGet(e) {
  // e.parameter.format
  // https://script.google.com/.../dev?format=json&sheet=names

  // e.pathInfo
  // https://script.google.com/.../dev/json/names
  // https://script.google.com/.../dev/json/codes
  // https://script.google.com/.../dev/json/terms

  if (e.pathInfo) {
    const [ json, sheetParam ] = e.pathInfo.split('/');

    if (json) {
      const sheetsMap = new Map([
        [ 'names', 'Names' ],
        [ 'codes', 'Door Codes' ],
        [ 'terms', 'Terms of Service' ],
      ]);

      let content = {};

      if (sheetParam) {
        const sheetName = sheetsMap.get(sheetParam);
        content = GsheetSearch.gsSheetToJSON(sheetName);
      } else {
        const sheetsMapHelp = [];

        sheetsMap.forEach((value, key) => {
          sheetsMapHelp.push({
            sheet: value,
            endpoint: `/json/${key}`,
          });
        });

        content = {
          error: 'Please include a sheet endpoint in the URL',
          examples: sheetsMapHelp,
        };
      }

      return ContentService.createTextOutput(
        JSON.stringify(content),
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }

  // https://script.google.com/.../dev

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
