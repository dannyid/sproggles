import $ from 'jquery';
import getColors from './modules/getColors';
import getFonts from './modules/getFonts';
import getImages from './modules/getImages';
import getSerp from './modules/getSerp';
import getSocialCounts from './modules/getSocialCounts';
import * as mixpanelEvents from './modules/mixpanelEvents';
import {colorSquareClickListener, tabClickHandler, themeButtonClickHandler, createSelectors} from './modules/utils';

$(() => {
  const {
    $colorsTab,
    $fontsTab,
    $imagesTab,
    $spinner,
    $tabPanel,
    $tabContent,
    $tab,
    $themeButton,
    $pleaseRefresh,
    $feedbackButton,
    $feedbackForm
  } = createSelectors();

  const tabLoadTimeout = [];
  let giveUpTimeout = 0;

  mixpanelEvents.popupOpened();

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

          $feedbackButton.click((e) => {
            e.preventDefault();
            mixpanelEvents.feedbackButtonClicked();
            const $this = $(e.currentTarget);
            const $form = $('.hbspt-form');
            const $toolbarText = $this.siblings('.toolbar-text');

            if ($form.length === 0) {
              hbspt.forms.create({
                target: '#feedback-form',
                portalId: '150905',
                formId: '2f33e21f-3324-437c-8bee-8cc266fc8296'
              });
            }

            if ($feedbackForm.hasClass('active')) {
              $feedbackForm.removeClass('in active');
              $feedbackButton.find('img').attr('src', './img/light-bulb-off.png');
            } else {
              $feedbackForm.addClass('in active');
              $feedbackButton.find('img').attr('src', './img/light-bulb-on.png');
            }

            $form.submit(function() {
              $feedbackForm.removeClass('in active');
            });

          });

          tabLoadTimeout.forEach(clearTimeout);

          clearTimeout(giveUpTimeout);
        }
      });
    };

    const giveUp = () => {
      mixpanelEvents.popupFailed();

      $spinner.hide();
      $pleaseRefresh.fadeIn(150);

      tabLoadTimeout.forEach(function(timeout){
        clearTimeout(timeout);
      });
    };

    // If the popup doesn't receive a response in 10 seconds, it gives up and tells you to refresh
    getTabData();
    giveUpTimeout = setTimeout(giveUp, 6000);
  });
});
