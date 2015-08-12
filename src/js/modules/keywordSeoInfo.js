import $ from 'jquery';
import {createSelectors} from './utils';
import Q from 'q';

const {$derivedKeywords} = createSelectors();

/*
    This sends a message to the background script which
    does an AJAX call to Google and responds here
*/
export const getKeywordInfo = (keyword, url) => {
  const deferred = Q.defer();

  chrome.runtime.sendMessage({
    type: 'getKeywordInfo',
    keyword,
    url
  }, response => deferred.resolve(response));

  return deferred.promise;
};

export const injectKeywordInfo = (keyword) => {
  console.log('Keyword success!');

  $derivedKeywords.find('table > tbody > tr:nth-child(1)').after(
    `<tr>` +
      `<td class="keyword-name">${keyword.keyword}</td>` +
      `<td class="keyword-rank-number">${keyword.rank}</td>` +
      `<td class="keyword-volume-number">${keyword.volume}</td>` +
    `</tr>`
  );
};

export const injectKeywordError = (jqxhr, textStatus, err) => {
  console.log('Keyword error:', err);

  $derivedKeywords.find('table > tbody > tr:nth-child(1)').after(
    `<tr>` +
      `<td>` +
        `Keyword search failed. Please try again` +
      `</td>` +
    `</tr>`
  );
};
