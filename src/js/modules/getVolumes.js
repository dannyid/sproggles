import $ from 'jquery';
import {SEARCH_VOLUME_URL} from './constants';
import Q from 'q';

const getSingleKeywordVolume = keyword => {
  const encodedKeyword = encodeURIComponent(keyword.text);
  // console.log(`Getting Volume data for keyword: ${decodeURIComponent(encodedKeyword)}`);

  return $.getJSON(`${SEARCH_VOLUME_URL}/${encodedKeyword}`);
};

export default ({keywords, url}) => {
  return Q.all(keywords.map(getSingleKeywordVolume))
  .then(keywordsWithVolume => {
    const deferred = Q.defer();

    const keywordsAbove1000Volume = keywordsWithVolume.filter(keywordWithVolume => {
      return keywordWithVolume.volume >= 1000;
    });

    keywordsAbove1000Volume.sort((a, b) => {
      return b.volume - a.volume; // sort in descending order by volume
    });

    deferred.resolve({
      keywords: keywordsAbove1000Volume.slice(0, 2),
      url
    });
    debugger
    return deferred.promise;
  });
};
