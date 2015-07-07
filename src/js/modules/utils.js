import $ from 'jquery';

export function convertRgbToHex (color) {
  return '#'+color.slice(4, -1).split(',').map((i) => {
    var hexValue = parseInt(i, 10).toString(16).toUpperCase();
    // if the hex value is < 10, add a leading 0
    return hexValue.length === 1 ? '0'+hexValue : hexValue;
  }).join('');
};

export function copyColorToClipboard (e) {
  const $input = $('input#clipboard');
  const $copied = $('.copied.alert');
  const color = ((color) => {
    if (color.indexOf('rgba') !== -1) {
      return color;
    } else if (color.indexOf('rgb') !== -1) {
      return convertRgbToHex(color);
    }
  })($(e.currentTarget).attr('id'));

  $input.val(color).select();
  document.execCommand('Copy');

  $copied.text(`Copied: ${color}`).hide().fadeIn(200);

  clearTimeout(timeout);

  timeout = setTimeout(() => {
    $copied.fadeOut(200);
  }, 2000);
};

export function tabClickHandler(e) {
  const $this = $(e.currentTarget);
  const tabId = $this.attr('href').substr(1);
  const $relatedTabPanel = $(`.tab-content .tab-pane#${tabId}`);

  $this
    .parent().addClass('active').fadeIn()
    .siblings().removeClass('active');

  $relatedTabPanel
    .addClass('in active').fadeIn()
    .siblings().removeClass('in active');
};

export function createSelectors() {
  const $colorsTab = $('#colors');
  const $fontsTab = $('#fonts');
  const $imagesTab = $('#images');
  const $colorSquare = $('.color-square');
  const $spinner = $('#spinner');
  const $tabPanel = $('#tabpanel');
  const $tab = $('ul.nav-tabs li a');
  return [
    $colorsTab,
    $fontsTab,
    $imagesTab,
    $colorSquare,
    $spinner,
    $tabPanel,
    $tab
  ];
};