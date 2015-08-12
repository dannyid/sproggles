import * as mixpanelEvents from './mixpanelEvents';
import {createSelectors} from './utils';
import Q from 'q';

const tabLoadTimeout = [];
let giveUpTimeout = 0;

const {
  $spinner,
  $pleaseRefresh
} = createSelectors();

const getTabData = (tabs) => {
  const deferred = Q.defer();

  chrome.tabs.sendMessage(tabs[0].id, {get: "pageData"}, (response) => {
    if (typeof response === 'undefined') {
      chrome.tabs.executeScript(null, {file: "js/contentScript.js"});
      tabLoadTimeout.push(setTimeout(getTabData, 500));
    } else {
      deferred.resolve(response);
    }
  });

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

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    getTabData(tabs).then(tabData => {
      deferred.resolve(tabData);
      tabLoadTimeout.forEach(clearTimeout);
      clearTimeout(giveUpTimeout);
    });

    giveUpTimeout = setTimeout(giveUp, 6000);
  });

  return deferred.promise;
};
