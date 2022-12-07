# Gsheet Search

## About the app

This is a smartphone-friendly web app for a simple Google Sheet containing business information for many clients.

* built using [Google Apps Script](https://developers.google.com/apps-script/reference) ([report a bug / request a feature](https://developers.google.com/apps-script/support))
* with a custom page template using the [Html Service](https://developers.google.com/apps-script/guides/html)
* querying and updating spreadsheet data using the [Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet).

This app seeks to bypass usability issues present in the Google Sheets mobile app:

* Attention needed to scroll 400+ rows of data while navigating the lift/stairs
* Business names may be recorded in several different ways (e.g. *NZ Business*, vs *The NZ Business*, vs *BUS (NZ Business)*, vs *New Zealand Business*)

## Integration with data source

The web app reads and writes from a Google Sheet. The good functioning of the app is therefore dependent on the structure of the source spreadsheet being maintained.

## Architecture

This script is deployed as a 'standalone' project to allow it to be used as a library with minimal coding.

## Credits

<https://everythingbusytown.fandom.com/wiki/List_of_Busytown_characters>

---

## Using the app

See the [demo](demo/).
