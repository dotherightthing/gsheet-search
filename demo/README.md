# GS Demo

## Setup

### Part A - Spreadsheet

#### 1. Create or configure your spreadsheet

Demo spreadsheet: <https://docs.google.com/spreadsheets/d/1DBYIoppZpZ1db6Vvg2LTm3zKvMnq0bEKOzEKGFcEvk4/edit?usp=sharing>

#### 2. Add named ranges to your spreadsheet

Note: If you multiple sheets, use the `namedRangePrefix` option in the `sheets` array to differentiate named ranges on additional sheets. For example, `GsSheet1...` could reference your first sheet, `GsSheet2...` your second, and so on. The examples below use a prefix of `GsSheet1` to indicate the first sheet.

##### `GsSheet1Result`

1. In Google Sheets, select only one column in whichever row contains your column headers. This column will be used to provide search results. This columns will also appear in grid area `result` (or `results`) of the layout.
2. Select *Data > Named Ranges > "GsSheet1Result" > Done*

##### `GsSheet1Search`

1. In Google Sheets, select all cells in whichever row contains your column headers. These columns will be used to provide search data and search result filtering.
2. Select *Data > Named Ranges > "GsSheet1Search" > Done*

Note: the app will automatically exclude `GsSheet1Result` from the search data.

##### `GsSheet1DisplayGroupA`

1. In Google Sheets, select one or more column in whichever row contains your column headers. These columns will appear in grid area `a` of the layout.
2. Select *Data > Named Ranges > "GsSheet1DisplayGroupA" > Done*

##### `GsSheet1DisplayGroupB`

1. In Google Sheets, select one or more column in whichever row contains your column headers. These columns will appear in grid area `b` of the layout.
2. Select *Data > Named Ranges > "GsSheet1DisplayGroupB" > Done*

##### `GsSheet1DisplayGroupC`

1. In Google Sheets, select one or more column in whichever row contains your column headers. These columns will appear in grid area `c` of the layout.
2. Select *Data > Named Ranges > "GsSheet1DisplayGroupC" > Done*

### Part B - Apps Script project

Regardless of whether you choose to set up your own standalone project or reuse the existing one, you will need to set up an Apps Script project which is attached to your spreadsheet document (i.e. 'container-bound').

This will allow you to configure and deploy the web app.

#### 1. Create an Apps Script project which is linked to your spreadsheet

1. Open a Google spreadsheet
2. Extensions > Apps Script
3. Click on `Untitled project` to rename it > `GS Host App` (or something else)

#### 2. Add the Apps Script config

1. Project settings > General settings > Check `Show "appsscript.json" manifest file in editor`
2. Copy the contents of [demo/appsscript.json](https://github.com/dotherightthing/gsheet-search/blob/main/demo/appsscript.json) to `appsscript.json`
3. If you have edited the codebase to create your own standalone project, replace the Script ID in `appsscript.json` with your own

#### 3. Add the app config

1. Copy the contents of [demo/Code.js](https://github.com/dotherightthing/gsheet-search/blob/main/demo/Code.js) to `Code.gs` (`.js` files have a `.gs` extension in the Apps Script editor)
2. Customise the `hostConfig` object to configure the app to your needs
    * Further information on each configuration option can be found by opening
      [the manual](https://github.com/dotherightthing/gsheet-search/blob/main/MAN.md)
      and searching for the configuration option:
      e.g. In Firefox: Edit > Find in page > `organisationName`
3. The `doGet` function runs the app from a web browser

#### 4. Create an initial deployment of the Apps Script project to enable testing

1. Deploy > New deployment > Select type: `Web app` > Description: `Initial deployment` > Execute as: `User accessing the web app` > Who has access: `Only myself` > Deploy > Click the Web app link
2. When presented with a modal titled *Gsheet Search (Unverified)*, select *Review Permissions > Select account > Allow*
3. Select *Deploy > Test deployments > Select type > Web app*

#### 5. Test that everything is working

1. Deploy > Test deployments > Web app > Click URL link > Check that the app loads

#### 6. Share the spreadsheet with any editors and app users

1. Open the spreadsheet
2. *Share > Add people and groups > [Enter email] > Editor*
