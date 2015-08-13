import searchGoogle from './modules/searchGoogle';
import calculateRankFromSerp from './modules/calculateRankFromSerp';
import {getSingleKeywordVolume} from './modules/getVolume';
import {generateUUID} from './modules/utils';
import Q from 'q';
import * as chromeStorage from './modules/chromeStorage';
import * as mixpanelEvents from './modules/mixpanelEvents';

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
