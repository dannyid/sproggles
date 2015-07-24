import $ from 'jquery';
import humanize from 'humanize';
import {createSelectors} from './utils';
import {
  TWITTER_SHARE_COUNT_URL,
  FACEBOOK_SHARE_COUNT_URL,
  FACEBOOK_LIKE_COUNT_URL,
  LINKEDIN_SHARE_COUNT_URL,
  PINTEREST_SHARE_COUNT_URL,
  GOOGLE_PLUS_SHARE_COUNT_URL
} from './constants';

const {$twitterShareCount, $facebookShareCount, $linkedInShareCount, $pinterestShareCount} = createSelectors();

export default (url) => {
  const formatNum = (num) => {
    return humanize.numberFormat(num, 0);
  };

  const getTwitterShareCount = () => {
    return $.getJSON(TWITTER_SHARE_COUNT_URL + url);
  };

  const twitterShareCountSuccess = (data) => {
    $twitterShareCount.text(formatNum(data.count) || 0);
  };

  const twitterShareCountFail = (err) => {
    console.log(err);
  };


  const getFacebookShareCount = () => {
    return $.getJSON(FACEBOOK_SHARE_COUNT_URL + url);
  };

  const facebookShareCountSuccess = (data) => {
    $facebookShareCount.text(formatNum(data.shares) || 0);
  };

  const facebookShareCountFail = (err) => {
    console.log(err);
  };


  const getFacebookLikeCount = () => {
    return $.getJSON(FACEBOOK_LIKE_COUNT_URL + url);
  };


  const getLinkedInShareCount = () => {
    return $.getJSON(LINKEDIN_SHARE_COUNT_URL + url);
  };

  const linkedInShareCountSuccess = (data) => {
    $linkedInShareCount.text(formatNum(data.count) || 0);
  };

  const linkedInShareCountFail = (err) => {
    console.log(err);
  };


  const getPinterestShareCount = () => {
    return $.ajax({
      url: PINTEREST_SHARE_COUNT_URL,
      dataType: 'jsonp',
      type: 'GET',
      data: {
        url: url
      }
    });
  };

  const pinterestShareCountSuccess = (data) => {
    $pinterestShareCount.text(formatNum(data.count) || 0);
  };

  const pinterestShareCountFail = (err) => {
    console.log(err);
  };

  const getGooglePlusShareCount = () => {
    return $.getJSON(GOOGLE_PLUS_SHARE_COUNT_URL + url);
  };

  return {
    getAll: () => {
      getTwitterShareCount()
        .done(twitterShareCountSuccess)
        .fail(twitterShareCountFail);

      getFacebookShareCount()
        .done(facebookShareCountSuccess)
        .fail(facebookShareCountFail);

      getLinkedInShareCount()
        .done(linkedInShareCountSuccess)
        .fail(linkedInShareCountFail);

      getPinterestShareCount()
        .done(pinterestShareCountSuccess)
        .fail(pinterestShareCountFail);
    }
  };
};
