import {getJSON as $getJSON} from 'jquery';

const searchTerm = encodeURIComponent('inbound marketing');

$getJSON(`https://www.google.com`)
.done(function(data) {
  console.log(data);
});
