## Classes

<dl>
<dt><a href="#GsPage">GsPage</a></dt>
<dd></dd>
<dt><a href="#GsSheet">GsSheet</a></dt>
<dd></dd>
<dt><a href="#GsUi">GsUi</a></dt>
<dd></dd>
<dt><a href="#GsUiCss">GsUiCss</a></dt>
<dd></dd>
<dt><a href="#GsUiTypeahead">GsUiTypeahead</a></dt>
<dd></dd>
</dl>

<a name="GsPage"></a>

## GsPage
**Kind**: global class  
**Summary**: Properties and methods relating to the HTML templating.  
**Access**: public  

* [GsPage](#GsPage)
    * [new GsPage(config)](#new_GsPage_new)
    * _instance_
        * [.config](#GsPage+config) : <code>object</code>
        * [.imageLogo](#GsPage+imageLogo) : <code>string</code>
        * [.organisationName](#GsPage+organisationName) : <code>string</code>
        * [.pageTemplate](#GsPage+pageTemplate) : <code>string</code>
        * [.pageTitle](#GsPage+pageTitle) : <code>string</code>
        * [.addMetaTags(tpl)](#GsPage+addMetaTags) ⇒ <code>object</code>
        * [.createHtmlTemplate()](#GsPage+createHtmlTemplate) ⇒ <code>object</code>
    * _static_
        * [.getInstance(config)](#GsPage.getInstance) ⇒ [<code>GsPage</code>](#GsPage)
        * [.include(filename, [tplVariables])](#GsPage.include) ⇒ <code>string</code>

<a name="new_GsPage_new"></a>

### new GsPage(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.imageLogo | <code>string</code> | Image displayed at the bottom of the page and in the background. |
| config.organisationName | <code>string</code> | Used in web browser web browser page title. |
| config.pageTemplate | <code>string</code> | HTML template file. |
| config.pageTitle | <code>string</code> | Web browser page title. |
| config.sheetResultHeader | <code>string</code> | Column headers to use for results. |
| config.sheetSearchHeaders | <code>string</code> | Column headers to search and filter by. |

<a name="GsPage+config"></a>

### gsPage.config : <code>object</code>
config

**Kind**: instance property of [<code>GsPage</code>](#GsPage)  
<a name="GsPage+imageLogo"></a>

### gsPage.imageLogo : <code>string</code>
imageLogo

**Kind**: instance property of [<code>GsPage</code>](#GsPage)  
<a name="GsPage+organisationName"></a>

### gsPage.organisationName : <code>string</code>
organisationName

**Kind**: instance property of [<code>GsPage</code>](#GsPage)  
<a name="GsPage+pageTemplate"></a>

### gsPage.pageTemplate : <code>string</code>
pageTemplate

**Kind**: instance property of [<code>GsPage</code>](#GsPage)  
<a name="GsPage+pageTitle"></a>

### gsPage.pageTitle : <code>string</code>
pageTitle

**Kind**: instance property of [<code>GsPage</code>](#GsPage)  
<a name="GsPage+addMetaTags"></a>

### gsPage.addMetaTags(tpl) ⇒ <code>object</code>
addMetaTags

**Kind**: instance method of [<code>GsPage</code>](#GsPage)  
**Summary**: The app runs within a nested iframe. Add meta tags to the parent page.  
**Returns**: <code>object</code> - tpl - HtmlTemplate object  
**See**

- [https://developers.google.com/web/fundamentals/native-hardware/fullscreen/](https://developers.google.com/web/fundamentals/native-hardware/fullscreen/)
- [https://appcropolis.com/apple-mobile-web-app-capable/](https://appcropolis.com/apple-mobile-web-app-capable/)
- [Add to Home Screen icon for iphone](https://issuetracker.google.com/issues/176760976)
- [htmlOutput - Add support for language attribute](https://issuetracker.google.com/issues/213486384)
- [https://yagisanatode.com/2021/08/18/how-to-isValidUser-specific-users-on-a-web-app-in-google-apps-scripts/](https://yagisanatode.com/2021/08/18/how-to-isValidUser-specific-users-on-a-web-app-in-google-apps-scripts/)


| Param | Type | Description |
| --- | --- | --- |
| tpl | <code>object</code> | HtmlTemplate object |

<a name="GsPage+createHtmlTemplate"></a>

### gsPage.createHtmlTemplate() ⇒ <code>object</code>
createHtmlTemplate

**Kind**: instance method of [<code>GsPage</code>](#GsPage)  
**Summary**: Generates an HtmlTemplate object from the HTML file and the supplied template variables  
**Returns**: <code>object</code> - page Page  
**See**

- [https://developers.google.com/apps-script/guides/html/templates#code.gs_3](https://developers.google.com/apps-script/guides/html/templates#code.gs_3)
- [https://developers.google.com/apps-script/reference/html/html-template](https://developers.google.com/apps-script/reference/html/html-template)
- [https://www.youtube.com/watch?v=VyNJtjH84Aw](https://www.youtube.com/watch?v=VyNJtjH84Aw)

<a name="GsPage.getInstance"></a>

### GsPage.getInstance(config) ⇒ [<code>GsPage</code>](#GsPage)
getInstance

**Kind**: static method of [<code>GsPage</code>](#GsPage)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GsPage</code>](#GsPage) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GsPage.include"></a>

### GsPage.include(filename, [tplVariables]) ⇒ <code>string</code>
include

**Kind**: static method of [<code>GsPage</code>](#GsPage)  
**Summary**: Import the specified file content into the current file, evaluating any variables that are passed in. Note: nested includes are not supported.  
**Returns**: <code>string</code> - HTML file contents  
**See**: [https://developers.google.com/apps-script/guides/html/best-practices#code.gs](https://developers.google.com/apps-script/guides/html/best-practices#code.gs)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filename | <code>string</code> |  | File name |
| [tplVariables] | <code>object</code> | <code></code> | Template variables |

<a name="GsSheet"></a>

## GsSheet
**Kind**: global class  
**Summary**: Properties and methods relating to querying of the spreadsheet.  

* [GsSheet](#GsSheet)
    * [new GsSheet(config)](#new_GsSheet_new)
    * _instance_
        * [.sheets](#GsSheet+sheets) : <code>Array</code>
        * [.spreadsheetId](#GsSheet+spreadsheetId) : <code>string</code>
        * [.getNamedRange(name)](#GsSheet+getNamedRange) ⇒ <code>Range</code>
        * [.sheetToJSON(sheetTitle)](#GsSheet+sheetToJSON) ⇒ <code>object</code>
        * [.getNamedRangeValues(name, onlyFirst)](#GsSheet+getNamedRangeValues) ⇒ <code>Array</code>
    * _static_
        * [.getSheet(spreadsheetId, sheetTitle)](#GsSheet.getSheet) ⇒ <code>object</code>
        * [.getInstance(config)](#GsSheet.getInstance) ⇒ [<code>GsSheet</code>](#GsSheet)

<a name="new_GsSheet_new"></a>

### new GsSheet(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.sheets | <code>Array</code> | Properties relating to a sheet within a spreadsheet |
| config.spreadsheetId | <code>string</code> | ID of a spreadsheet which contains sheets |

<a name="GsSheet+sheets"></a>

### gsSheet.sheets : <code>Array</code>
sheets

**Kind**: instance property of [<code>GsSheet</code>](#GsSheet)  
<a name="GsSheet+spreadsheetId"></a>

### gsSheet.spreadsheetId : <code>string</code>
spreadsheetId

**Kind**: instance property of [<code>GsSheet</code>](#GsSheet)  
<a name="GsSheet+getNamedRange"></a>

### gsSheet.getNamedRange(name) ⇒ <code>Range</code>
getNamedRange

**Kind**: instance method of [<code>GsSheet</code>](#GsSheet)  
**Summary**: Get the range (on any sheet) referenced to by a named range in a spreadsheet.  
**Returns**: <code>Range</code> - namedRange  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name |

<a name="GsSheet+sheetToJSON"></a>

### gsSheet.sheetToJSON(sheetTitle) ⇒ <code>object</code>
sheetToJSON

**Kind**: instance method of [<code>GsSheet</code>](#GsSheet)  
**Summary**: Convert spreadsheet to a JSON representation  
**Returns**: <code>object</code> - Sheet  

| Param | Type | Description |
| --- | --- | --- |
| sheetTitle | <code>string</code> | Sheet title |

<a name="GsSheet+getNamedRangeValues"></a>

### gsSheet.getNamedRangeValues(name, onlyFirst) ⇒ <code>Array</code>
getNamedRangeValues

**Kind**: instance method of [<code>GsSheet</code>](#GsSheet)  
**Returns**: <code>Array</code> - namedRangeValues  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Name |
| onlyFirst | <code>boolean</code> | <code>false</code> | Whether to return only the first value |

<a name="GsSheet.getSheet"></a>

### GsSheet.getSheet(spreadsheetId, sheetTitle) ⇒ <code>object</code>
getSheet

**Kind**: static method of [<code>GsSheet</code>](#GsSheet)  
**Summary**: Get spreadsheet sheet (if the user is allowed to access it).  
**Returns**: <code>object</code> - Sheet  

| Param | Type | Description |
| --- | --- | --- |
| spreadsheetId | <code>string</code> | Spreadsheet ID |
| sheetTitle | <code>string</code> | Sheet title |

<a name="GsSheet.getInstance"></a>

### GsSheet.getInstance(config) ⇒ [<code>GsSheet</code>](#GsSheet)
getInstance

**Kind**: static method of [<code>GsSheet</code>](#GsSheet)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GsSheet</code>](#GsSheet) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GsUi"></a>

## GsUi
**Kind**: global class  
**Summary**: UI helpers.  
**Access**: public  

* [GsUi](#GsUi)
    * [new GsUi(config)](#new_GsUi_new)
    * _instance_
        * [.focusableSelector](#GsUi+focusableSelector) : <code>string</code>
        * [.enableActiveStates(parentSelector)](#GsUi+enableActiveStates)
    * _static_
        * [.createCustomEvent(eventName)](#GsUi.createCustomEvent) ⇒ <code>\*</code>
        * [.getInstance(config)](#GsUi.getInstance) ⇒ [<code>GsUi</code>](#GsUi)
        * [.log(str)](#GsUi.log)

<a name="new_GsUi_new"></a>

### new GsUi(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.focusableSelectors | <code>Array</code> | UI elements which can be focussed by the user. |

<a name="GsUi+focusableSelector"></a>

### gsUi.focusableSelector : <code>string</code>
focusableSelector

**Kind**: instance property of [<code>GsUi</code>](#GsUi)  
<a name="GsUi+enableActiveStates"></a>

### gsUi.enableActiveStates(parentSelector)
enableActiveStates

**Kind**: instance method of [<code>GsUi</code>](#GsUi)  
**Summary**: Fix for iOS which does not apply the active state by default, applied per-element for better performance  
**See**

- [https://developers.google.com/web/fundamentals/design-and-ux/input/touch/#enabling_active_state_support_on_ios](https://developers.google.com/web/fundamentals/design-and-ux/input/touch/#enabling_active_state_support_on_ios)
- [http://stackoverflow.com/a/28771425](http://stackoverflow.com/a/28771425)
- [https://codepen.io/dotherightthingnz/pen/bGwaGmM](https://codepen.io/dotherightthingnz/pen/bGwaGmM)


| Param | Type | Description |
| --- | --- | --- |
| parentSelector | <code>string</code> | Parent selector |

<a name="GsUi.createCustomEvent"></a>

### GsUi.createCustomEvent(eventName) ⇒ <code>\*</code>
createCustomEvent

**Kind**: static method of [<code>GsUi</code>](#GsUi)  
**Summary**: Create a synthetic event which can be triggered and which will then invoke the element's matching event listener  
**Returns**: <code>\*</code> - CustomEvent  
**See**: [https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Event name |

<a name="GsUi.getInstance"></a>

### GsUi.getInstance(config) ⇒ [<code>GsUi</code>](#GsUi)
getInstance

**Kind**: static method of [<code>GsUi</code>](#GsUi)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GsUi</code>](#GsUi) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GsUi.log"></a>

### GsUi.log(str)
log

**Kind**: static method of [<code>GsUi</code>](#GsUi)  
**Summary**: Log a string to the console  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String to log |

<a name="GsUiCss"></a>

## GsUiCss
**Kind**: global class  
**Summary**: Manage dynamic CSS  
**Access**: public  

* [GsUiCss](#GsUiCss)
    * [new GsUiCss(config)](#new_GsUiCss_new)
    * _instance_
        * [.fixedPositionIds](#GsUiCss+fixedPositionIds) : <code>Array</code>
        * [.injectHeightVariables()](#GsUiCss+injectHeightVariables)
    * _static_
        * [.getInstance(config)](#GsUiCss.getInstance) ⇒ [<code>GsUiCss</code>](#GsUiCss)

<a name="new_GsUiCss_new"></a>

### new GsUiCss(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.fixedPositionIds | <code>Array</code> | IDs of elements that use fixed positioning, used to generate CSS variables |

<a name="GsUiCss+fixedPositionIds"></a>

### gsUiCss.fixedPositionIds : <code>Array</code>
fixedPositionIds

**Kind**: instance property of [<code>GsUiCss</code>](#GsUiCss)  
<a name="GsUiCss+injectHeightVariables"></a>

### gsUiCss.injectHeightVariables()
injectHeightVariables

**Kind**: instance method of [<code>GsUiCss</code>](#GsUiCss)  
**Summary**: Store heights of fixed position elements  
<a name="GsUiCss.getInstance"></a>

### GsUiCss.getInstance(config) ⇒ [<code>GsUiCss</code>](#GsUiCss)
getInstance

**Kind**: static method of [<code>GsUiCss</code>](#GsUiCss)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GsUiCss</code>](#GsUiCss) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

<a name="GsUiTypeahead"></a>

## GsUiTypeahead
**Kind**: global class  
**Access**: public  

* [GsUiTypeahead](#GsUiTypeahead)
    * [new GsUiTypeahead(config)](#new_GsUiTypeahead_new)
    * _instance_
        * [.dataTokensDisplayGroupA](#GsUiTypeahead+dataTokensDisplayGroupA) : <code>Array</code>
        * [.dataTokensDisplayGroupB](#GsUiTypeahead+dataTokensDisplayGroupB) : <code>Array</code>
        * [.dataTokensDisplayGroupC](#GsUiTypeahead+dataTokensDisplayGroupC) : <code>Array</code>
        * [.dataTokenIdentifier](#GsUiTypeahead+dataTokenIdentifier) : <code>string</code>
        * [.dataTokens](#GsUiTypeahead+dataTokens) : <code>Array</code>
        * [.filterClass](#GsUiTypeahead+filterClass) : <code>string</code>
        * [.filtersContainerId](#GsUiTypeahead+filtersContainerId) : <code>string</code>
        * [.filtersFocusTypeahead](#GsUiTypeahead+filtersFocusTypeahead) : <code>boolean</code>
        * [.formId](#GsUiTypeahead+formId) : <code>string</code>
        * [.radiosContainerId](#GsUiTypeahead+radiosContainerId) : <code>string</code>
        * [.sheets](#GsUiTypeahead+sheets) : <code>Array</code>
        * [.storedData](#GsUiTypeahead+storedData) : <code>Array</code>
        * [.typeaheadId](#GsUiTypeahead+typeaheadId) : <code>string</code>
        * [.typeaheadInstance](#GsUiTypeahead+typeaheadInstance) : <code>object</code>
        * [.capitalise(str)](#GsUiTypeahead+capitalise) ⇒ <code>string</code> \| <code>\*</code>
        * [.getTemplateHtml(dataItem, dataTokenIdentifier, dataTokensDisplayGroupA, dataTokensDisplayGroupB, dataTokensDisplayGroupC)](#GsUiTypeahead+getTemplateHtml) ⇒ <code>string</code>
        * [.handleChange(event)](#GsUiTypeahead+handleChange)
        * [.handleFilterChange()](#GsUiTypeahead+handleFilterChange)
        * [.handleLoadError(error)](#GsUiTypeahead+handleLoadError)
        * [.init()](#GsUiTypeahead+init)
        * [.initFilters(dataTokens)](#GsUiTypeahead+initFilters)
        * [.initTypeahead(obj)](#GsUiTypeahead+initTypeahead)
        * [.focusTypeaheadOnInit()](#GsUiTypeahead+focusTypeaheadOnInit)
        * [.linkPhoneNumbers(text)](#GsUiTypeahead+linkPhoneNumbers) ⇒ <code>string</code>
        * [.loadData(sheetTitle)](#GsUiTypeahead+loadData)
    * _static_
        * [.getInstance(config)](#GsUiTypeahead.getInstance) ⇒ [<code>GsUiTypeahead</code>](#GsUiTypeahead)

<a name="new_GsUiTypeahead_new"></a>

### new GsUiTypeahead(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.filterClass | <code>string</code> | Class selector used to target each checkbox filter |
| config.filtersContainerId | <code>string</code> | ID selector used to target the filters container |
| config.filtersFocusTypeahead | <code>boolean</code> | Whether clicking a filter should re-focus the typeahead input (in order to display the results) |
| config.formId | <code>string</code> | ID selector used to target the parent form |
| config.radiosContainerId | <code>string</code> | ID selector used to target the radios container |
| config.sheets | <code>Array</code> | Array of sheet config objects |
| config.typeaheadId | <code>string</code> | ID selector used to target the parent form |

<a name="GsUiTypeahead+dataTokensDisplayGroupA"></a>

### gsUiTypeahead.dataTokensDisplayGroupA : <code>Array</code>
dataTokensDisplayGroupA

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+dataTokensDisplayGroupB"></a>

### gsUiTypeahead.dataTokensDisplayGroupB : <code>Array</code>
dataTokensDisplayGroupB

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+dataTokensDisplayGroupC"></a>

### gsUiTypeahead.dataTokensDisplayGroupC : <code>Array</code>
dataTokensDisplayGroupC

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+dataTokenIdentifier"></a>

### gsUiTypeahead.dataTokenIdentifier : <code>string</code>
dataTokenIdentifier

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+dataTokens"></a>

### gsUiTypeahead.dataTokens : <code>Array</code>
dataTokens

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+filterClass"></a>

### gsUiTypeahead.filterClass : <code>string</code>
filterClass

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+filtersContainerId"></a>

### gsUiTypeahead.filtersContainerId : <code>string</code>
filtersContainerId

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+filtersFocusTypeahead"></a>

### gsUiTypeahead.filtersFocusTypeahead : <code>boolean</code>
filtersFocusTypeahead

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+formId"></a>

### gsUiTypeahead.formId : <code>string</code>
formId

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+radiosContainerId"></a>

### gsUiTypeahead.radiosContainerId : <code>string</code>
radiosContainerId

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+sheets"></a>

### gsUiTypeahead.sheets : <code>Array</code>
sheets

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+storedData"></a>

### gsUiTypeahead.storedData : <code>Array</code>
storedData

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+typeaheadId"></a>

### gsUiTypeahead.typeaheadId : <code>string</code>
typeaheadId

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+typeaheadInstance"></a>

### gsUiTypeahead.typeaheadInstance : <code>object</code>
typeaheadInstance

**Kind**: instance property of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+capitalise"></a>

### gsUiTypeahead.capitalise(str) ⇒ <code>string</code> \| <code>\*</code>
capitalise

**Kind**: instance method of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
**Summary**: Convert the leading character to uppercase  
**Returns**: <code>string</code> \| <code>\*</code> - str Capitalised string  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String to capitalise |

<a name="GsUiTypeahead+getTemplateHtml"></a>

### gsUiTypeahead.getTemplateHtml(dataItem, dataTokenIdentifier, dataTokensDisplayGroupA, dataTokensDisplayGroupB, dataTokensDisplayGroupC) ⇒ <code>string</code>
getTemplateHtml

**Kind**: instance method of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
**Returns**: <code>string</code> - templateHtml  

| Param | Type | Description |
| --- | --- | --- |
| dataItem | <code>object</code> | A single row of typeahead search results |
| dataTokenIdentifier | <code>string</code> | Spreadsheet header of the results column |
| dataTokensDisplayGroupA | <code>Array</code> | Spreadsheet headers in display group A |
| dataTokensDisplayGroupB | <code>Array</code> | Spreadsheet headers in display group B |
| dataTokensDisplayGroupC | <code>Array</code> | Spreadsheet headers in display group C |

<a name="GsUiTypeahead+handleChange"></a>

### gsUiTypeahead.handleChange(event)
handleChange

**Kind**: instance method of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | Event object |

<a name="GsUiTypeahead+handleFilterChange"></a>

### gsUiTypeahead.handleFilterChange()
handleFilterChange

**Kind**: instance method of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
<a name="GsUiTypeahead+handleLoadError"></a>

### gsUiTypeahead.handleLoadError(error)
handleLoadError

**Kind**: instance method of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>string</code> | Error |

<a name="GsUiTypeahead+init"></a>

### gsUiTypeahead.init()
init

**Kind**: instance method of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
**Summary**: Runs on page load  
<a name="GsUiTypeahead+initFilters"></a>

### gsUiTypeahead.initFilters(dataTokens)
initFilters

**Kind**: instance method of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  

| Param | Type | Description |
| --- | --- | --- |
| dataTokens | <code>Array</code> | All fields that could be searched |

<a name="GsUiTypeahead+initTypeahead"></a>

### gsUiTypeahead.initTypeahead(obj)
initTypeahead

**Kind**: instance method of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
**Summary**: Set up the search box. Typeahead has a limited API so must be destroyed and reinitialised to update options.  
**Todo**

- [ ] Template is too content-specific
- [ ] Determine if there are comma separated values and output appropriate generic html
- [ ] Use CSS grid to layout generic/unknown keys


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Object: { data:[], dataTokens:[], dataTokenIdentifier:'' } |

<a name="GsUiTypeahead+focusTypeaheadOnInit"></a>

### gsUiTypeahead.focusTypeaheadOnInit()
focusTypeaheadOnInit

**Kind**: instance method of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
**Summary**: Waits for Typeahead to initialise, then focuses the search box  
<a name="GsUiTypeahead+linkPhoneNumbers"></a>

### gsUiTypeahead.linkPhoneNumbers(text) ⇒ <code>string</code>
linkPhoneNumbers

**Kind**: instance method of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
**Summary**: Link phone numbers in a body of text.  
**Returns**: <code>string</code> - linkedText  
**See**: [https://en.wikipedia.org/wiki/Telephone_numbers_in_New_Zealand](https://en.wikipedia.org/wiki/Telephone_numbers_in_New_Zealand)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Text |

<a name="GsUiTypeahead+loadData"></a>

### gsUiTypeahead.loadData(sheetTitle)
loadData

**Kind**: instance method of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
**Summary**: Call the serverside function GsSheet.sheetToJSON via the middleware function gsSheetToJSON  
**See**: [https://en.wikipedia.org/wiki/Telephone_numbers_in_New_Zealand](https://en.wikipedia.org/wiki/Telephone_numbers_in_New_Zealand)  
**Todo**

- [ ] If (standalone) - could have a generic callback function and the method as an argument, so that the consuming project would only need to have a single workaround function


| Param | Type | Description |
| --- | --- | --- |
| sheetTitle | <code>string</code> | Sheet title |

<a name="GsUiTypeahead.getInstance"></a>

### GsUiTypeahead.getInstance(config) ⇒ [<code>GsUiTypeahead</code>](#GsUiTypeahead)
getInstance

**Kind**: static method of [<code>GsUiTypeahead</code>](#GsUiTypeahead)  
**Summary**: Note: this refers to class instance in prototype methods and class constructor in static methods.  
**Returns**: [<code>GsUiTypeahead</code>](#GsUiTypeahead) - instance of class  
**See**

- [https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927](https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927)
- [https://stackoverflow.com/a/50285439](https://stackoverflow.com/a/50285439)


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Config |

