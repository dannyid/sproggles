import $ from 'jquery';
import Q from 'q';

export default (keyword) => {
  const language = `en`,
        numResults = `100`,
        personalization = `0`, /* Non-personalized */
        encoding = `UTF-8`,
        verbatim = `li:1`, /* No auto-correct and no location */
        ssl = `ssl`;

  const googleSearchUrl = `https://www.google.com/search` +
    `?hl=${language}` +
    `&q=${keyword}` +
    `&num=${numResults}` +
    `&pws=${personalization}` +
    `&ie=${encoding}` +
    `&oe=${encoding}` +
    `&tbs=${verbatim}` +
    `&sa=N` + /* I forget what this does */
    `&gws_rd=${ssl}`;

  return Q($.get(googleSearchUrl))
  .then(data => {
    const $results = $(data).find('.g .rc');

    return $.makeArray($results.map((i, e) => {
      const $e = $(e);
      const $titleElem = $e.find('h3.r a');
      const title = $titleElem.text();
      const description = $e.find('span.st').text();
      let url = decodeURIComponent($titleElem.attr('href'));

      return {
        rank: i + 1,
        title: title,
        url: url,
        description: description
      };
    }));
  });
};
