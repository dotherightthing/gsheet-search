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
   * getNamedRange
   *
   * @memberof GsSheet
   * @static
   * @param {string} spreadsheetId Spreadsheet ID
   * @param {string} name Name
   * @returns {Range} namedRange
   */
  static getNamedRange(spreadsheetId, name) {
    let namedRange = {};
    const ss = SpreadsheetApp.openById(spreadsheetId);
    const namedRanges = ss.getNamedRanges();

    namedRanges.forEach((_namedRange) => {
      const namedRangeName = _namedRange.getName();
      if (namedRangeName.indexOf(name) !== -1) {
        namedRange = _namedRange.getRange();
      }
    });

    return namedRange;
  }

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
    const data = [];

    // GsSearchResult

    // Select Cell > Data > Named Ranges > Enter 'GsSearchResult' > Done
    const gsSearchResultHeader = GsSheet.getNamedRange(spreadsheetId, 'GsSearchResult');

    if (gsSearchResultHeader === null) {
      throw new Error('GsSheet.sheetToJSON cannot find a named range "GsSearchResult"');
    }

    dataRowValues.forEach((rowArray) => {
      const rowJson = {};

      rowArray.forEach((columnValue, c) => {
        rowJson[headerValues[c].toLowerCase()] = columnValue || '';
      });

      data.push(rowJson);
    });

    const dataTokenIdentifier = gsSearchResultHeader.getValue().trim().toLowerCase();

    let dataTokens = headerValues.map((val) => GsUtils.stringToId(val));
    dataTokens = dataTokens.filter((val) => (val !== dataTokenIdentifier));

    // const data = [
    //   {
    //     business: 'Andy Bee Cooking',
    //     abbr: 'ABC',
    //     pod: 'Bob',
    //     level: 10,
    //     number: 123,
    //     street: 'Main St',
    //     phone: '045678911'
    //     description: 'Produces vegan treats'
    //   },
    //   {
    //     business: 'Residential',
    //     abbr: 'EFG',
    //     pod: 'Mary',
    //     level: '',
    //     number: 4,
    //     street: 'The Crescent',
    //     phone: ''
    //     description: ''
    //   },
    // ];

    return {
      data,
      dataTokens,
      dataTokenIdentifier,
    };
  }

  /* Static methods */
}
