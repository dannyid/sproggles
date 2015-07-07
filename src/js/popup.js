import $ from 'jquery';
import getColors from './modules/getColors';
import getFonts from './modules/getFonts';
import getImages from './modules/getImages';
import {convertRgbToHex, colorSquareClickListener, tabClickHandler, createSelectors} from './modules/utils';

$(() => {
  const [$colorsTab, $fontsTab, $imagesTab, $spinner, $tabPanel, $tab] = createSelectors();

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {get: "pageData"}, (response) => {
      const coloredDivs = getColors(response.colors);
      const fontDivs = getFonts(response.fonts);
      const imageDivs = getImages(response.images);

      $colorsTab.append(coloredDivs);
      $fontsTab.append(fontDivs);
      $imagesTab.append(imageDivs);

      // Need to create this here because colorSquares don't exist util $colorsTab.append(coloredDivs) run

      $tab.click(tabClickHandler);

      colorSquareClickListener().attach();
      
      $spinner.hide();
      $tabPanel.fadeIn(150);
    });
  });
});
