import $ from 'jquery';

$(() => {
  const $colorsTab = $('#colors');
  const $fontsTab = $('#fonts');
  const $imagesTab = $('#images');

  const convertRgbToHex = (color) => {
    return '#'+color.slice(4, -1).split(',').map((i) => {
      var hexValue = parseInt(i, 10).toString(16).toUpperCase();
      // if the hex value is < 10, add a leading 0
      return hexValue.length === 1 ? '0'+hexValue : hexValue;
    }).join('');
  };

  $('ul.nav-tabs li a').click((e) => {
    const $this = $(e.currentTarget);
    const tabId = $this.attr('href').substr(1);
    const $relatedTabPanel = $(`.tab-content .tab-pane#${tabId}`);

    $this
      .parent().addClass('active').fadeIn()
      .siblings().removeClass('active');

    $relatedTabPanel
      .addClass('in active').fadeIn()
      .siblings().removeClass('in active');
  });

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {get: "pageData"}, (response) => {
      //response.colors.sort();
      var coloredDivs = response.colors.map((color) => {
        if (color === 'rgb(0, 0, 0)' ||
            color === 'rgba(0, 0, 0, 0)' ||
            color === 'rgb(255, 255, 255)' ||
            color === 'rgba(255, 255, 255, 1)') {return null;}
        return $(`<div class="color-square-container"><div id="${color}" class="color-square" style="background-color: ${color};"></div><div class="color-name">${color}</div></div>`);
      });

      var fontDivs = response.fonts.map((font) => {
        return $(`<li class="font" style="font-family: ${font};"><a target="_blank" href="https://typekit.com/search?utf8=✓&q=${font}">${font}</a></li>`);
      });

      var imageDivs = response.images.map((imageUrl) => {
        return $(`<div class="image-square-container"><a target="_blank" href="${imageUrl}"><img src="${imageUrl}"/></a></div>`);
      });

      $colorsTab.append(coloredDivs);
      $fontsTab.append(fontDivs);
      $imagesTab.append(imageDivs);

      var timeout;

      $('.color-square').click((e) => {
        var $input = $('input#clipboard');
        var $copied = $('.copied.alert');

        var color = ((color) => {
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
      });

      $('#spinner').hide();
      $('#tabpanel').fadeIn(150);
    });
  });
});
