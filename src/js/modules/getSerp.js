import $ from 'jquery';
import {resultDataUrl, googleSearchBaseUrl} from './constants';

export default function getSerp() {
	var derivedGoogleSearchUrl;

	const get = (url) => {
		const encodedPageUrl = encodeURIComponent(url);
	  derivedGoogleSearchUrl = googleSearchBaseUrl + encodedPageUrl;
	  console.log('in Get', derivedGoogleSearchUrl);
	  return $.getJSON(resultDataUrl + encodedPageUrl);
	};

	const ajaxSuccessFn = (data) => {
		console.log('in ajax success', derivedGoogleSearchUrl);
		const resultUrl = data.link.slice(data.link.indexOf('//') + 2);

	  $('#search').append(
	    `<div class="serp">`+
	      `<h3>`+
	        `<a href="${derivedGoogleSearchUrl}" target="_blank">${data.title}</a>`+
	      `</h3>`+
	      `<div class="description-container">`+
	        `<cite>${resultUrl}</cite>`+
	        `<span class="description">${data.description}</span>`+
	      `</div>`+
	    `<div>`
	   )
	};

	const ajaxFailFn = (err) => {
		console.log('in ajax fail', derivedGoogleSearchUrl);
	  $('#search').append(
	    `<div class="noresult">`+
	      `<a href="${derivedGoogleSearchUrl}" target="_blank">`+
	        `No Google search result for this page.`+
	      `</a>`,
	    `</div>`
	  )
	};

	return {
		get,
		ajaxSuccessFn,
		ajaxFailFn
	}
};

