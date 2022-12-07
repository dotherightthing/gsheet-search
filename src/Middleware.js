/**
 * @file Middleware.gs
 * @summary Expose GS classes to:
 *  - GS Apps Script IDE, which accesses class methods via its 'Run' control
 *  - GsUi frontend, which accesses class methods via google.script.run callbacks
 */

/**
 * gsCacheClear
 *
 * @summary Calls serverside function from clientside function (GsUiDialog.cacheClear)
 * @returns {string} Success message
 */
function gsCacheClear() {
  return GsCache.clearCache('');
}

/**
 * gsSheetToJSON
 *
 * @summary Calls serverside function from clientside function (GsUiTypeahead.handleLoadClick)
 * @param {string} sheetTitle Sheet title
 * @returns {object} Sheet as JSON
 * @todo This needs to be called differently when the app is consumed as a library
 */
function gsSheetToJSON(sheetTitle) {
  return GsSheet.getInstance().sheetToJSON(sheetTitle);
}
