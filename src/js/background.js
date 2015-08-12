import searchGoogle from './modules/searchGoogle';
import calculateRankFromSerp from './modules/calculateRankFromSerp';
import {getSingleKeywordVolume} from './modules/getVolume';
import Q from 'q';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getKeywordInfo") {
    const {keyword, url} = request;

    Q.all([
      getSingleKeywordVolume(keyword),
      searchGoogle(keyword)
        .then(results => calculateRankFromSerp(results, url))
    ])
    .spread((volume, rank) => sendResponse({
      rank,
      volume,
      keyword,
      url
    }));

    return true; /* Needed for async sendResponse to work properly */
  }
});
