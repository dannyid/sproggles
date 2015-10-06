export default domElements => {
  const imageElementUrls = domElements
    .filter(e => e.tagName === 'IMG') // Only grab <img> tags
    .map(e => e.src);

  const bgImageUrls = domElements
    .map(e => window.getComputedStyle(e).backgroundImage // Only grab elements with background-image
    .slice(4, -1)); // remove url() wrapping

  const filteredImages = [...imageElementUrls, ...bgImageUrls].filter(e => {
    return (
      e !== '' &&
      e.indexOf('chrome-extension://') === -1 && // Prevent chrome-extension images
      e.indexOf('gradient') === -1 // Prevent background-images that are gradients
    );
  });

  const dedupedImages = new Set(filteredImages);

  return [...dedupedImages]
};
