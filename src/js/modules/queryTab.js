import * as mixpanelEvents from './mixpanelEvents';
import {createSelectors} from './utils';
import Q from 'q';

const tabLoadTimeout = [];
let giveUpTimeout = 0;

const {
  $spinner,
  $pleaseRefresh
} = createSelectors();

const getTabData = tabId => {
  const deferred = Q.defer();

  const sendMessage = () => {
    chrome.tabs.sendMessage(tabId, {get: "pageData"}, response => {
      if (typeof response === 'undefined') {
        chrome.tabs.executeScript(null, {file: "js/contentScript.js"});
        tabLoadTimeout.push(setTimeout(() => {
          sendMessage(tabId); // Try again
        }, 500));
      } else {
        deferred.resolve(response);
      }
    });
  };

  sendMessage();

  return deferred.promise;
};

const giveUp = () => {
  mixpanelEvents.popupFailed();

  $spinner.hide();
  $pleaseRefresh.fadeIn(150);

  tabLoadTimeout.forEach(clearTimeout);
};

export default () => {
  const deferred = Q.defer();

  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    const tabId = tabs[0].id;

    getTabData(tabId).then(tabData => {
      deferred.resolve(tabData);
      tabLoadTimeout.forEach(clearTimeout);
      clearTimeout(giveUpTimeout);
    });

    giveUpTimeout = setTimeout(giveUp, 6000);
  });

  return deferred.promise;
};
