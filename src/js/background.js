import searchGoogle from './modules/searchGoogle';
import calculateRankFromSerp from './modules/calculateRankFromSerp';
import {getSingleKeywordVolume} from './modules/getVolume';
import {generateUUID} from './modules/utils';
import {CURRENT_EXTENSION_ID, VERSION_NUMBER} from './modules/constants';
import Q from 'q';
import * as chromeStorage from './modules/chromeStorage';
import * as mixpanelEvents from './modules/mixpanelEvents';

// Delete state if prior to version 0.3.4
// At 0.3.4 the formatting of the data saved to Chrome storage changed
if (+VERSION_NUMBER.split('.')[1] <= 3 && +VERSION_NUMBER.split('.')[2] < 4) {
  chrome.storage.local.get(result => {
    Object.keys(result).forEach(entry => {
      chrome.storage.local.remove(entry);
    })
  });
}

/*
  When clicked, the browserAction sends a
  message to the content script to toggle the App
*/
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {action: "toggleApp"});
  });
});

/* When asked for keyword info from page, get it and send it back */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getKeywordInfo") {
    const {keyword, url} = request;

    Q.all([
      getSingleKeywordVolume(keyword),
      searchGoogle(keyword)
        .then(results => calculateRankFromSerp(results, url))
    ])
    .spread((volume, rank) => sendResponse({
      rank,
      volume,
      keyword,
      url
    }));

    return true; /* Needed for async sendResponse to work properly */
  }
});

chrome.runtime.onInstalled.addListener(() => {
  /* Open intro page upon install or update */
  chrome.tabs.create({
    url: `chrome-extension://${CURRENT_EXTENSION_ID}/html/intro.html`
  });

  /* Generate UUID or get the one that's already generated */
  chrome.storage.sync.get('uuid', storage => {
    if (typeof storage.uuid === 'undefined') {
      const newUUID = generateUUID();

      chrome.storage.sync.set({
        uuid: newUUID
      }, () => {
        console.log('Created new UUID:', newUUID);
        mixpanelEvents.firstInstalled();
      });
    } else {
      console.log('User already has UUID:', storage.uuid);
    }
  });
});
