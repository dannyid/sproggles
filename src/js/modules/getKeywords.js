import $ from 'jquery';
import {KEYWORDS_URL} from './constants';
import getVolume from './getVolume';
import {createSelectors} from './utils';

const {$derivedKeywords} = createSelectors();

export default (url) => {
  const getJSON = () => {
    const encodedPageUrl = encodeURIComponent(url);
    console.log('Getting Keywords data...');
    return $.getJSON(`${KEYWORDS_URL}/${encodedPageUrl}`);
  };

  const injectKeywords = (data) => {
    console.log('Keyword success!');

    data.forEach(function(e, i){
      if (i > 9) { return; }

      $derivedKeywords.find('table > tbody').append(
        `<tr>` +
          `<td class="keyword-name">${e.text}</td>` +
          `<td class="keyword-rank-number">??</td>` +
          `<td class="keyword-volume-number">??</td>` +
        `</tr>`
      );

      getVolume(e.text)
        .done(function(response) {
          console.log('Volume success!');
          $derivedKeywords
          .find('table > tbody .keyword-volume-number')
          .eq(i)
          .text(response.volume || 'low');
        })
        .fail(function(response) {
          console.log('Volume failure :(');
          console.log(response);
        });
    });
  };

  const injectError = (jqxhr, textStatus, err) => {
    console.log('Keyword error: ', err);

    $derivedKeywords.find('table > tbody').append(
      `<div>fail</div>`
    );
  };

  getJSON()
    .done(injectKeywords)
    .fail(injectError);
};
