import $ from 'jquery';
import {resultDataUrl, googleSearchBaseUrl} from './constants';

export default function getSerp() {
	var derivedGoogleSearchUrl;

  return {
    getJSON: (url) => {
      const encodedPageUrl = encodeURIComponent(url);
      derivedGoogleSearchUrl = googleSearchBaseUrl + encodedPageUrl;
      console.log('Getting Google search data...');
      return $.getJSON(resultDataUrl + encodedPageUrl);
    },

    injectSerp: (data) => {
      console.log('AJAX Success');

      $('.tab-content #search').empty().append(
        `<div class="serp">` +
          `<h3>` +
            `<a href="" target="_blank">${data.title}</a>` +
          `</h3>` +
          `<div class="description-container">` +
            `<cite>${data.link}</cite>` +
            `<span class="description">${data.description}</span>` +
          `</div>` +
        `<div>`
      );
    },

    injectError: (jqxhr, textStatus, err) => {
      console.log('Error: ', err);

      $('.tab-content #search').empty().append(
        `<div class="noresult">` +
          `<a href="${derivedGoogleSearchUrl}" target="_blank">` +
            `No Google search result for this page.` +
          `</a>`,
        `</div>`
      );
    },

    attachClickListeners: () => {
      $('.tab-content #search')

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
    }
  };
}

