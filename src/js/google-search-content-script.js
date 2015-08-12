import $ from 'jquery';

$(() => {
  const $results = $('.g .rc');

  const formattedResults = $results.map((i, e) => {
    const $e = $(e);
    const $titleElem = $e.find('h3.r a');
    const title = $titleElem.text();
    const description = $e.find('span.st').text();
    let url = decodeURIComponent($titleElem.attr('href'));

    // url = href.split('q=')[1].split('&')[0];

    return {
      rank: i + 1,
      title: title,
      url: url,
      description: description
    };
  });

  const queryParams = window.location.search.slice(1).split('&');

  const message = {
    type: 'rank',
    keyword: queryParams.filter(param => param.indexOf('q=') > -1)[0].split('=')[1],
    volume: queryParams.filter(param => param.indexOf('sprog-volume-passthru=') > -1)[0].split('=')[1],
    results: $.makeArray(formattedResults)
  };

  console.log(message);
  chrome.runtime.sendMessage(message);
  console.log('Sent rank data to popup');
});
