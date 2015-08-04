import $ from 'jquery';

$(() => {
  const $results = $('.g > .rc');

  const formattedResults = $results.map((i, e) => {
    const $e = $(e);
    const $titleElem = $e.find('h3.r a');
    let url = decodeURIComponent($titleElem.attr('href'));
    const title = $titleElem.text();
    const description = $e.find('span.st').text();

    // url = href.split('q=')[1].split('&')[0];

    return {
      rank: i + 1,
      title: title,
      url: url,
      description: description
    };
  });

  const message = {
    type: 'rank',
    results: formattedResults
  };
  chrome.runtime.sendMessage(message);
  console.log('Fired off rank data');
});
