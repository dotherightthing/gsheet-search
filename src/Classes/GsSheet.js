/**
 * @file GsSheet.js
 */
class GsSheet {
  /**
   * @class
   * @summary Properties and methods relating to querying of the spreadsheet.
   * @param {object} config               - Module configuration.
   */

  /* Setters and Getters */

  /* Instance methods */

  /* Static methods */

  /**
   * getSheet
   *
   * @summary Get spreadsheet sheet (if the user is allowed to access it).
   * @memberof GsSheet
   * @static
   * @param {string} spreadsheetId Spreadsheet ID
   * @param {string} sheetName Sheet name
   * @returns {object} Sheet
   */
  static getSheet(spreadsheetId, sheetName) {
    let sheet = null;

    try {
      sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }

    return sheet;
  }

  /**
   * sheetToJSON
   *
   * @summary Convert spreadsheet to a JSON representation
   * @memberof GsSheet
   * @static
   * @param {object} spreadsheet Spreadsheet
   * @returns {object} Sheet
   */
  static sheetToJSON(spreadsheet) {
    const {
      id: spreadsheetId,
      sheet: sheetName,
    } = spreadsheet;

    const sheet = GsSheet.getSheet(spreadsheetId, sheetName);

    // getRange(row, column, number of rows, number of columns)
    const headersRow = sheet.getRange(1, 1, 1, sheet.getLastColumn());
    const headerValues = headersRow.getValues()[0];
    const dataRows = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
    const dataRowValues = dataRows.getValues(); // arrays, each one represents a row of columns
    const rowsArray = [];

    dataRowValues.forEach((rowArray) => {
      const rowJson = {};

      rowArray.forEach((columnValue, c) => {
        rowJson[headerValues[c].toLowerCase()] = columnValue || '';
      });

      rowsArray.push(rowJson);
    });

    // const rowsArray = [
    //   {
    //     business: 'Andy Bee Cooking',
    //     abbr: 'ABC',
    //     name: 'Bob',
    //     address: 'Main St',
    //   },
    //   {
    //     business: 'Easy Flowing Guidance',
    //     abbr: 'EFG',
    //     name: 'Mary',
    //     address: 'The Crescent',
    //   },
    // ];

    return rowsArray;
  }

  /* Static methods */
}
