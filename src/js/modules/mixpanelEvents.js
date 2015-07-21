import {get as $get} from 'jquery';
import {mixpanelEventUrl, mixpanelToken} from './constants';

function createEventJSON(eventName) {
  return window.btoa(`{
    "event": "${eventName}",
    "properties": {
      "token": "${mixpanelToken}"
    }
  }`);
}

export function tabClicked(tabId) {
  const eventData = createEventJSON(`Clicked ${tabId} tab`);

  $get(mixpanelEventUrl + eventData, function(data) {
    console.log('Mixpanel click event fired: ', data);
  });
}

export function popupOpened() {
  const eventData = createEventJSON(`Popup opened`);

  $get(mixpanelEventUrl + eventData, function(data) {
    console.log('Mixpanel popup open event fired: ', data);
  });
}

export function popupFailed() {
  const eventData = createEventJSON(`Popup failed`);

  $get(mixpanelEventUrl + eventData, function(data) {
    console.log('Mixpanel popup failed event fired: ', data);
  });
}

export function darkThemeClicked() {
  const eventData = createEventJSON(`Dark theme clicked`);

  $get(mixpanelEventUrl + eventData, function(data) {
    console.log('Mixpanel dark theme click event fired: ', data);
  });
}

export function feedbackButtonClicked() {
  const eventData = createEventJSON(`Feedback button clicked`);

  $get(mixpanelEventUrl + eventData, function(data) {
    console.log('Mixpanel feedback button click event fired: ', data);
  });
}

export function colorCopied() {
  const eventData = createEventJSON(`Color copied to clipboard`);

  $get(mixpanelEventUrl + eventData, function(data) {
    console.log('Mixpanel color copied to clipboard event fired: ', data);
  });
}

