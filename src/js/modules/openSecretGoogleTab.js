import Q from 'q';

export default (keyword) => {
  const language = `en`;
  const numResults = `100`;
  const personalization = `0`; // Non-personalized
  const encoding = `UTF-8`;
  const verbatim = `li:1`; // No auto-correct and no location

  // Find highest window id (last opened window) and put new tabs there
  chrome.windows.getAll({populate: true}, function(windows) {
    const windowId = Math.max(...windows.map(window => window.id));

    chrome.tabs.create({
    url: `http://www.google.com/search` +
      // url: `file:///Users/dshekhtman/Documents/github/sproggles/src/test-search.html` + //test
           `?hl=${language}` +
           `&q=${keyword.keyword}` +
           `&num=${numResults}` +
           `&pws=${personalization}` +
           `&ie=${encoding}` +
           `&oe=${encoding}` +
           `&tbs=${verbatim}` +
           `&sprog-volume-passthru=${keyword.volume}` +
           `&sa=N`,
      windowId: +windowId,
      active: false
    });
  });
};
