import $ from 'jquery';
import getColors from './modules/getColors';
import getFonts from './modules/getFonts';
import getImages from './modules/getImages';
import {convertRgbToHex, copyColorToClipboard, tabClickHandler, createSelectors} from './modules/utils';

$(() => {
  const [$colorsTab, $fontsTab, $imagesTab, $colorSquare, $spinner, $tabPanel, $tab] = createSelectors();

  $tab.click(tabClickHandler);

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {get: "pageData"}, (response) => {
      var timeout;
      var coloredDivs = getColors(response.colors);
      var fontDivs = getFonts(response.fonts);
      var imageDivs = getImages(response.images);

      $colorsTab.append(coloredDivs);
      $fontsTab.append(fontDivs);
      $imagesTab.append(imageDivs);

      $colorSquare.click(copyColorToClipboard);

      $spinner.hide();
      $tabPanel.fadeIn(150);
    });
  });
});
