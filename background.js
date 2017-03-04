"use strict";
/**
 * @author Paul Bournat
 * @version 2.0
 */

/** @global */
const QUERY = chrome.tabs.query;

/**
 * When the button is clicked then the tab on the right of active one
 * in the current window is activated
 * @summary Go to next tab
 */
chrome.browserAction.onClicked.addListener(getCurrentTab);

/** Get the current tab object */
function getCurrentTab() {
  QUERY({"currentWindow": true, "active": true}, getNextTab);
}

/**
* Get the following tab of the current one
* @param {Tab[]} tabs
*/
function getNextTab(tabs) {
  QUERY({"currentWindow": true, "index": tabs[0].index + 1}, identifyNextTab);
}

/**
* Determine if there is a tab to the left of the current one or not
* If it is not the case then the next tab is the first at the very beginning
* @param {Tab[]} tabs
*/
function identifyNextTab(tabs) {
  if (tabs.length === 1) {
    goToTab(tabs[0].id);
  } else {
    getFirstTab();
  }
}

/** Get the tab at the very beginning */
function getFirstTab() {
  QUERY({"currentWindow": true, "index": 0}, function (tabs) {
    goToTab(tabs[0].id);
  });
}

/**
 * Activate the tab identified by the given ID number
 * @param {Number} id
 */
function goToTab(id) {
  chrome.tabs.update(id, {"active": true});
}
