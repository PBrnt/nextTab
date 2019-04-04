'use strict';
/**
 * @author Paul Bournat
 * @version 2.0.1
 */

/** @global */
const { query, update } = browser.tabs;

browser.browserAction.onClicked.addListener(goToNextTab);

/**
 * When the button is clicked then the tab on the right of active one
 * in the current window is activated
 * @summary Go to next tab
 */
async function goToNextTab() {
  try {
    const currentTabIndex = await getCurrentTabIndex()

    const tabsNumber = await getTabsNumber();

    const nextTabIndex = getNextTabIndex(currentTabIndex, tabsNumber);
    const nextTabID = await getNextTabID(nextTabIndex);

    goToTab(nextTabID);
  } catch (error) {
    console.error(error.message);
  }
}

/** Get the current tab index */
const getCurrentTabIndex = async () =>
  (await query({ currentWindow: true, active: true }))[0].index;

/**
* Determine if the current tab is the last tab
* If it is the case then the next tab is the first at the very beginning
* @param {Number} currentTabIndex
* @param {Number} tabsNumber
*/
const getNextTabIndex = (currentTabIndex, tabsNumber) =>
  tabsNumber === currentTabIndex + 1 ? 0 : currentTabIndex + 1;

/** 
 * Get the next tab ID 
 * @param {Number} nextTabIndex
*/
const getNextTabID = async nextTabIndex =>
  (await query({ currentWindow: true, index: nextTabIndex }))[0].id;

/** Get the number of tabs */
const getTabsNumber = async () =>
  (await query({ currentWindow: true })).length;

/**
 * Activate the tab identified by the given ID number
 * @param {Number} id
 */
const goToTab = async tabID => await update(tabID, { active: true });
