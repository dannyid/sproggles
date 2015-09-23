import searchGoogle from './modules/searchGoogle';
import calculateRankFromSerp from './modules/calculateRankFromSerp';
import {getSingleKeywordVolume} from './modules/getVolume';
import {generateUUID} from './modules/utils';
import Q from 'q';
import * as chromeStorage from './modules/chromeStorage';
import * as mixpanelEvents from './modules/mixpanelEvents';

// When clicked the browserAction toggles the App
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

/* Assign UUID upon install if the user doesn't already have one */
chrome.runtime.onInstalled.addListener(() => {
  const extensionId = chrome.i18n.getMessage('@@extension_id');

  /* Open intro page upon install or update */
  chrome.tabs.create({
    url: `chrome-extension://${extensionId}/html/intro.html`
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
