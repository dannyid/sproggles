import $ from 'jquery';
import createFeedbackForm from './modules/createFeedbackForm';
import {createSelectors} from './modules/utils';
import * as mixpanelEvents from './modules/mixpanelEvents';
import {tabClickHandler, themeButtonClickHandler, feedbackButtonClickHandler} from './modules/clickHandlers';
import queryTab from './modules/queryTab';

$(() => {
  const {$tab, $themeButton, $feedbackButton} = createSelectors();

  mixpanelEvents.popupOpened();

  createFeedbackForm();

  $tab.click(tabClickHandler);
  $themeButton.click(themeButtonClickHandler);
  $feedbackButton.click(feedbackButtonClickHandler);

  queryTab();
});
