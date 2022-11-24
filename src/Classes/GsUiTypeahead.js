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
   * @param {Array}   config.spreadsheets          - Array of objects
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
    this.spreadsheets = config.spreadsheets;
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
   * spreadsheets
   *
   * @type {Array}
   */
  get spreadsheets() {
    return this._spreadsheets;
  }

  set spreadsheets(spreadsheets) {
    this._spreadsheets = this.gsValidateInstance.validate(spreadsheets, 'Array', 'GsUiTypeahead.spreadsheets');
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
        sheetName,
      } = changedEl.dataset;

      this.loadData(sheetName);
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
      dataTokens: checkedFilters,
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
      spreadsheets,
      typeaheadId,
    } = this;

    const formEl = document.getElementById(formId);
    const radiosContainerEl = document.getElementById(radiosContainerId);
    const typeaheadEl = document.getElementById(typeaheadId);
    let html = '';

    if (typeaheadEl === null) {
      return;
    }

    spreadsheets.forEach((spreadsheet, i) => {
      const {
        sheet: sheetName,
      } = spreadsheet;

      html += '<div class="radio">';
      html += `<input type="radio" class="source" name="dataSource" id="sheet-${i}" value="sheet-${i}" data-sheet-name="${sheetName}">`;
      html += `<label for="sheet-${i}">${sheetName}</label>`;
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
    } = obj;

    let _this;

    // this is undefined when initTypeahead is called from server
    if (typeof this === 'undefined') {
      _this = gsUiTypeaheadInstance;
    } else {
      _this = this;
    }

    const {
      linkPhoneNumbers,
      typeaheadId,
    } = _this;

    let _dataTokens = dataTokens;

    // data will only be supplied by server, and only on a change of data source (via the radio buttons)
    // so we don't do this if no data was supplied because then a change of dataTokens would delete some filter options
    if (typeof data !== 'undefined') {
      // without this step Typeahead won't accept the array
      _dataTokens = JSON.parse(JSON.stringify(dataTokens));

      // sort tokens for consistent placement in the filters
      _dataTokens = _dataTokens.sort();

      if (_this.filtersFocusTypeahead) {
        _this.focusTypeaheadOnInit();
      }

      // store properties supplied by the server so they be reused
      // when only the dataTokens are updated by the checkbox filters
      _this.dataTokenIdentifier = dataTokenIdentifier;
      _this.storedData = JSON.parse(JSON.stringify(data));
      _this.initFilters(_dataTokens);
    }

    const {
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

    /*
    TODO: replace
            business,
            notes,
            level,
            no,
            pod,
            street,
    with datatokens
    */

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
      limit: 99, // default is 5
      hint: false,
      autoSelect: false,
      highlight: true,
      templates: {
        suggestion: (item) => {
          const {
            business,
            notes,
            level,
            no,
            pod,
            street,
          } = item;

          const _business = business || '';
          const _notes = notes ? `<div class="text text-notes">${linkPhoneNumbers(notes)}</div>` : '';
          const _level = item.level ? `${level}/` : '';
          const _no = no || '';
          const pods = pod.split(', ');
          const podsHtml = `<span class="text text-person">${pods.join('</span><span class="text text-person">')}</span>`;
          const _street = street || '';

          return `<div class="text text-business">${_business}</div>
          <div class="text text-address">${_level}${_no} ${_street}</div>
          <div class="text text-pods">
            <div class="grid-pods">${podsHtml}</div>
          </div>
          ${_notes}`;
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
   * @param {string} sheetName Sheet name
   * @see {@link https://en.wikipedia.org/wiki/Telephone_numbers_in_New_Zealand}
   * @todo If (standalone) - could have a generic callback function and the method as an argument, so that the consuming project would only need to have a single workaround function
   */
  loadData(sheetName) {
    const {
      config,
    } = this;

    google.script.run
      .withSuccessHandler(this.initTypeahead)
      .withFailureHandler(this.handleError)
      .gsSheetToJSON(config, sheetName);
  }
}
