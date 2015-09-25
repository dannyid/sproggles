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
