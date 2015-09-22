import {getJSON as $getJSON} from 'jquery';
import {SEARCH_VOLUME_URL} from './constants';
import Q from 'q';

const volumeThreshold = 1000;

export const getSingleKeywordVolume = keyword => {
  const encodedKeyword = encodeURIComponent(keyword);
  console.log(`Getting Volume data for keyword: ${decodeURIComponent(encodedKeyword)}`);

  return Q($getJSON(`${SEARCH_VOLUME_URL}/${encodedKeyword}`))
  .then(response => response.volume);
};
