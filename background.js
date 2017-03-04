"use strict";
/**
 * @author Paul Bournat
 * @version 1.0
 */

var query = browser.tabs.query;

/**
 * When the button is clicked then the tab on the right of active one
 * in the current window is activated
 * @summary Go to next tab
 */
browser.browserAction.onClicked.addListener(function () {
  getCurrentTabIndex().then(getNextTabID, onError).then(goToTab);
});

/**
 * Returns the index of the active tab in the current window
 * @returns {Number}
 */
function getCurrentTabIndex() {
  return query({currentWindow: true, active: true}).then(function (tabs) {
    return tabs[0].index;
  });
}

/**
 * Returns the ID of the first tab in the current window
 * @returns {Number}
 */
function getFirstTabID() {
  return query({currentWindow: true, index: 0}).then(function (tabs) {
    if (tabs.length === 1) {
      return tabs[0].id;
    } else {
      console.error("Error: Unable to get first tab id");
    }
  }, onError);
}

/**
 * Returns the ID of the tab following the one at the given index
 * in the current window
 * @param {Number} index
 * @returns {Number}
 */
function getNextTabID(index) {
  return query({currentWindow: true, index: index + 1}).then(function (tabs) {
    if (tabs.length === 1) {
      return tabs[0].id;
    } else {
      return getFirstTabID();
    }
  }, onError);
}

/**
 * Activate the tab identified by the given ID number
 * @param {Number} id
 */
function goToTab(id) {
  browser.tabs.update(id, {active: true}).then(null, onError);
}

function onError(error) {
  console.error(error.toString());
}
