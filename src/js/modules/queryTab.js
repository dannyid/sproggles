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
      // This injects the contentScript after extension
      // install or update without having to refresh the page
      chrome.tabs.executeScript(null, {file: "js/contentScript.js"});

      // Keep trying until the page fully loads
      tabLoadTimeout.push(setTimeout(getTabData, 500));
    } else {
      // Create html elements from lists of colors, fonts, images
      const coloredDivs = getColors(response.colors);
      const fontDivs = getFonts(response.fonts);
      const imageDivs = getImages(response.images);

      // Inject colors data from content script
      $colorsTab.append(coloredDivs);

      // Attach click listeners to color squares
      colorSquareClickListener().attach();

      // Inject fonts and images data from content script
      $fontsTab.append(fontDivs);
      $imagesTab.append(imageDivs);

      // Get SERP and inject div of it
      getSerp(response.url);

      // Get all social counts and inject them
      getSocialCounts(response.url).getAll();

      // Hide any errors from before and fade in tab
      $spinner.hide();
      $pleaseRefresh.hide();
      $tabPanel.fadeIn(150);

      // Clear any retry timers from before
      tabLoadTimeout.forEach(clearTimeout)
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
