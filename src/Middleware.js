/**
 * @file Middleware.gs
 * @summary Expose GS classes to:
 *  - GS Apps Script IDE, which accesses class methods via its 'Run' control
 *  - GsUi frontend, which accesses class methods via google.script.run callbacks
 */

/**
 * krmWriteToSheetFromRunFormObject
 *
 * @summary Calls serverside function from clientside function (GsUiTypeahead.handleLoadClick)
 * @returns {*} Sheet as JSON
 * @todo Get sheetName from the correct place
 */
function gsSheetToJSON() {
  return GsSheet.sheetToJSON('Names');
}
