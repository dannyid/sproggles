import {get as $get} from 'jquery';
import prod from './productionCheck';
import {MIXPANEL_EVENT_URL, MIXPANEL_TOKEN, VERSION_NUMBER, USER_AGENT} from './constants';
import Q from 'q';

function createEventJSON(eventName, specificElement) {
  const deferred = Q.defer();

  chrome.storage.sync.get('uuid', storage => {
    deferred.resolve(window.btoa(`{
      "event": "${eventName}",
      "properties": {
        "version": "${VERSION_NUMBER}",
        "token": "${MIXPANEL_TOKEN}",
        "uuid": "${storage.uuid}",
        "userAgent": "${USER_AGENT}",
        "specificElement": "${specificElement}"
      }
    }`));
  });

  return deferred.promise;
}

function fireMixpanelEvent(eventData) {
  if (prod()) {
    $get(MIXPANEL_EVENT_URL + eventData, function(data) {
      console.log('Mixpanel event fired.');
    });
  } else {
    console.log(`Mixpanel event not fired (because in QA)`);
  }
}

function createEvent(eventName) {
  return (specificElement) => {
    return createEventJSON(eventName, specificElement)
    .then(fireMixpanelEvent);
  };
}

export const tabClicked = createEvent('Tab clicked');
export const popupOpened = createEvent('Popup opened');
export const popupFailed = createEvent('Popup failed');
export const darkThemeClicked = createEvent('Dark theme clicked');
export const feedbackButtonClicked = createEvent('Feedback button clicked');
export const colorCopied = createEvent('Color copied to clipboard');
export const firstInstalled = createEvent('Extension first installed');
export const feedbackSubmitted = createEvent('Feedback submitted');
export const keywordSearched = createEvent('Keyword searched');
export const refreshGoogleResult = createEvent('Refresh Google result');
export const refreshSocialCounts = createEvent('Refresh social counts');
