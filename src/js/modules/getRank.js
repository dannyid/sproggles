import openSecretGoogleWindow from './openSecretGoogleWindow';
import openSecretGoogleTab from './openSecretGoogleTab';
import Q from 'q';

export default (results, url) => {
  let rank = null;
  const parsedUrl = url.slice(url.indexOf('//') + 2);

  results.forEach(function(result) {
    if (result.url.indexOf(parsedUrl) !== -1) {
      rank = result.rank;
    }
  });

  return rank;
};

// export default ({keywords, url}) => {
//   let deferred = Q.defer();
//   let numKeywords = 0;
//   const ranks = [];

//   // Open a Google search tab for every keyword, get its rank, and close the window
//   keywords.forEach((keyword, i) => {
//     setTimeout(() => {
//       openSecretGoogleTab(keyword);
//       numKeywords++;
//     }, 1001 * i);
//   });

//   // Listen to replies from the Google search page
//   chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.type === "rank") {
//       const rank = calculateRankFromSerp(request.results, url);

//       ranks.push({
//         keyword: request.keyword.split('+').join(' '),
//         volume: request.volume,
//         rank: rank,
//         url: url
//       });

//       if (--numKeywords === 0) {
//         deferred.resolve(ranks);
//         chrome.windows.remove(sender.tab.windowId);
//       }
//     }
//   });

//   return deferred.promise;
// };
