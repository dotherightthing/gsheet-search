/**
 * @file GsSheet.js
 */
class GsSheet {
  /**
   * @class
   * @summary Properties and methods relating to querying of the spreadsheet.
   * @param {object} config               - Module configuration.
   * @param {Array}  config.sheets        - Properties relating to a sheet within a spreadsheet
   * @param {string} config.spreadsheetId - ID of a spreadsheet which contains sheets
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      sheets,
      spreadsheetId,
    } = config;

    Object.assign(this, {
      sheets,
      spreadsheetId,
    });
  }

  /* Setters and Getters */

  /**
   * sheets
   *
   * @type {Array}
   */
  get sheets() {
    return this._sheets;
  }

  set sheets(sheets) {
    this._sheets = GsValidate.validate(sheets, 'Array', 'GsSheet.sheets');
  }

  /**
   * spreadsheetId
   *
   * @type {string}
   */
  get spreadsheetId() {
    return this._spreadsheetId;
  }

  set spreadsheetId(spreadsheetId) {
    this._spreadsheetId = GsValidate.validate(spreadsheetId, 'string1', 'GsSheet.spreadsheetId');
  }

  /* Instance methods */

  /**
   * getNamedRange
   *
   * @summary Get the range (on any sheet) referenced to by a named range in a spreadsheet.
   * @memberof GsSheet
   * @param {string} name Name
   * @returns {Range} namedRange
   */
  getNamedRange(name) {
    const {
      spreadsheetId,
    } = this;

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
   * sheetToJSON
   *
   * @summary Convert spreadsheet to a JSON representation
   * @memberof GsSheet
   * @param {string} sheetTitle Sheet title
   * @returns {object} Sheet
   */
  sheetToJSON(sheetTitle) {
    const {
      sheets,
      spreadsheetId,
    } = this;

    // read from cache if there

    const sheetTitleSafe = GsUtils.stringToId(sheetTitle);
    const cacheKey = `${sheetTitleSafe}-${spreadsheetId}`;
    let json = GsCache.getCacheItem(cacheKey);

    if (GsValidate.isObject(json)) {
      return json;
    }

    // else create then write to cache

    const sheetObj = sheets.filter((sheet) => (sheet.title === sheetTitle));

    if (typeof sheetObj === 'undefined') {
      throw new Error(`sheets object does not contain an entry with title "${sheetTitle}"`);
    }

    const {
      namedRangePrefix,
    } = sheetObj[0];

    // an admin dialog would be best, but for now we'll use named ranges

    const searchRange = this.getNamedRange(`${namedRangePrefix}Search`);
    const sheet = GsSheet.getSheet(spreadsheetId, sheetTitle);

    const dataRowStart = searchRange.getRow() + 1;
    const dataColStart = searchRange.getColumn();
    const dataColEnd = searchRange.getLastColumn();
    const dataRowEnd = sheet.getLastRow() - 1;

    let dataTokens = this.getNamedRangeValues(`${namedRangePrefix}Search`).map((val) => GsUtils.stringToId(val));
    const dataTokensDisplayGroupA = this.getNamedRangeValues(`${namedRangePrefix}DisplayGroupA`).map((val) => GsUtils.stringToId(val));
    const dataTokensDisplayGroupB = this.getNamedRangeValues(`${namedRangePrefix}DisplayGroupB`).map((val) => GsUtils.stringToId(val));
    const dataTokensDisplayGroupC = this.getNamedRangeValues(`${namedRangePrefix}DisplayGroupC`).map((val) => GsUtils.stringToId(val));
    const dataTokenIdentifier = this.getNamedRangeValues(`${namedRangePrefix}Result`).map((val) => GsUtils.stringToId(val))[0];

    // getRange(row, column, number of rows, number of columns)
    const dataRows = sheet.getRange(dataRowStart, dataColStart, dataRowEnd, dataColEnd);
    const dataRowValues = dataRows.getValues(); // arrays, each one represents a row of columns
    const data = [];

    // generate the complete data set
    dataRowValues.forEach((rowArray) => {
      const rowJson = {};

      rowArray.forEach((columnValue, c) => {
        // header = value
        rowJson[dataTokens[c]] = columnValue || '';
      });

      data.push(rowJson);
    });

    // exclude the results column from the searchable columns
    dataTokens = dataTokens.filter((val) => (val !== dataTokenIdentifier));

    json = {
      data, // [ { header1: 'row1Value', header2: 'row1Value', header3: 'row1Value', header4: 'row1Value', header5: 'row1Value' }, { header1: 'row2Value', ... } ]
      dataTokens, // [ 'header1', 'header2', 'header3', 'header4', 'header5' ] - order ok
      dataTokenIdentifier, // 'header2'
      dataTokensDisplayGroupA, // [ 'header1' ]
      dataTokensDisplayGroupB, // [ 'header3', 'header4' ]
      dataTokensDisplayGroupC, // [ 'header5' ]
    };

    const obj = GsValidate.validate(json, 'object', 'GsSheet.sheetToJSON');

    GsCache.setCacheItem(cacheKey, obj);

    return json;
  }

  /**
   * getNamedRangeValues
   *
   * @memberof GsSheet
   * @param {string} name Name
   * @param {boolean} onlyFirst Whether to return only the first value
   * @returns {Array} namedRangeValues
   */
  getNamedRangeValues(name, onlyFirst = false) {
    const namedRange = this.getNamedRange(name);
    let namedRangeValues = [];

    if (typeof namedRange.getValues === 'function') {
      namedRangeValues = namedRange.getValues().flat(); // eslint-disable-line prefer-destructuring
      namedRangeValues = namedRangeValues.filter((rangeItem) => rangeItem !== '');
    }

    return onlyFirst ? namedRangeValues[0] : namedRangeValues;
  }

  /**
   * getSheet
   *
   * @summary Get spreadsheet sheet (if the user is allowed to access it).
   * @memberof GsSheet
   * @static
   * @param {string} spreadsheetId Spreadsheet ID
   * @param {string} sheetTitle Sheet title
   * @returns {object} Sheet
   */
  static getSheet(spreadsheetId, sheetTitle) {
    let sheet = null;

    try {
      sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetTitle);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }

    if (sheet === null) {
      throw new Error(`"${sheetTitle}" does not appear to exist in your spreadsheet (https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=0).`);
    }

    return sheet;
  }

  /* Static methods */

  /**
   * getInstance
   *
   * @summary Note: this refers to class instance in prototype methods and class constructor in static methods.
   * @memberof GsSheet
   * @static
   * @param {object} config Config
   * @returns {GsSheet} instance of class
   * @see {@link https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927}
   * @see {@link https://stackoverflow.com/a/50285439}
   */
  static getInstance(config) {
    let _config = config;

    if (!this.instance) {
      if (typeof _config === 'undefined') {
        const cacheKey = 'config';
        const cachedConfig = GsCache.getCacheItem(cacheKey, true);

        if (GsValidate.isObject(cachedConfig)) {
          _config = cachedConfig;
        } else {
          throw new Error('GsSheet.getInstance requires a configuration object the first time it is called and none was cached');
        }
      }

      this.instance = new GsSheet(_config);
    }

    return this.instance;
  }
}
