import openSecretGoogleWindow from './openSecretGoogleWindow';
import q from 'q';

const calculateRankFromSerp = (results, url) => {
  let rank = null;
  // console.log(url);

  results.forEach(function(result) {
    if (result.url.indexOf('hubspot') !== -1) {
      rank = result.rank;
    }
  });

  return rank;
};

export default ({keywords, url}) => {
  debugger
  let deferred = q.defer();
  let numKeywords = 0;
  const ranks = [];

  // Open a Google search window for every keyword, get its rank, and close the window
  keywords.slice(0, 1).forEach(function(keyword) {
    openSecretGoogleWindow(keyword.text);
    numKeywords++;
  });

  // Listen to replies from the Google search page
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "rank") {
      const rank = calculateRankFromSerp(request.results, url);

      ranks.push({
        keyword: request.keyword,
        rank: rank
      });

      numKeywords--;

      // chrome.windows.remove(sender.tab.windowId);
    }

    if (numKeywords === 0) {
      // console.log(ranks);
      deferred.resolve(ranks);
    }
  });

  return deferred.promise;
};
