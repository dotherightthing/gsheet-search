/**
 * @file GsUiCss.js
 */
class GsUiCss extends GsUi {
  /**
   * @class
   * @summary Manage dynamic CSS
   * @public
   * @param {object} config                  - Module configuration.
   * @param {Array}  config.fixedPositionIds - IDs of elements that use fixed positioning, used to generate CSS variables
   */
  constructor(config = {}) {
    super();

    // accepts an object of named arguments
    this.fixedPositionIds = config.fixedPositionIds;

    // subscribe to other module's events

    pubsub.subscribe([ 'domready' ], (data) => {
      this.injectHeightVariables(); // handles any new elements added
    });

    pubsub.subscribe('windowLoad', () => {
      this.injectHeightVariables();
    });
  }

  /* Getters and Setters */

  /**
   * fixedPositionIds
   *
   * @type {Array}
   */
  get fixedPositionIds() {
    return this._fixedPositionIds;
  }

  set fixedPositionIds(fixedPositionIds) {
    this._fixedPositionIds = gsValidateInstance.validate(fixedPositionIds, 'Array', 'GsUiCss.fixedPositionIds');
  }

  /* Instance methods */

  /**
   * injectHeightVariables
   *
   * @summary Store heights of fixed position elements
   */
  injectHeightVariables() {
    const {
      fixedPositionIds,
    } = this;

    const styleEl = document.getElementById('heights'); // <style></style>
    let cssVariables = '';

    fixedPositionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el !== null) {
        cssVariables += `
--height-fixed-${id}: ${el.offsetHeight / 16}rem;`;
      }
    });

    const styles = `

:root {
  ${cssVariables}
}
`;

    styleEl.innerHTML = styles;
  }
}
