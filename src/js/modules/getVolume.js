import {getJSON as $getJSON} from 'jquery';
import {SEARCH_VOLUME_URL} from './constants';

const volumeThreshold = 1000;

export const getSingleKeywordVolume = keyword => {
  const encodedKeyword = encodeURIComponent(keyword);

  return $getJSON(`${SEARCH_VOLUME_URL}/${encodedKeyword}`)
  .then(response => response.volume);
};
