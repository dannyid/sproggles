import $ from 'jquery';

export default (images) => {
  return images.map((imageUrl) => {
    return $(
      `<div class="image-square-container">`+
        `<a target="_blank" href="${imageUrl}">`+
          `<img src="${imageUrl}"/>`+
        `</a>`+
      `</div>`
    );
  });
};
