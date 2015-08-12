import $ from 'jquery';
import * as mixpanelEvents from './modules/mixpanelEvents';
import createFeedbackForm from './modules/createFeedbackForm';
import {createSelectors} from './modules/utils';
import {tabClickHandler, themeButtonClickHandler, feedbackButtonClickHandler} from './modules/clickHandlers';
import getColors from './modules/getColors';
import getFonts from './modules/getFonts';
import getImages from './modules/getImages';
import getSerp from './modules/getSerp';
import getSocialCounts from './modules/getSocialCounts';
import queryTab from './modules/queryTab';
import {getKeywordInfo, injectKeywordInfo, injectKeywordError} from './modules/keywordSeoInfo';
import {colorSquareClickListener} from './modules/clickHandlers';
import Q from 'q';

$(() => {
  const {
    $tab,
    $themeButton,
    $feedbackButton,
    $colorsTab,
    $fontsTab,
    $imagesTab,
    $spinner,
    $tabPanel,
    $pleaseRefresh
  } = createSelectors();

  mixpanelEvents.popupOpened();

  createFeedbackForm();

  $tab.click(tabClickHandler);
  $themeButton.click(themeButtonClickHandler);
  $feedbackButton.click(feedbackButtonClickHandler);

  queryTab().then(response => {
    console.log(response);
    const coloredDivs = getColors(response.colors);
    const fontDivs = getFonts(response.fonts);
    const imageDivs = getImages(response.images);

    /* Inject page data from content script */
    $colorsTab.append(coloredDivs);
    colorSquareClickListener().attach();

    $fontsTab.append(fontDivs);
    $imagesTab.append(imageDivs);

    $spinner.hide();
    $pleaseRefresh.hide();
    $tabPanel.fadeIn(150);

    getSerp(response.url);
    getSocialCounts(response.url).getAll();

    $('.derived-keywords form').submit(function(e) {
      e.preventDefault();
      const keyword = $(e.target).find('input').val();
      getKeywordInfo(keyword, response.url).then(injectKeywordInfo);
    });
  });
});
