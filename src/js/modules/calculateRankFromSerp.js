export default (results, url) => {
  const urlStart = url.indexOf('//') + 2;
  const urlEnd = url.indexOf('?') > -1 ? url.indexOf('?') : undefined;
  let parsedUrl = url.slice(urlStart, urlEnd);
  let rank = '100+';

  parsedUrl = parsedUrl[parsedUrl.length - 1] === '/' ? parsedUrl.slice(0, -1) : parsedUrl;

  results.forEach(result => {
    if (result.url.indexOf(parsedUrl) !== -1) {
      rank = result.rank;
    }
  });

  return rank;
};
