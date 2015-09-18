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
};
