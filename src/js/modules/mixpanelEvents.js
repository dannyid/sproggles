import {get as $get} from 'jquery';
import {MIXPANEL_EVENT_URL, MIXPANEL_TOKEN} from './constants';

function createEventJSON(eventName) {
  return window.btoa(`{
    "event": "${eventName}",
    "properties": {
      "token": "${MIXPANEL_TOKEN}"
    }
  }`);
}

export function tabClicked(tabId) {
  const eventData = createEventJSON(`Clicked ${tabId} tab`);

  $get(MIXPANEL_EVENT_URL + eventData, function(data) {
    console.log('Mixpanel click event fired: ', data);
  });
}

export function popupOpened() {
  const eventData = createEventJSON(`Popup opened`);

  $get(MIXPANEL_EVENT_URL + eventData, function(data) {
    console.log('Mixpanel popup open event fired: ', data);
  });
}

export function popupFailed() {
  const eventData = createEventJSON(`Popup failed`);

  $get(MIXPANEL_EVENT_URL + eventData, function(data) {
    console.log('Mixpanel popup failed event fired: ', data);
  });
}

export function darkThemeClicked() {
  const eventData = createEventJSON(`Dark theme clicked`);

  $get(MIXPANEL_EVENT_URL + eventData, function(data) {
    console.log('Mixpanel dark theme click event fired: ', data);
  });
}

export function feedbackButtonClicked() {
  const eventData = createEventJSON(`Feedback button clicked`);

  $get(MIXPANEL_EVENT_URL + eventData, function(data) {
    console.log('Mixpanel feedback button click event fired: ', data);
  });
}

export function colorCopied() {
  const eventData = createEventJSON(`Color copied to clipboard`);

  $get(MIXPANEL_EVENT_URL + eventData, function(data) {
    console.log('Mixpanel color copied to clipboard event fired: ', data);
  });
}

