import $ from 'jquery';
import {
	twitterShareCountUrl,
	facebookShareCountUrl,
	facebookLikeCountUrl,
	linkedInShareCountUrl,
	pinterestShareCountUrl,
	googlePlusShareCountUrl
} from './constants';

import {createSelectors} from './utils';

const {$twitterShareCount, $facebookShareCount, $linkedInShareCount, $pinterestShareCount} = createSelectors();

export default (url) => {
	const getTwitterShareCount = () => {
		return $.getJSON(twitterShareCountUrl + url);
	};

	const twitterShareCountSuccess = (data) => {
		$twitterShareCount.text(data.count || 0);
	};

	const twitterShareCountFail = (err) => {
		console.log(err);
	};


	const getFacebookShareCount = () => {
		return $.getJSON(facebookShareCountUrl + url);
	};

	const facebookShareCountSuccess = (data) => {
		$facebookShareCount.text(data.shares || 0);
	};

	const facebookShareCountFail = (err) => {
		console.log(err);
	};


	const getFacebookLikeCount = () => {
		return $.getJSON(facebookLikeCountUrl + url);
	};


	const getLinkedInShareCount = () => {
		return $.getJSON(linkedInShareCountUrl + url);
	};

	const linkedInShareCountSuccess = (data) => {
		$linkedInShareCount.text(data.count || 0);
	};

	const linkedInShareCountFail = (err) => {
		console.log(err);
	};


	const getPinterestShareCount = () => {
		return $.ajax({
			url: pinterestShareCountUrl,
			dataType: 'jsonp',
			type: 'GET',
			data: {
				url: url
			}
		});
	};

	const pinterestShareCountSuccess = (data) => {
		$pinterestShareCount.text(data.count || 0);
	};

	const pinterestShareCountFail = (err) => {
		console.log(err);
	};

	const getGooglePlusShareCount = () => {
		return $.getJSON(googlePlusShareCountUrl + url);
	};

	return {
		getAll: () => {
			getTwitterShareCount()
				.done(twitterShareCountSuccess)
				.fail(twitterShareCountFail);

			getFacebookShareCount()
				.done(facebookShareCountSuccess)
				.fail(facebookShareCountFail);

			getLinkedInShareCount()
				.done(linkedInShareCountSuccess)
				.fail(linkedInShareCountFail);

			getPinterestShareCount()
				.done(pinterestShareCountSuccess)
				.fail(pinterestShareCountFail);
		}
	};
};
