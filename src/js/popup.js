import $ from 'jquery';
import createFeedbackForm from './modules/createFeedbackForm';
import {createSelectors} from './modules/utils';
import * as mixpanelEvents from './modules/mixpanelEvents';
import {tabClickHandler, themeButtonClickHandler} from './modules/clickHandlers';
import queryTab from './modules/queryTab';

$(() => {
  const {$tab, $themeButton} = createSelectors();

  mixpanelEvents.popupOpened();

  createFeedbackForm();

  $tab.click(tabClickHandler);
  $themeButton.click(themeButtonClickHandler);

  queryTab();
});
