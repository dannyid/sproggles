import $ from 'jquery';
import getColors from './modules/getColors';
import getFonts from './modules/getFonts';
import getImages from './modules/getImages';
import getSerp from './modules/getSerp';
import {colorSquareClickListener, tabClickHandler, themeButtonClickHandler, createSelectors} from './modules/utils';

$(() => {
  const [$colorsTab, $fontsTab, $imagesTab, $spinner, $tabPanel, $tab, $themeButton] = createSelectors();
  const serpUtils = getSerp();

  $tab.click(tabClickHandler);

  $themeButton.click(themeButtonClickHandler);

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {get: "pageData"}, (response) => {
      if (typeof response === 'undefined') {
        // Put up message saying to reload the page and wait for it to fully load
      }

      const coloredDivs = getColors(response.colors);
      const fontDivs = getFonts(response.fonts);
      const imageDivs = getImages(response.images);

      serpUtils.get(response.url)
       .done(serpUtils.ajaxSuccessFn)
       .fail(serpUtils.ajaxFailFn);

      $colorsTab.append(coloredDivs);
      $fontsTab.append(fontDivs);
      $imagesTab.append(imageDivs);

      colorSquareClickListener().attach();

      $spinner.hide();
      $tabPanel.fadeIn(150);
    });
  });
});
