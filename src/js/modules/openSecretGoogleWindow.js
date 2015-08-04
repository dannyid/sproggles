export default (keyword) => {
  chrome.windows.create({
    url: `http://www.google.com/search?hl=en&q=${keyword}&sa=N&num=20&ie=UTF-8&oe=UTF-8`,
    state: 'minimized'
  });
};
