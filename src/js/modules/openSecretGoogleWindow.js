export default (keyword) => {
  const language = `en`;
  const numResults = `20`;
  const personalization = `0`; // Non-personalized
  const encoding = `UTF-8`;
  const verbatim = `li:1`; // No auto-correct and no location

  chrome.windows.create({
    url: `http://www.google.com/search` +
         `?hl=${language}` +
         `&q=${keyword}` +
         `&num=${numResults}` +
         `&pws=${personalization}` +
         `&ie=${encoding}` +
         `&oe=${encoding}` +
         `&tbs=${verbatim}` +
         `&sa=N`,
    focused: false,
    height: 1,
    width: 1,
    top: 10000,
    left: 1,
    type: 'panel'
  }, function(window) {
    chrome.windows.update(window.id, {
      state: 'minimized'
    });
  });
};
