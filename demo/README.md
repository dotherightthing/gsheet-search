# GS Demo

Regardless of whether you choose to set up your own standalone project or reuse the existing one, you will need to set up an Apps Script project which is attached to your spreadsheet document (i.e. 'container-bound').

This will allow you to:

* configure and deploy the web app

## Setup

### 1. Create an Apps Script project which is linked to your spreadsheet

1. Open a Google spreadsheet
2. Extensions > Apps Script
3. Click on `Untitled project` to rename it > `GS Host App` (or something else)

### 2. Add the Apps Script config

1. Project settings > General settings > Check `Show "appsscript.json" manifest file in editor`
2. Copy the contents of [demo/appsscript.json](https://github.com/dotherightthing/gsheet-search/blob/main/demo/appsscript.json) to `appsscript.json`
3. If you have edited the codebase to create your own standalone project, replace the Script ID in `appsscript.json` with your own

### 3. Add the app config and triggers

1. Copy the contents of [demo/Code.js](https://github.com/dotherightthing/gsheet-search/blob/main/demo/Code.js) to `Code.gs` (`.js` files have a `.gs` extension in the Apps Script editor)
2. Customise the `hostConfig` object to configure the app to your needs
    * Further information on each configuration option can be found by opening
      [the manual](https://github.com/dotherightthing/gsheet-search/blob/main/MAN.md)
      and searching for the configuration option:
      e.g. In Firefox: Edit > Find in page > `organisationName`
3. The `doGet` function runs the app from a web browser

### 4. Create an initial deployment of the Apps Script project to enable testing

1. Deploy > New deployment > Select type: `Web app` > Description: `Initial deployment` > Execute as: `User accessing the web app` > Who as access: `Only myself` > Deploy

### 5. Test that everything is working

1. Deploy > Test deployments > Web app > Click URL link > Check that the app loads
