/**
 * @file Code.gs
 * @summary Code file to use with a container-bound (spreadsheet attached) Apps Script project.
 * @see {@link https://github.com/dotherightthing/gsheet-search/blob/main/demo}
 */

/* eslint-disable no-unused-vars */
/* global cbConfig:writable */

// container-bound configuration
const cbConfig = {
  // Link to an image such as the one on your organisation's website
  imageLogo: 'https://via.placeholder.com/500x138/fff/000/png?text=Logo',
  // Name of your organisation
  organisationName: 'Busytown',
  // Title for the bookmarked web app
  pageTitle: 'Gsheet Search',
  // One or more sheets in your Google spreadsheet
  sheets: [
    {
      // Title shown in tab at bottom of Google spreadsheet
      title: 'Names',
      // Prefix you use when setting named ranges (GsSheet1Search, GsSheet1Result, GsSheet1DisplayGroupA, GsSheet1DisplayGroupB, GsSheet1DisplayGroupC)
      namedRangePrefix: 'GsSheet1',
    },
  ],
  // Copy and paste SPREADSHEET_ID from the spreadsheet URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=0
  spreadsheetId: '1DBYIoppZpZ1db6Vvg2LTm3zKvMnq0bEKOzEKGFcEvk4',
  // Whether the search results should remain visible while changing sheets
  filtersFocusTypeahead: true,
};
