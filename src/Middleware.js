/**
 * @file Middleware.gs
 * @summary Expose GS classes to:
 *  - GS Apps Script IDE, which accesses class methods via its 'Run' control
 *  - GsUi frontend, which accesses class methods via google.script.run callbacks
 */

/**
 * gsSheetToJSON
 *
 * @summary Calls serverside function from clientside function (GsUiTypeahead.handleLoadClick)
 * @param {object} config Config
 * @param {string} sheetTitle Sheet title
 * @returns {object} Sheet as JSON
 * @todo This needs to be called differently when the app is consumed as a library
 */
function gsSheetToJSON(config, sheetTitle) {
  // instantiate required classes, optionally passing on the config object
  const gsSheetInstance = new GsSheet(config);

  return gsSheetInstance.sheetToJSON(sheetTitle);
}
