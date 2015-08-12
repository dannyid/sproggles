import $ from 'jquery';
import {RESULT_DATA_URL, GOOGLE_SEARCH_BASE_URL} from './constants';

export default (url) => {
  let derivedGoogleSearchUrl;
  const getJSON = () => {
    const encodedPageUrl = encodeURIComponent(url);
    derivedGoogleSearchUrl = GOOGLE_SEARCH_BASE_URL + encodedPageUrl;
    console.log('Getting Google search data...');
    return $.getJSON(RESULT_DATA_URL + encodedPageUrl);
  };

  const injectSerp = (data) => {
    console.log('SERP success!');

    $('.tab-content #search .serp-container').empty().append(
      `<div class="serp">` +
        `<h3>` +
          `<a>${data.title}</a>` +
        `</h3>` +
        `<div class="description-container">` +
          `<cite>${data.link}</cite>` +
          `<span class="description">${data.description}</span>` +
        `</div>` +
      `<div>`
    );
  };

  const injectError = (jqxhr, textStatus, err) => {
    console.log('SERP error: ', err);

    $('.tab-content #search .serp-container').empty().append(
      `<div class="noresult">` +
        `<a>` +
          `No Google search result for this page.` +
        `</a>`,
      `</div>`
    );
  };

  const attachClickListeners = () => {
    $('.tab-content #search .serp-container')

    .on('mouseout', function(e) {
      $(this).removeClass('depressed');
    })

    .on('mousedown', function(e){
      e.which === 1 && $(this).addClass('depressed');
    })

    .on('mouseup', function(e) {
      if (e.which === 1) { // left click only
        $(this).removeClass('depressed');
        chrome.tabs.create({url: derivedGoogleSearchUrl});
      }
    });
  };

  getJSON()
    .done(injectSerp)
    .fail(injectError)
    .always(attachClickListeners);
};
