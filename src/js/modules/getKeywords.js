import $ from 'jquery';
import {KEYWORDS_URL} from './constants';
import Q from 'q';

export default (url) => {
  const encodedPageUrl = encodeURIComponent(url);
  return Q($.getJSON(`${KEYWORDS_URL}/${encodedPageUrl}`)) /* returns array */
  .then(keywords => {
    return {
      keywords: keywords.slice(0, 20), /* only send 20 keywords */
      url
    };
  });
};
