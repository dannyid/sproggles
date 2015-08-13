import $ from 'jquery';
import * as mixpanelEvents from './mixpanelEvents';
import {convertRgbToHex, createSelectors} from './utils';

export function colorSquareClickListener() {
  const $colorSquare = $('.color-square');
  let timeout = 0;

  function copyColorToClipboard(e) {
    console.log('color copied to clipboard');
    const $input = $('input#clipboard');
    const $copied = $('.copied.alert');
    const color = ((colorCode) => {
      if (colorCode.indexOf('rgba') !== -1) {
        return colorCode;
      } else if (colorCode.indexOf('rgb') !== -1) {
        return convertRgbToHex(colorCode);
      }
    })($(e.currentTarget).attr('id'));

    // Insert color value text into input box and copy it to the clipboard
    $input.val(color).select();
    document.execCommand('Copy');
    mixpanelEvents.colorCopied(color);

    // Activate "copied" alert and then fade it out
    $copied.text(`Copied: ${color}`).addClass('active');
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      $copied.removeClass('active');
    }, 2000);
  }

  return {
    attach: function() {
      $colorSquare.click(copyColorToClipboard);
    }
  };
}

export function tabClickHandler(e) {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const tabId = $this.attr('href').substr(1);
  const $relatedToolbar = $(`.tab-pane-toolbar #${tabId}`);
  const $relatedTabPanel = $(`.tab-content .tab-pane#${tabId}`);

  /* Fire mixpanel event */
  mixpanelEvents.tabClicked(tabId);

  /* Highlight active tab */
  $this
    .parent().addClass('active').fadeIn()
    .siblings().removeClass('active');

  /* Choose proper toolbar */
  $relatedToolbar
    .addClass('active').fadeIn()
    .siblings().removeClass('active');

  /* Display proper tab content */
  $relatedTabPanel
    .addClass('in active').fadeIn()
    .siblings().removeClass('in active');

  /* Turn off lightbulb */
  $('.feedback-button img').attr('src', './img/light-bulb-off.png');
}

export function themeButtonClickHandler(e) {
  mixpanelEvents.darkThemeClicked();
  $('span.dark-theme').toggleClass('dark');
  $('.tab-content').toggleClass('dark');
}

export function feedbackButtonClickHandler(e) {
  e.preventDefault();
  mixpanelEvents.feedbackButtonClicked();
  const $this = $(e.currentTarget);
  const $form = $('.hs-form');
  const {$feedbackForm, $feedbackToolbar, $feedbackButton} = createSelectors();

  if ($feedbackForm.hasClass('active')) {
    $feedbackForm.removeClass('in active');
    $feedbackToolbar.removeClass('active');
    $feedbackButton.find('img').attr('src', './img/light-bulb-off.png');
  } else {
    $feedbackForm.addClass('in active');
    $feedbackToolbar.addClass('active');
    $feedbackButton.find('img').attr('src', './img/light-bulb-on.png');
  }

  $form.on('submit', function() {
    console.log('test');
    $feedbackForm.removeClass('in active');
    $feedbackToolbar.removeClass('active');
    $feedbackButton.find('img').attr('src', './img/light-bulb-off.png');
  });
}
