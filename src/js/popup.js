import $ from 'jquery';
import getColors from './modules/getColors';
import getFonts from './modules/getFonts';
import getImages from './modules/getImages';
import getSerp from './modules/getSerp';
import {colorSquareClickListener, tabClickHandler, themeButtonClickHandler, createSelectors} from './modules/utils';

$(() => {
  const {$colorsTab, $fontsTab, $imagesTab, $spinner, $tabPanel, $tab, $themeButton, $pleaseRefresh} = createSelectors();
  const serpUtils = getSerp();
  let tabLoadTimeout = [];
  let giveUpTimeout = 0;

  $tab.click(tabClickHandler);
  $themeButton.click(themeButtonClickHandler);

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const getTabData = () => {
      chrome.tabs.sendMessage(tabs[0].id, {get: "pageData"}, (response) => {
        if (typeof response === 'undefined') {
          tabLoadTimeout.push(setTimeout(getTabData, 500));
        } else {
          const coloredDivs = getColors(response.colors);
          const fontDivs = getFonts(response.fonts);
          const imageDivs = getImages(response.images);

          serpUtils.getJSON(response.url)
           .done(serpUtils.injectSerp)
           .fail(serpUtils.injectError)
           .always(serpUtils.attachClickListener);

          $colorsTab.append(coloredDivs);
          $fontsTab.append(fontDivs);
          $imagesTab.append(imageDivs);

          colorSquareClickListener().attach();

          $spinner.hide();
          $pleaseRefresh.hide();
          $tabPanel.fadeIn(150);

          tabLoadTimeout.forEach(clearTimeout);

          clearTimeout(giveUpTimeout);
        }
      });
    };

    const giveUp = () => {
      $spinner.hide();
      $pleaseRefresh.fadeIn(150);

      tabLoadTimeout.forEach(function(timeout){
        clearTimeout(timeout);
      });
    };

    // If the popup doesn't receive a response in 10 seconds, it gives up and tells you to refresh
    getTabData();
    giveUpTimeout = setTimeout(giveUp, 10000);
  });
});
