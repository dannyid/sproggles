import {getJSON as $getJSON} from 'jquery';
import {RESULT_DATA_URL, GOOGLE_SEARCH_BASE_URL} from './constants';

export default (url) => {
  const encodedPageUrl = encodeURIComponent(url);
  return $getJSON(RESULT_DATA_URL + encodedPageUrl);
};
