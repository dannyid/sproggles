import $ from 'jquery';
import {SEARCH_VOLUME_URL} from './constants';
import Q from 'q';

const volumeThreshold = 1000;

export const getSingleKeywordVolume = keyword => {
  const encodedKeyword = encodeURIComponent(keyword);
  console.log(`Getting Volume data for keyword: ${decodeURIComponent(encodedKeyword)}`);

  return Q($.getJSON(`${SEARCH_VOLUME_URL}/${encodedKeyword}`))
  .then(response => response.volume);
};

// export const getVolumes = ({keywords, url}) => {
//   return Q.all(keywords.map(getSingleKeywordVolume))
//   .then(keywordsWithVolume => {
//     const deferred = Q.defer();

//     const keywordsAboveVolumeThreshold = keywordsWithVolume.filter(keywordWithVolume => {
//       return keywordWithVolume.volume >= volumeThreshold;
//     }).sort((a, b) => {
//       return b.volume - a.volume; /* sort in descending order by volume */
//     });

//     deferred.resolve({
//       keywords: keywordsAboveVolumeThreshold,
//       url
//     });

//     return deferred.promise;
//   });
// };
