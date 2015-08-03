import $ from 'jquery';
import {SEARCH_VOLUME_URL} from './constants';

export default (keyword) => {
  const encodedPageUrl = encodeURIComponent(keyword);
  console.log('Getting Volume data...');
  return $.getJSON(`${SEARCH_VOLUME_URL}/${keyword}`);
};
