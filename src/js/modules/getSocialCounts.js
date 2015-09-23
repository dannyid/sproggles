import {
  getJSON as $getJSON,
  ajax as $ajax
} from 'jquery';

import {
  TWITTER_SHARE_COUNT_URL,
  FACEBOOK_SHARE_COUNT_URL,
  FACEBOOK_LIKE_COUNT_URL,
  LINKEDIN_SHARE_COUNT_URL,
  PINTEREST_SHARE_COUNT_URL,
  GOOGLE_PLUS_SHARE_COUNT_URL
} from './constants';


export function getTwitterShareCount(url) {
  return $getJSON(TWITTER_SHARE_COUNT_URL + url);
}

export function getFacebookShareCount(url) {
  return $getJSON(FACEBOOK_SHARE_COUNT_URL + url);
}

export function getFacebookLikeCount(url) {
  return $getJSON(FACEBOOK_LIKE_COUNT_URL + url);
}

export function getLinkedInShareCount(url) {
  return $getJSON(LINKEDIN_SHARE_COUNT_URL + url);
}

export function getPinterestShareCount(url) {
  return $ajax({
    url: PINTEREST_SHARE_COUNT_URL,
    dataType: 'text', // Having heinous problems with jsonp, just parsing text instead
    type: 'GET',
    data: {
      url: url
    }
  }).then(data => {
    const jsonStart = data.indexOf('{');
    const jsonEnd = data.indexOf('}');
    const json = data.slice(jsonStart, jsonEnd + 1);
    return JSON.parse(json);
  });
}

export function getGooglePlusShareCount(url) {
  return $getJSON(GOOGLE_PLUS_SHARE_COUNT_URL + url);
}
