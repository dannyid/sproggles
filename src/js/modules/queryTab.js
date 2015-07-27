import getColors from './getColors';
import getFonts from './getFonts';
import getImages from './getImages';
import getSerp from './getSerp';
import getSocialCounts from './getSocialCounts';
import {createSelectors} from './utils';
import * as mixpanelEvents from './mixpanelEvents';
import {colorSquareClickListener} from './clickHandlers';

const tabLoadTimeout = [];
let giveUpTimeout = 0;

const {
  $colorsTab,
  $fontsTab,
  $imagesTab,
  $spinner,
  $tabPanel,
  $pleaseRefresh
} = createSelectors();

const getTabData = (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, {get: "pageData"}, (response) => {
    if (typeof response === 'undefined') {
      chrome.tabs.executeScript(null, {file: "js/contentScript.js"});
      tabLoadTimeout.push(setTimeout(getTabData, 500));
    } else {
      const coloredDivs = getColors(response.colors);
      const fontDivs = getFonts(response.fonts);
      const imageDivs = getImages(response.images);

      /* Inject page data from content script */
      $colorsTab.append(coloredDivs);
      colorSquareClickListener().attach();

      $fontsTab.append(fontDivs);
      $imagesTab.append(imageDivs);

      getSerp(response.url);
      getSocialCounts(response.url).getAll();

      $spinner.hide();
      $pleaseRefresh.hide();
      $tabPanel.fadeIn(150);

      tabLoadTimeout.forEach(clearTimeout);

      clearTimeout(giveUpTimeout);
    }
  });
};

const giveUp = () => {
  mixpanelEvents.popupFailed();

  $spinner.hide();
  $pleaseRefresh.fadeIn(150);

  tabLoadTimeout.forEach(clearTimeout);
};

export default () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    getTabData(tabs);
    giveUpTimeout = setTimeout(giveUp, 6000);
  });
};
