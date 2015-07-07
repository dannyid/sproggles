import $ from 'jquery';

export default (fonts) => {
  return fonts.map((font) => {
    return $(
      `<li class="font" style="font-family: ${font};">`+
        `<a target="_blank" href="https://typekit.com/search?utf8=✓&q=${font}">${font}</a>`+
      `</li>`
    );
  });
};
