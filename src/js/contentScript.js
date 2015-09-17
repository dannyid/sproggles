import React from 'react';
import {domReady} from './modules/utils'; // Replacement for jQuery's ready function
import App from './components/App.js';

const renderApp = (appVisible) => {
  React.render(
    <App visible={appVisible}/>,
    document.getElementById('sproggles-app-container')
  );
};

domReady(() => {
  let appVisible = false;
  // Inject the App but only if it's not already injected
  if (document.getElementById('sproggles-app-container') === null) {
    const app = document.createElement('div');
    app.id = 'sproggles-app-container';
    document.body.insertBefore(app, document.body.firstChild);
    renderApp(appVisible);
  }

  // Receive browserAction click event from background script and toggle app
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleApp") {
      appVisible = !appVisible;
      renderApp(appVisible);
    }
  });
});
