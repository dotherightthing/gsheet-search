/**
 * @file GsSheet.js
 */
class GsSheet extends Gs {
  /**
   * @class
   * @summary Properties and methods relating to querying of the spreadsheet.
   * @param {object} config                 - Module configuration.
   * @param {Array}  config.namedRangeItems - Name/description/validation of the named ranges set in the spreadsheet (this is an array of objects).
   */
  constructor(config = {}) {
    super();

    // is there a better way to pass this to sheetToJSON?
    this.config = config;

    // select the relevant arguments from the config object passed in
    this.namedRangeItems = config.namedRangeItems;
  }

  /* Setters and Getters */

  /**
   * config
   *
   * @type {object}
   */
  get config() {
    return this._config;
  }

  set config(config) {
    this._config = this.gsValidateInstance.validate(config, 'object', 'GsSheet.config');
  }

  /**
   * namedRangeItems
   *
   * @type {Array}
   */
  get namedRangeItems() {
    return this._namedRangeItems;
  }

  set namedRangeItems(namedRangeItems) {
    this._namedRangeItems = this.gsValidateInstance.validate(namedRangeItems, 'Array', 'GsSheet.namedRangeItems');
  }

  /* Instance methods */

  /**
   * getAllNamedRangeValues
   *
   * @summary Retrieve, validate and cache all named ranges upfront, to mitigate app failure due to bad input.
   * @memberof GsSheet
   * @returns {object} namedRangeValues
   * @see {@link https://stackoverflow.com/questions/35288998/how-to-remove-data-validations}
   */
  getAllNamedRangeValues() {
    const {
      namedRangeItems,
    } = this;

    const cacheKey = '_named-range-values';
    let namedRangeValues = GsCache.getCacheItem(cacheKey);

    if ((typeof namedRangeValues === 'object') && (namedRangeValues !== null)) {
      if (Object.keys(namedRangeValues).length === namedRangeItems.length) {
        return namedRangeValues;
      }
    }

    namedRangeValues = {};

    namedRangeItems.forEach((namedRangeName) => {
      const {
        name,
        description,
      } = namedRangeName;

      let val = this.getNamedRangeValues(name);

      if (!Array.isArray(val)) {
        val = val[0]; // eslint-disable-line prefer-destructuring
      }

      if (val.length < 1) {
        throw new Error(`Gsheet Search cannot find the named range ${name} (${description})`);
      }

      namedRangeValues[name] = val;
    });

    GsCache.setCacheItem(cacheKey, namedRangeValues);

    return namedRangeValues;
  }

  /**
   * getNamedRange
   *
   * @memberof GsSheet
   * @param {string} spreadsheetId Spreadsheet ID
   * @param {string} name Name
   * @returns {Range} namedRange
   */
  getNamedRange(spreadsheetId, name) {
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
   * @param {string} sheetName Sheet name
   * @returns {object} Sheet
   */
  sheetToJSON(sheetName) {
    const {
      config,
    } = this;

    const {
      spreadsheets,
    } = config;

    const {
      id: spreadsheetId,
    } = spreadsheets[0];

    // read from cache if there

    const cacheKey = `_json-${spreadsheetId}-${sheetName}`;
    let json = GsCache.getCacheItem(cacheKey);

    // TypeError: GsValidate.isObject is not a function
    // if (GsValidate.isObject(json)) {
    //   return json;
    // }

    if (Object.prototype.toString.call(json) === '[object Object]') {
      return json;
    }

    // else create then write to cache

    const sheet = GsSheet.getSheet(spreadsheetId, sheetName);

    const {
      GsResultHeader,
      GsSearchHeaders,
    } = this.getAllNamedRangeValues();

    const searchHeadersRange = this.getNamedRange(spreadsheetId, 'GsSearchHeaders');
    const dataRowStart = searchHeadersRange.getRow() + 1;
    const dataColStart = searchHeadersRange.getColumn();
    const dataColEnd = searchHeadersRange.getLastColumn();
    const dataRowEnd = sheet.getLastRow() - 1;

    // getRange(row, column, number of rows, number of columns)
    const dataRows = sheet.getRange(dataRowStart, dataColStart, dataRowEnd, dataColEnd);
    const dataRowValues = dataRows.getValues(); // arrays, each one represents a row of columns
    const data = [];

    const dataTokenIdentifier = GsUtils.stringToId(GsResultHeader[0]);
    let dataTokens = GsSearchHeaders.map((val) => GsUtils.stringToId(val));

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

    // const data = [
    //   {
    //     business: 'Acme & Co',
    //     address: '123 Main St',
    //     phone: 44 555 6666
    //     notes: 'Closed on Fridays'
    //   },
    // ];

    json = {
      data,
      dataTokens,
      dataTokenIdentifier,
    };

    if (Object.prototype.toString.call(json) === '[object Object]') {
      GsCache.setCacheItem(cacheKey, json);
    }

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
    const {
      config,
    } = this;

    const {
      spreadsheets,
    } = config;

    const {
      id: spreadsheetId,
    } = spreadsheets[0];

    const namedRange = this.getNamedRange(spreadsheetId, name);

    let namedRangeValues = [];

    if (namedRange) {
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

  /* Static methods */
}
