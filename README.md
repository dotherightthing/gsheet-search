# Gsheet Search

## About the app

This is a smartphone-friendly web app for a simple Google Sheet containing business information for many clients.

* built using [Google Apps Script](https://developers.google.com/apps-script/reference) ([report a bug / request a feature](https://developers.google.com/apps-script/support))
* with a custom page template using the [Html Service](https://developers.google.com/apps-script/guides/html)
* querying and updating spreadsheet data using the [Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet).

This app seeks to bypass usability issues present in the Google Sheets mobile app:

* Attention needed to scroll 400+ rows of data while navigating the lift/stairs
* Business names may be recorded in several different ways (e.g. *NZ Business*, vs *The NZ Business*, vs *BUS (NZ Business)*, vs *New Zealand Business*)
* Difficult to copy and paste result into another app, or share a record with another person (need to remember and retype)
* Quicker to add new data to a notepad app than to enter it into the spreadsheet, creating maintenance work later on

## Integration with data source

The web app reads and writes from a Google Sheet. The good functioning of the app is therefore dependent on the structure of the source spreadsheet being maintained.

## Architecture

This script is deployed as a 'standalone' project to allow it to be used as a library with minimal coding.

---

## Using the app

### 1. Create or configure your spreadsheet

Example spreadsheet:

| Business    | Address        | Phone       |
|-------------|----------------|-------------|
| AB Creative | 12 Main St     | 04 123 4567 |
| DEF Jams    | 345 The Parade | 07 891 2345 |

### 2. Add named ranges to your spreadsheet

Note: If you multiple sheets, use the `namedRangePrefix` option in the `sheets` array to use differentiate named ranges on additional sheets. For example, `GsSheet1...` could reference your first sheet, and `GsSheet2...` your second. The examples below use a prefix of `GsSheet1` to indicate the first sheet.

#### `GsSheet1Result`

1. In Google Sheets, select only one column in whichever row contains your column headers. This column will be used to provide search results. This columns will also appear in grid area `result` (or `results`) of the layout.
2. Select *Data > Named Ranges > "GsSheet1Result" > Done*

In the example above you would select the cell containing *Phone*. This would allow you to search by *Business* or *Address*, in order to find the corresponding *Phone* number.

#### `GsSheet1Search`

1. In Google Sheets, select all cells in whichever row contains your column headers. These columns will be used to provide search data and search result filtering.
2. Select *Data > Named Ranges > "GsSheet1Search" > Done*

In the example above you would select the cells containing *Business*, *Address* and *Phone*. *Phone* will also be our `GsSheet1Result`, but the app will automatically exclude this column from the search data.

#### `GsSheet1DisplayGroupA`

1. In Google Sheets, select one or more column in whichever row contains your column headers. These columns will appear in grid area `a` of the layout.
2. Select *Data > Named Ranges > "GsSheet1DisplayGroupA" > Done*

#### `GsSheet1DisplayGroupB`

1. In Google Sheets, select one or more column in whichever row contains your column headers. These columns will appear in grid area `b` of the layout.
2. Select *Data > Named Ranges > "GsSheet1DisplayGroupB" > Done*

#### `GsSheet1DisplayGroupC`

1. In Google Sheets, select one or more column in whichever row contains your column headers. These columns will appear in grid area `c` of the layout.
2. Select *Data > Named Ranges > "GsSheet1DisplayGroupC" > Done*

### 3. Create an Apps Script project to host the code

1. Open the Google Sheet you want to be able to search
2. Select *Extensions > Apps Script* to open the Apps Script editor
3. Click on *Untitled project* and change the name to *Gsheet Search*, or something memorable
4. Select *Editor > Libraries > Add a Library* (+ icon) *> Script ID > `1_5vomwUsWKlMA07DtaWmGBJlup7M-kCIhcnVhH4PdLf_pgGNmqPTxoHj` > Add*
5. Select *Deploy > New deployment > Select type > Web app > Description: "Initial release" > Execute as: User accessing the web app > Who has access: any option > Deploy > Click the Web app link*
6. When presented with a modal titled *Gsheet Search (Unverified)*, select *Review Permissions > Select account > Allow*
7. Select *Deploy > Test deployments > Select type > Web app*

### 4. Configure the web app

1. Open the Apps Script editor
2. Paste in the contents of *demo/Code.js*
3. Edit the contents to suit your spreadsheet

### 5. Share the spreadsheet with any editors and app users

1. Open the spreadsheet
2. *Share > Add people and groups > [Enter email] > Editor*

Note:

* The app reads and writes company data, therefore you will need permission to edit the spreadsheet in order to access the app.
* If the spreadsheet is not shared, the user may still be able to view it, but the app will not be able to write to it.
