import $ from 'jquery';
import {KEYWORDS_URL} from './constants';
import Q from 'q';

export default (url) => {
  const encodedPageUrl = encodeURIComponent(url);
  console.log('getting keywords');
/*  return Q([{ // test data
    "relevance": "0.923298",
    "text": "Webmasters Tools"
  }, {
    "relevance": "0.877223",
    "text": "source code"
  }, {
    "relevance": "0.759345",
    "text": "site"
  }, {
    "relevance": "0.705046",
    "text": "Screaming Frog"
  }, {
    "relevance": "0.702582",
    "text": "analysis"
  }, {
    "relevance": "0.665215",
    "text": "source code analysis"
  }, {
    "relevance": "0.636262",
    "text": "bookmarklets"
  }, {
    "relevance": "0.621071",
    "text": "Site Analysis Tools"
  }, {
    "relevance": "0.6056",
    "text": "favourite analysis site"
  }, {
    "relevance": "0.595797",
    "text": "common SEO issues"
  }])*/
  return Q($.getJSON(`${KEYWORDS_URL}/${encodedPageUrl}`)) /* returns array */
  .then(keywords => {
    return {
      keywords: keywords.slice(0, 20), /* only send 20 keywords */
      url
    };
  });
};
