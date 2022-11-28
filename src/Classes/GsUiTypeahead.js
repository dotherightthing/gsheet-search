/**
 * @file GsUiTypeahead.js
 */
class GsUiTypeahead extends GsUi {
  /**
   * @class
   * @public
   * @param {object}  config                       - Module configuration.
   * @param {string}  config.filterClass           - Class selector used to target each checkbox filter
   * @param {string}  config.filtersContainerId    - ID selector used to target the filters container
   * @param {boolean} config.filtersFocusTypeahead - Whether clicking a filter should re-focus the typeahead input (in order to display the results)
   * @param {string}  config.formId                - ID selector used to target the parent form
   * @param {string}  config.radiosContainerId     - ID selector used to target the radios container
   * @param {Array}   config.sheets                - Array of sheet config objects
   * @param {string}  config.typeaheadId           - ID selector used to target the parent form
   */
  constructor(config = {}) {
    super();

    // is there a better way to pass this to loadData?
    this.config = config;

    // select the relevant arguments from the config object passed in
    this.filterClass = config.filterClass;
    this.filtersContainerId = config.filtersContainerId;
    this.filtersFocusTypeahead = config.filtersFocusTypeahead;
    this.formId = config.formId;
    this.radiosContainerId = config.radiosContainerId;
    this.sheets = config.sheets;
    this.typeaheadId = config.typeaheadId;

    // subscribe to other module's events
    pubsub.subscribe('domready', () => {
      this.init();
    });
  }

  /* Getters and Setters */

  /**
   * config
   *
   * @type {object}
   */
  get config() {
    return this._config;
  }

  set config(config) {
    this._config = this.gsValidateInstance.validate(config, 'object', 'GsUiTypeahead.config');
  }

  /**
   * dataTokensDisplayGroupA
   *
   * @type {Array}
   */
  get dataTokensDisplayGroupA() {
    return this._dataTokensDisplayGroupA;
  }

  set dataTokensDisplayGroupA(dataTokensDisplayGroupA) {
    this._dataTokensDisplayGroupA = this.gsValidateInstance.validate(dataTokensDisplayGroupA, 'Array', 'GsUiTypeahead.dataTokensDisplayGroupA');
  }

  /**
   * dataTokensDisplayGroupB
   *
   * @type {Array}
   */
  get dataTokensDisplayGroupB() {
    return this._dataTokensDisplayGroupB;
  }

  set dataTokensDisplayGroupB(dataTokensDisplayGroupB) {
    this._dataTokensDisplayGroupB = this.gsValidateInstance.validate(dataTokensDisplayGroupB, 'Array', 'GsUiTypeahead.dataTokensDisplayGroupB');
  }

  /**
   * dataTokensDisplayGroupC
   *
   * @type {Array}
   */
  get dataTokensDisplayGroupC() {
    return this._dataTokensDisplayGroupC;
  }

  set dataTokensDisplayGroupC(dataTokensDisplayGroupC) {
    this._dataTokensDisplayGroupC = this.gsValidateInstance.validate(dataTokensDisplayGroupC, 'Array', 'GsUiTypeahead.dataTokensDisplayGroupC');
  }

  /**
   * dataTokenIdentifier
   *
   * @type {string}
   */
  get dataTokenIdentifier() {
    return this._dataTokenIdentifier;
  }

  set dataTokenIdentifier(dataTokenIdentifier) {
    this._dataTokenIdentifier = this.gsValidateInstance.validate(dataTokenIdentifier, 'string1', 'GsUiTypeahead.dataTokenIdentifier');
  }

  /**
   * dataTokens
   *
   * @type {Array}
   */
  get dataTokens() {
    return this._dataTokens;
  }

  set dataTokens(dataTokens) {
    this._dataTokens = this.gsValidateInstance.validate(dataTokens, 'Array', 'GsUiTypeahead.dataTokens');
  }

  /**
   * filterClass
   *
   * @type {string}
   */
  get filterClass() {
    return this._filterClass;
  }

  set filterClass(filterClass) {
    this._filterClass = this.gsValidateInstance.validate(filterClass, 'string1', 'GsUiTypeahead.filterClass');
  }

  /**
   * filtersContainerId
   *
   * @type {string}
   */
  get filtersContainerId() {
    return this._filtersContainerId;
  }

  set filtersContainerId(filtersContainerId) {
    this._filtersContainerId = this.gsValidateInstance.validate(filtersContainerId, 'string1', 'GsUiTypeahead.filtersContainerId');
  }

  /**
   * filtersFocusTypeahead
   *
   * @type {boolean}
   */
  get filtersFocusTypeahead() {
    return this._filtersFocusTypeahead;
  }

  set filtersFocusTypeahead(filtersFocusTypeahead) {
    this._filtersFocusTypeahead = this.gsValidateInstance.validate(filtersFocusTypeahead, 'boolean', 'GsUiTypeahead.filtersFocusTypeahead');
  }

  /**
   * formId
   *
   * @type {string}
   */
  get formId() {
    return this._formId;
  }

  set formId(formId) {
    this._formId = this.gsValidateInstance.validate(formId, 'string1', 'GsUiTypeahead.formId');
  }

  /**
   * radiosContainerId
   *
   * @type {string}
   */
  get radiosContainerId() {
    return this._radiosContainerId;
  }

  set radiosContainerId(radiosContainerId) {
    this._radiosContainerId = this.gsValidateInstance.validate(radiosContainerId, 'string1', 'GsUiTypeahead.radiosContainerId');
  }

  /**
   * sheets
   *
   * @type {Array}
   */
  get sheets() {
    return this._sheets;
  }

  set sheets(sheets) {
    this._sheets = this.gsValidateInstance.validate(sheets, 'Array', 'GsUiTypeahead.sheets');
  }

  /**
   * storedData
   *
   * @type {Array}
   */
  get storedData() {
    return this._storedData;
  }

  set storedData(storedData) {
    this._storedData = this.gsValidateInstance.validate(storedData, 'Array', 'GsUiTypeahead.storedData');
  }

  /**
   * typeaheadId
   *
   * @type {string}
   */
  get typeaheadId() {
    return this._typeaheadId;
  }

  set typeaheadId(typeaheadId) {
    this._typeaheadId = this.gsValidateInstance.validate(typeaheadId, 'string1', 'GsUiTypeahead.typeaheadId');
  }

  /**
   * typeaheadInstance
   *
   * @type {object}
   */
  get typeaheadInstance() {
    return this._typeaheadInstance;
  }

  set typeaheadInstance(typeaheadInstance) {
    // if (Object.prototype.toString.call(typeaheadInstance) === '[object Object]') {
    this._typeaheadInstance = typeaheadInstance;
    // } else {
    //  throw new Error('GsUiTypeahead.typeaheadInstance must be an object');
    // }
  }

  /* Instance methods */

  /**
   * capitalise
   *
   * @summary Convert the leading character to uppercase
   * @memberof GsUiTypeahead
   * @param {string} str - String to capitalise
   * @returns {string|*} str Capitalised string
   */
  capitalise(str) {
    if (typeof str === 'string') {
      return str.replace(/^\w/, (c) => c.toUpperCase());
    }

    return str;
  }

  /**
   * getTemplateHtml
   *
   * @memberof GsUiTypeahead
   * @param {object} dataItem - A single row of typeahead search results
   * @param {string} dataTokenIdentifier - Spreadsheet header of the results column
   * @param {Array} dataTokensDisplayGroupA - Spreadsheet headers in display group A
   * @param {Array} dataTokensDisplayGroupB - Spreadsheet headers in display group B
   * @param {Array} dataTokensDisplayGroupC - Spreadsheet headers in display group C
   * @returns {string} templateHtml
   * @todo key order differs from spreadsheet order: https://github.com/dotherightthing/gsheet-search/issues/8
   */
  getTemplateHtml(
    dataItem,
    dataTokenIdentifier,
    dataTokensDisplayGroupA,
    dataTokensDisplayGroupB,
    dataTokensDisplayGroupC,
  ) {
    const gridAreaA = [];
    const gridAreaB = [];
    const gridAreaC = [];
    let gridAreaResult = '';
    let templateHtml = '';

    const keys = Object.keys(dataItem);

    // console.log('getTemplateHtml - dataItem', dataItem);
    // console.log('getTemplateHtml - keys', keys);

    /*
    // TODO: dataItem and key orders both differ from the spreadsheet order:

    0: "no"
    1: "notes"
    2: "business"
    3: "pod"
    4: "level"
    5: "street"
    6: "abbr"
    */

    keys.forEach((key) => {
      const value = dataItem[key];

      if (value !== '') {
        // values not assigned to a display area are discarded
        if (dataTokensDisplayGroupA.includes(key)) {
          gridAreaA.push(value);
        } else if (dataTokensDisplayGroupB.includes(key)) {
          gridAreaB.push(value);
        } else if (dataTokensDisplayGroupC.includes(key)) {
          gridAreaC.push(value);
        } else if (dataTokenIdentifier === key) {
          gridAreaResult = value;
        }
      }
    });

    // format display groups

    if (gridAreaA.length) {
      templateHtml += `<div class="text text-a">${gridAreaA.join(' ')}</div>`;
    }

    if (gridAreaB.length) {
      templateHtml += `<div class="text text-b">${gridAreaB.join(' ')}</div>`;
    }

    if (gridAreaC.length) {
      templateHtml += `<div class="text text-c">${gridAreaC.join(' ')}</div>`;
    }

    // format results

    const gridAreaResultCount = gridAreaResult.split(',').length; // TODO trim spaces around comma if necessary

    if (gridAreaResultCount > 1) {
      templateHtml += `<div class="text text-results">
        <ul class="grid-list">
          <li class="text text-result">
            ${gridAreaResult.split(',').join('</li><li class="text text-result">')}
          </li>
        </ul>
      </div>`;
    } else {
      templateHtml += `<div class="text text-result">${gridAreaResult}</div>`;
    }

    templateHtml = this.linkPhoneNumbers(templateHtml);

    return templateHtml;
  }

  /**
   * handleChange
   *
   * @memberof GsUiTypeahead
   * @param {object} event - Event object
   */
  handleChange(event) {
    const {
      target: changedEl,
    } = event;

    const {
      name,
      type,
    } = changedEl;

    if (name === 'dataSource') {
      const {
        sheetTitle,
      } = changedEl.dataset;

      this.loadData(sheetTitle);
    } else if (type === 'checkbox') {
      this.handleFilterChange();
    }
  }

  /**
   * handleFilterChange
   *
   * @memberof GsUiTypeahead
   */
  handleFilterChange() {
    const {
      filterClass,
      formId,
    } = this;

    const checkedFilters = [];
    const formEls = document.getElementById(formId).elements;

    formEls.forEach((formEl) => {
      if ((formEl.nodeName === 'INPUT') && (formEl.className === filterClass) && (formEl.checked)) {
        checkedFilters.push(formEl.name.toLowerCase());
      }
    });

    const obj = {
      dataTokens: checkedFilters, // order ok
    };

    this.initTypeahead(obj);
  }

  /**
   * handleLoadError
   *
   * @memberof GsUiTypeahead
   * @param {string} error Error
   */
  handleLoadError(error) {
    throw new Error(error);
  }

  /**
   * init
   *
   * @memberof GsUiTypeahead
   * @summary Runs on page load
   */
  init() {
    const {
      formId,
      radiosContainerId,
      sheets,
      typeaheadId,
    } = this;

    const formEl = document.getElementById(formId);
    const radiosContainerEl = document.getElementById(radiosContainerId);
    const typeaheadEl = document.getElementById(typeaheadId);
    let html = '';

    if (typeaheadEl === null) {
      return;
    }

    sheets.forEach((sheet, i) => {
      const {
        title: sheetTitle,
      } = sheet;

      html += '<div class="radio">';
      html += `<input type="radio" class="source" name="dataSource" id="sheet-${i}" value="sheet-${i}" data-sheet-title="${sheetTitle}">`;
      html += `<label for="sheet-${i}">${sheetTitle}</label>`;
      html += '</div>';
    });

    radiosContainerEl.innerHTML = `<legend><span class="legend">Search in</span></legend>${html}`;

    formEl.addEventListener('change', this.handleChange.bind(this));

    document.getElementById('sheet-0').click();
  }

  /**
   * initFilters
   *
   * @memberof GsUiTypeahead
   * @param {Array} dataTokens All fields that could be searched
   */
  initFilters(dataTokens) {
    const {
      filtersContainerId,
    } = this;

    const filtersContainerEl = document.getElementById(filtersContainerId);

    let html = '';

    dataTokens.forEach((dataToken, i) => {
      html += '<div class="checkbox">';
      html += `<input type="checkbox" class="filter" name="${dataToken}" id="filter-${i}" checked="checked">`;
      html += `<label for="filter-${i}">${this.capitalise(dataToken)}</label>`;
      html += '</div>';
    });

    filtersContainerEl.innerHTML = `<legend><span class="legend">Filter by</span></legend>${html}`;
  }

  /**
   * initTypeahead
   *
   * @memberof GsUiTypeahead
   * @summary Set up the search box. Typeahead has a limited API so must be destroyed and reinitialised to update options.
   * @param {object} obj Object: { data:[], dataTokens:[], dataTokenIdentifier:'' }
   * @todo Template is too content-specific
   * @todo Determine if there are comma separated values and output appropriate generic html
   * @todo Use CSS grid to layout generic/unknown keys
   */
  initTypeahead(obj) {
    const {
      data, // supplied by server, on spreadsheet change
      dataTokens, // supplied by server and filters, on filter change or spreadsheet change
      dataTokenIdentifier, // supplied by server, on spreadsheet change
      dataTokensDisplayGroupA, // supplied by server, on spreadsheet change
      dataTokensDisplayGroupB, // supplied by server, on spreadsheet change
      dataTokensDisplayGroupC, // supplied by server, on spreadsheet change
    } = obj;

    let _this;

    // this is undefined when initTypeahead is called from server
    if (typeof this === 'undefined') {
      _this = gsUiTypeaheadInstance;
    } else {
      _this = this;
    }

    const {
      typeaheadId,
    } = _this;

    let _dataTokens = dataTokens;

    // data will only be supplied by server, and only on a change of data source (via the radio buttons)
    // so we don't do this if no data was supplied because then a change of dataTokens would delete some filter options
    if (typeof data !== 'undefined') {
      // console.log('data[0]', data[0]); // order bad: no, notes, pod, business, level, street, abbr

      // without this step Typeahead won't accept the array
      _dataTokens = JSON.parse(JSON.stringify(dataTokens)); // order ok

      if (_this.filtersFocusTypeahead) {
        _this.focusTypeaheadOnInit();
      }

      // store properties supplied by the server so they be reused
      // when only the dataTokens are updated by the checkbox filters
      _this.dataTokenIdentifier = dataTokenIdentifier;
      _this.dataTokensDisplayGroupA = dataTokensDisplayGroupA;
      _this.dataTokensDisplayGroupB = dataTokensDisplayGroupB;
      _this.dataTokensDisplayGroupC = dataTokensDisplayGroupC;
      _this.storedData = JSON.parse(JSON.stringify(data));
      _this.initFilters(_dataTokens); // order ok
    }

    const {
      dataTokensDisplayGroupA: displayGroupA,
      dataTokensDisplayGroupB: displayGroupB,
      dataTokensDisplayGroupC: displayGroupC,
      dataTokenIdentifier: identifier,
      storedData,
      typeaheadInstance,
    } = _this;

    // if no data was received and no data was stored, exit
    if ((identifier === 'undefined') || (storedData === 'undefined')) {
      throw new Error('GsUiTypeahead.initTypeahead requires data');
    }

    if (typeaheadInstance) {
      typeaheadInstance.destroy();
      _this.typeaheadInstance = null;
    }

    const typeaheadConfig = {
      input: document.getElementById(typeaheadId), // referencing a var here failed every second time
      source: {
        local: storedData,
        identifier,
        // identity: (suggestion) => `${suggestion.business}${suggestion.address}`,
        // groupIdentifier: 'business',
        // dataTokens, // fields user can search on
        dataTokens: _dataTokens, // fields user can search on; note that GsSheet.sheetToJSON removes the identifier from this array
        diacritics: true, // in case this includes macrons
      },
      limit: 10, // default is 5
      hint: false,
      autoSelect: false,
      highlight: true,
      templates: {
        suggestion: (dataItem) => {
          const html = _this.getTemplateHtml(
            dataItem,
            identifier,
            displayGroupA,
            displayGroupB,
            displayGroupC,
          );

          return html;
        },
        // group: (name) => `<div class="custom-group">${name}</div>`,
        // header: () => 'PODs',
        // footer: () => '<a href="#">See more...</a>',
        notFound: () => 'No results',
      },
    };

    _this.typeaheadInstance = typeahead(typeaheadConfig);
  }

  /**
   * focusTypeaheadOnInit
   *
   * @memberof GsUiTypeahead
   * @summary Waits for Typeahead to initialise, then focuses the search box
   */
  focusTypeaheadOnInit() {
    const {
      formId,
      typeaheadId,
    } = this;
    const targetNode = document.getElementById(formId);
    const config = {
      childList: true,
      subtree: true,
    };

    const callback = (mutationList) => {
      mutationList.every((mutation) => {
        if (mutation.type === 'childList') {
          if (mutation.addedNodes.length) {
            if (mutation.addedNodes[0].className === 'typeahead-standalone') {
              document.getElementById(typeaheadId).focus();
              return false; // stop looping
            }
          }
        }

        return true; // continue looping
      });
    };

    const observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
  }

  /**
   * linkPhoneNumbers
   *
   * @summary Link phone numbers in a body of text.
   * @memberof GsUiTypeahead
   * @param {string} text Text
   * @returns {string} linkedText
   * @see {@link https://en.wikipedia.org/wiki/Telephone_numbers_in_New_Zealand}
   */
  linkPhoneNumbers(text) {
    // xxx 021 123 4567 yyy
    // -> xxx <a href="tel:021 234 5678" class="a">021 234 5678</a> yyy
    const replacements = text.replace(/(0204|021|022|027|028|029|03|04|06|07|09)(\s*\d+)+/g, '<a href="tel:$&" class="a">$&</a>');

    // xxx <a href="tel:021 234 5678" class="a">021 234 5678</a> yyy
    // -> ['xxx <a href=', '"tel:021 234 5678"', ' class="a">021 234 5678</a> yyy']
    let replacementParts = replacements.split(/("tel:.*?")/g);

    // ['xxx <a href=', '"tel:021 234 5678"', ' class="a">021 234 5678</a> yyy']
    // -> ['xxx <a href=', '"tel:0212345678"', ' class="a">021 234 5678</a> yyy']
    replacementParts = replacementParts.map((item) => {
      if (item.substring(0, 5) === '"tel:') {
        return item.replace(/\s/g, '');
      }

      return item;
    });

    // ['xxx <a href=', '"tel:0212345678"', ' class="a">021 234 5678</a> yyy']
    // -> 'xxx <a href="tel:0212345678" class="a">021 234 5678</a> yyy'
    const replacementPartsStr = replacementParts.join('');

    return replacementPartsStr;
  }

  /**
   * loadData
   *
   * @summary Call the serverside function GsSheet.sheetToJSON via the middleware function gsSheetToJSON
   * @memberof GsUiTypeahead
   * @param {string} sheetTitle Sheet title
   * @see {@link https://en.wikipedia.org/wiki/Telephone_numbers_in_New_Zealand}
   * @todo If (standalone) - could have a generic callback function and the method as an argument, so that the consuming project would only need to have a single workaround function
   */
  loadData(sheetTitle) {
    const {
      config,
    } = this;

    google.script.run
      .withSuccessHandler(this.initTypeahead)
      .withFailureHandler(this.handleError)
      .gsSheetToJSON(config, sheetTitle);
  }
}
