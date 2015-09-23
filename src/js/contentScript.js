import React from 'react';
import {domReady} from './modules/utils'; // Replacement for jQuery's ready function
import App from './components/App.js';

domReady(() => {
  let appVisible = false;
  // Receive browserAction click event from background script and toggle app
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleApp") {
      if (appVisible) {
        document.getElementById('sproggles-app-container').remove();
      } else {
        const app = document.createElement('div');
        app.id = 'sproggles-app-container';
        document.body.insertBefore(app, document.body.firstChild);
        React.render(
          <App />,
          document.getElementById('sproggles-app-container')
        );
      }
      appVisible = !appVisible;
    }
  });
});
