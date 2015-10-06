const domElements = [].slice.call(document.querySelectorAll('body *:not(script):not(style)'));

const imageElementUrls = domElements
  .filter(e => e.tagName === 'IMG') // Only grab <img> tags
  .map(e => e.src);

const bgImageUrls = domElements
  .map(e => window.getComputedStyle(e).backgroundImage // Only grab elements with background-image
  .slice(4, -1)); // remove url() wrapping

const filteredImages = [...imageElementUrls, ...bgImageUrls].filter(e => e !== '' && e.indexOf('chrome-extension://') === -1); // Exclude images from chrome-extensions

const dedupedImages = new Set(filteredImages);

export default () => {
  return [...dedupedImages]; // Convert back to array
};
