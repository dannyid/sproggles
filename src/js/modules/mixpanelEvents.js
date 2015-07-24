import {get as $get} from 'jquery';
import prod from './productionCheck';
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
  if (prod()) {
    $get(MIXPANEL_EVENT_URL + eventData, function(data) {
      console.log('Mixpanel click event fired: ', data);
    });
  } else {
    console.log('In QA so no event fired');
  }
}

export function popupOpened() {
  const eventData = createEventJSON(`Popup opened`);
  if (prod()) {
    $get(MIXPANEL_EVENT_URL + eventData, function(data) {
      console.log('Mixpanel popup open event fired: ', data);
    });
  } else {
    console.log('In QA so no event fired');
  }
}

export function popupFailed() {
  const eventData = createEventJSON(`Popup failed`);
  if (prod()) {
    $get(MIXPANEL_EVENT_URL + eventData, function(data) {
      console.log('Mixpanel popup failed event fired: ', data);
    });
  } else {
    console.log('In QA so no event fired');
  }
}

export function darkThemeClicked() {
  const eventData = createEventJSON(`Dark theme clicked`);
  if (prod()) {
    $get(MIXPANEL_EVENT_URL + eventData, function(data) {
      console.log('Mixpanel dark theme click event fired: ', data);
    });
  } else {
    console.log('In QA so no event fired');
  }
}

export function feedbackButtonClicked() {
  const eventData = createEventJSON(`Feedback button clicked`);
  if (prod()) {
    $get(MIXPANEL_EVENT_URL + eventData, function(data) {
      console.log('Mixpanel feedback button click event fired: ', data);
    });
  } else {
    console.log('In QA so no event fired');
  }
}

export function colorCopied() {
  const eventData = createEventJSON(`Color copied to clipboard`);
  if (prod()) {
    $get(MIXPANEL_EVENT_URL + eventData, function(data) {
      console.log('Mixpanel color copied to clipboard event fired: ', data);
    });
  } else {
    console.log('In QA so no event fired');
  }
}

