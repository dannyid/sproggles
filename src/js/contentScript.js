import React from 'react';
import $ from 'jquery';
import App from './components/App.js';

$(() => {
  // Inject the App but only if it's not already injected
  if (document.getElementById('sproggles-app-container') === null) {
    const app = document.createElement('div');
    app.id = 'sproggles-app-container';
    document.body.insertBefore(app, document.body.firstChild);

    React.render(
      <App />,
      document.getElementById('sproggles-app-container')
    );
  }

  // Only send gotten fonts and colors upon message from popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.get === "pageData") {
      // console.log(reduced);
      // // Send data to popup.js
      // sendResponse({
      //   colors: reduced.results.allColors,
      //   fonts: reduced.results.allFonts,
      //   images: reduced.results.allImages,
      //   url: location.origin + (location.pathname || '')
      // });
    }
  });
});
