import {get as $get} from 'jquery';
import prod from './productionCheck';
import {MIXPANEL_EVENT_URL, MIXPANEL_TOKEN} from './constants';
import Q from 'q';

function createEventJSON(eventName, specificElement) {
  let deferred = Q.defer();

  chrome.storage.sync.get('uuid', storage => {
    deferred.resolve(window.btoa(`{
      "event": "${eventName}",
      "properties": {
        "token": "${MIXPANEL_TOKEN}",
        "uuid": "${storage.uuid}",
        "specificElement": "${specificElement}"
      }
    }`));
  });

  return deferred.promise;
}

function createEvent(eventName) {
  return (specificElement) => {
    createEventJSON(eventName, specificElement)
    .then(eventData => {
      if (prod()) {
        $get(MIXPANEL_EVENT_URL + eventData, function(data) {
          console.log('Mixpanel event fired:', eventName);
        });
      } else {
        console.log(`'${eventName}' event not fired (because in QA)`);
      }
    });
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
