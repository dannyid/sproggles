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
