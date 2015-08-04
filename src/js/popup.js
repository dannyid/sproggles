import $ from 'jquery';
import createFeedbackForm from './modules/createFeedbackForm';
import {createSelectors} from './modules/utils';
import * as mixpanelEvents from './modules/mixpanelEvents';
import {tabClickHandler, themeButtonClickHandler, feedbackButtonClickHandler} from './modules/clickHandlers';
import queryTab from './modules/queryTab';
import openSecretGoogleWindow from './modules/openSecretGoogleWindow';

$(() => {
  const {$tab, $themeButton, $feedbackButton} = createSelectors();

  mixpanelEvents.popupOpened();

  createFeedbackForm();

  $tab.click(tabClickHandler);
  $themeButton.click(themeButtonClickHandler);
  $feedbackButton.click(feedbackButtonClickHandler);

  queryTab();

  openSecretGoogleWindow('immersion blender');

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "rank") {
      console.log(request.results);
      chrome.windows.remove(sender.tab.windowId);
    }
  });
});
