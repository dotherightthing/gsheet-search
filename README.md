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

This app is designed to be used by a single user per configured spreadsheet. Multiple consecutive users will overwrite each other's data.

## Integration with data source

The web app reads and writes from a Google Sheet. Google Apps Script offers the choice of a 'container-bound' (spreadsheet linked) or 'standalone' project.

This script is deployed as a 'standalone' project to ensure that integration and testing yields predictable results across both the original and any cloned/test spreadsheets.

### Gsheet Search web app

1. Link to the source spreadsheets via the `spreadsheetIds` object in `Main.js`

### Spreadsheet

Currently there is no extra functionality provided for the spreadsheet itself. Data is manually checked and groomed.

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

Due to issue [#1](https://github.com/dotherightthing/kaicycle-run-mobile-standalone/issues/1), this requires jumping over to the online development environment.

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
npx clasp push
```

##### Data

Data manipulation can be verified by viewing the source spreadsheet. A separate test sheet is used during development, to prevent accidental corruption of the original data.

Both spreadsheets are linked to the app via the `spreadsheetIds` object in `Main.gs`.

TODO: move [Gsheet Search Testsheet](https://docs.google.com/spreadsheets/d/1KdzxNoJLBijG4388dXTTSKQbSv5x17O76a4F9wPYgHc/edit#gid=867197459) to Google Doc.

##### Sync the Gsheet Search Testsheet to the Kaicycle Run spreadsheet

**Warning:** This overwrites all data in the test sheet!

1. Open the [Gsheet Search project](https://script.google.com/home/projects/19XgAvUOgCc8lFIswiDq5SjMhPfMnhNIXtVdwLDATmKqHm_qWOR8_j_3_/edit)
2. Open `Main.gs`
3. Run: `krmSyncRunSheets`

This overwrites the test sheet with the latest data (and formatting) from the master sheet.

#### Deploy

Visual and interactive testing requires viewing the web app.

```sh
# EITHER: Update the TEST BUILD then automatically open the web app
npm run preview
# OR: Update the TEST BUILD then manually open/refresh the web app
npx clasp push
```

This updates and opens the latest [TEST BUILD / [DEV]](https://script.google.com/macros/s/AKfycbyXIo-wDHA4IIzSsMAmcT97XUiFPaMdsUaI2vPnLX1s/dev) version of the web app.

This allows changes to be tested without impacting the STABLE BUILD of the web app.

Note: In the online IDE, this *Web app URL* is accessed under *Test deployments*.

#### Publish

The initial deployment must be done from the IDE: *Deploy > New deployment*.

Thereafter, deployments can be managed from the commandline:

```sh
# Update the STABLE BUILD
npm run publish --krmmessage="VERSION_DESCRIPTION"
```

This updates and opens the latest [STABLE BUILD / [STABLE]](https://script.google.com/macros/s/AKfycbyFMw-ILDiJD6E1oWd7Gv6UkQSAkNZ5OezOcTAWjqoNgtkM2X5ZUDfK1Afp3Ih_mn0PYg/exec) version of the web app.

Then:

1. Open ['Kaicycle Run & customer details' Apps Script, in the online IDE](https://script.google.com/home/projects/1GtG5NW7WasptRV9upomoeL2ezZ4XHj008iO0XKqp8XC9hI1F1szWZR3H/edit)
2. Open `appsscript.json`
3. Change `dependencies.libraries.version` to the deployed version (integer)
4. Save changes

### Code documentation

The [MAN](MAN.md)ual is generated from JSDoc comments in the sourcecode (*Local development* only).

## Using the app

### 1. Share the master spreadsheet with any editors and app users

1. Open ['Kaicycle Run & customer details' spreadsheet](https://docs.google.com/spreadsheets/d/1Vn2RNqZ_SmS5Tw3W9RAy_V9SHfzZzoyGPGtT-BzKrxs/edit#gid=1582070571)
2. *Share > Add people and groups > [Enter email] > Editor*

Note:

* The app reads and writes company data, therefore you will need permission to edit the spreadsheet in order to access the app.
* If the spreadsheet is not shared, the user may still be able to view it, but they will not see the dropdown menus or the *Kaicycle Help* menu item, and the app will not be able to write to it.

### 2a. Spreadsheet users - share the Apps Script project, which is linked to the spreadsheet as a code library

1. Open the ['Gsheet Search' project](https://script.google.com/home/projects/19XgAvUOgCc8lFIswiDq5SjMhPfMnhNIXtVdwLDATmKqHm_qWOR8_j_3_/edit)
2. *Share this project with others > Add people and groups > [Enter email] > Editor*.

Note:

* *Viewer* access only provides access to the [STABLE/deployed]((https://script.google.com/macros/s/AKfycbyFMw-ILDiJD6E1oWd7Gv6UkQSAkNZ5OezOcTAWjqoNgtkM2X5ZUDfK1Afp3Ih_mn0PYg/exec)) version of the app
* *Editor* also provides access to the *Deploy* menu and in turn the [DEV/Head]((https://script.google.com/macros/s/AKfycbyXIo-wDHA4IIzSsMAmcT97XUiFPaMdsUaI2vPnLX1s/exec)) version of the app.

### 2b. App users - share the GCP (Google Cloud Platform) project (during development)

During development, the app has a status of *testing* rather than *in production*. While in testing, only test users may access the app.

Add a test user:

1. Open [the script's parent GCP (Google Cloud Platform) project](https://console.cloud.google.com/apis/credentials/consent?authuser=0&project=gsheet-search)
2. *OAuth user cap > Test users > + ADD USERS*
3. This user is now allowed to access the STABLE version. The DEV version will show a prompt to 'Request access'.

### Data integrity

The good functioning of the app is dependent on the structure of the source spreadsheet being maintained.

Brittleness is mitigated somewhat by referencing strings/labels rather than ranges/locations:

* Column headers - Row and column containing header strings
* Named ranges
* Run range - e.g. Row containing "MT VIC RUN", down to the row containing "MT COOK RUN"
* etc

## Roadmap

See the project [milestones](https://github.com/dotherightthing/gsheet-search/milestones):

1. [UX](https://github.com/dotherightthing/gsheet-search/milestone/6)
1. [Stabilisation](https://github.com/dotherightthing/gsheet-search/milestone/4)
1. [Performance](https://github.com/dotherightthing/gsheet-search/milestone/2)
1. [Security & permissions](https://github.com/dotherightthing/gsheet-search/milestone/3)
1. [Content](https://github.com/dotherightthing/gsheet-search/milestone/7)
1. [Customisation](https://github.com/dotherightthing/gsheet-search/milestone/5)
