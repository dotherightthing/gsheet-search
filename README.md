# Gsheet Search

## About the app

This is a smartphone-friendly web app for a simple Google Sheet containing business information for many clients.

* built using [Google Apps Script](https://developers.google.com/apps-script/reference) ([report a bug / request a feature](https://developers.google.com/apps-script/support))
* with a custom page template using the [Html Service](https://developers.google.com/apps-script/guides/html)
* querying and updating spreadsheet data using the [Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet).

This app seeks to bypass usability issues present in the Google Sheets mobile app:

* Attention needed to scroll 400+ rows of data while navigating the lift/stairs
* Business names may be recorded in several different ways (e.g. `NZ Business`, vs `The NZ Business`, vs `BUS (NZ Business)`, vs `New Zealand Business`)
* Difficult to copy and paste result into another app, or share a record with another person (need to remember and retype)
* Quicker to add new data to a notepad app than to enter it into the spreadsheet, creating maintenance work later on

## Single-user

This app is designed to be used by a single user per configured spreadsheet.

Although editing is not currently supported, when it is multiple consecutive users will overwrite each other's data.

## Integration with data source

The web app reads and writes from a Google Sheet. Google Apps Script offers the choice of a 'container-bound' (spreadsheet linked) or 'standalone' project.

This script is deployed as a 'standalone' project to ensure that integration and testing yields predictable results across both the original and any cloned/test spreadsheets.

## Architecture

This project us based on the `krm` project:

* that project is not used as a library except for unit testing
* a global variable is directly assigned to the app config
* other global variables are directly assigned to class instances
* all of these globals can be referenced anywhere

This project differs in the following ways:

* the project can be used as a library
* presumably the library loads, and then the host project runs its code
* so the host project can't set globals for use by the library
* and it would be intimidating and error prone to expect non-devs to do the instantiation inside the host project
* so the app config is passed into the app and this is the only way the app can see it
* so therefore the class instances would also need to be passed in
* or global settings managed in a different way, e.g. script/document properties
* currently this is resolved by instantiating required classes inside constructors
* configuring them with the config object passed to the constructor

## Developing the app

### Prerequisites

#### Create an Apps Script project to host the code

1. <https://script.google.com/> > *Start scripting* > Log in
2. <https://script.google.com/> > *New project* > *Untitled project* > type *Gsheet Search*
3. *Project Settings* (cog icon) > *Show "appsscript.json" manifest file in editor*
4. *Project Settings* (cog icon) > *Script ID* > *Copy* (this is the same ID as shown in the URL i.e. `https://script.google.com/home/projects/{ID}`)

### Setup

Application files are stored in the *Gsheet Search* *Apps Script* project (see *Prerequisites*), and in this *Github* repository.

#### Online development

Application code may be edited and deployed using the *Apps Script* project IDE (<https://script.google.com/> > *My Projects* > *Gsheet Search* > *Editor*), which is similar to VSCode.

#### Local development

Alternatively, application code can be cloned to your local development environment using [clasp](https://github.com/google/clasp). This simplifies some aspects of development and allows the code to be checked into version control (this repo).

This [Medium article about clasp](https://medium.com/geekculture/how-to-write-google-apps-script-code-locally-in-vs-code-and-deploy-it-with-clasp-9a4273e2d018) outlines the benefits of this approach.

To configure the CLASP configuration file:

1. Open `.clasp.json`
2. Locate the `scriptId` property and change its value to your script ID

Then:

```sh
npm install
npx clasp login
```

Note that the same JavaScript files have the `.gs` file extension on the *Apps Script* platform, and the `.js` file extension when doing local development.

### Workflow

#### Sync

Get the latest code from the server, to capture changes from any developers not using the Github repo.

```sh
npx clasp pull
```

#### Develop

Code execution can be tested by directly calling the serverside functions contained in `Main.js`.

This is a great way to get developer-friendly error messages, rather than the user-friendly ones provided in-app.

Currently this requires jumping over to the online development environment.

```sh
npm run editor
# 'Select function to run' from the dropdown:
# doGet - tests the template generation
# Click 'Run'
```

#### Test

##### Linting

A Husky Git Hook triggers the following tasks whenever code is pushed to Github:

1. linting of CSS files
1. linting of JavaScript files
1. rebuild of the JavaScript documentation (MANual)

##### Functions

Input handling is tested by running Qunit tests on the latest code (aka the TEST BUILD).

Application files are stored in the *Gsheet Search tests* *Apps Script* project, and in the [Gsheet Search tests repository](https://github.com/dotherightthing/gsheet-search-tests). See that repository's README for more information.

```sh
# EITHER: Update the TEST BUILD then automatically open the test results page
npm run test
# OR: Update the TEST BUILD then manually open/refresh the test results page
npm run clasp:push
```

##### Data

Data manipulation can be verified by viewing the source spreadsheet.

The spreadsheet is linked to the app via the `spreadsheetIds` object in `Main.gs`.

#### Deploy

Visual and interactive testing requires viewing the web app.

```sh
# EITHER: Update the TEST BUILD then automatically open the web app
npm run preview
# OR: Update the TEST BUILD then manually open/refresh the web app
npm run clasp:push
```

This updates and opens the latest DEV version of the web app.

This allows changes to be tested without impacting the STABLE of the web app.

Note: In the online IDE, this *Web app URL* is accessed under *Test deployments*.

#### Publish

The initial deployment must be done from the IDE: *Deploy > New deployment*.

Thereafter, deployments can be managed from the commandline:

```sh
# Update the STABLE BUILD
npm run publish --gsmessage="VERSION_DESCRIPTION"
```

This updates and opens the latest STABLE version of the web app.

Then:

1. Open the Apps Script project in the online IDE
2. Open `appsscript.json`
3. Change `dependencies.libraries.version` to the deployed version (integer)
4. Save changes

### Code documentation

The [MAN](MAN.md)ual is generated from JSDoc comments in the sourcecode (*Local development* only).

## Using the app

### 1. Set up your spreadsheet

Example spreadsheet:

| Business    | Address        | Phone       |
|-------------|----------------|-------------|
| AB Creative | 12 Main St     | 04 123 4567 |
| DEF Jams    | 345 The Parade | 07 891 2345 |

Note: If you multiple sheets, use the `namedRangePrefix` option in the `sheets` array to use differentiate named ranges on additional sheets. For example, `GsSheet1...` could reference your first sheet, and `GsSheet2...` your second. The examples below use a prefix of `GsSheet1` to indicate the first sheet.

#### 1a. Specify `GsSheet1Search`

1. In Google Sheets, select all cells in whichever row contains your column headers. These columns will be used to provide search data and search result filtering.
2. Select `Data > Named Ranges > "GsSheet1Search" > Done`

In the example above you would select the cells containing `Business`, `Address` and `Phone`. `Phone` will also be our `GsResultHeader`, but the app will automatically exclude this column from the search data.

#### 1b. Specify the `GsSheet1Result`

1. In Google Sheets, select only one column in whichever row contains your column headers. This column will be used to provide search results. This columns will also appear in grid area `result` (or `results`) of the layout.
2. Select `Data > Named Ranges > "GsSheet1Result" > Done`

In the example above you would select the cell containing `Phone`. This would allow you to search by `Business` or `Address`, in order to find the corresponding `Phone` number.

#### 1c. Specify `GsSheet1DisplayGroupA`

1. In Google Sheets, select one or more column in whichever row contains your column headers. These columns will appear in grid area `a` of the layout.
2. Select `Data > Named Ranges > "GsSheet1DisplayGroupA" > Done`

#### 1d. Specify `GsSheet1DisplayGroupB`

1. In Google Sheets, select one or more column in whichever row contains your column headers. These columns will appear in grid area `b` of the layout.
2. Select `Data > Named Ranges > "GsSheet1DisplayGroupB" > Done`

#### 1e. Specify `GsSheet1DisplayGroupC`

1. In Google Sheets, select one or more column in whichever row contains your column headers. These columns will appear in grid area `c` of the layout.
2. Select `Data > Named Ranges > "GsSheet1DisplayGroupC" > Done`

#### 1f. Link the spreadsheet to the app

1. Open the Apps Script editor
2. Update the `spreadsheetId` value and `sheets` array in `Init.js.html`

### 2. Share the spreadsheet with any editors and app users

1. Open the spreadsheet
2. *Share > Add people and groups > [Enter email] > Editor*

Note:

* The app reads and writes company data, therefore you will need permission to edit the spreadsheet in order to access the app.
* If the spreadsheet is not shared, the user may still be able to view it, but the app will not be able to write to it.

### 3a. Spreadsheet users - share the Apps Script project, which is linked to the spreadsheet as a code library

1. Open the 'Gsheet Search' project
2. *Share this project with others > Add people and groups > [Enter email] > Editor*.

Note:

* *Viewer* access only provides access to the STABLE/deployed version of the app
* *Editor* also provides access to the *Deploy* menu and in turn the DEV/Head version of the app.

### 3b. App users - share the GCP (Google Cloud Platform) project (during development)

During development, the app has a status of *testing* rather than *in production*. While in testing, only the developer and any test users may access the app.

Add a test user:

1. Open the script's parent GCP (Google Cloud Platform) project
2. *OAuth user cap > Test users > + ADD USERS*
3. This user is now allowed to access the STABLE version. The DEV version will show a prompt to 'Request access'.

### Data integrity

The good functioning of the app is dependent on the structure of the source spreadsheet being maintained.
