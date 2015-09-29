import React from 'react';
import {domReady} from './modules/utils'; // Replacement for jQuery's ready function
import {CURRENT_EXTENSION_ID} from './modules/constants';
import App from './components/App.js';

function mountApp() {
  React.render(
    <App />,
    document.getElementById('sproggles-app-container')
  );
  return true;
}

function unmountApp() {
  const appContainer = document.getElementById('sproggles-app-container');
  // The below returns false is there's no React component mounted
  return React.unmountComponentAtNode(appContainer);
}

domReady(() => {
  // Inject app container div
  const app = document.createElement('div');
  app.id = 'sproggles-app-container';
  document.body.appendChild(app);

  const resetStyle = document.createElement('link');
  resetStyle.type = 'text/css';
  resetStyle.rel = 'stylesheet';
  resetStyle.href = `chrome-extension://${CURRENT_EXTENSION_ID}/css/style.min.css`;
  document.head.appendChild(resetStyle);

  // Receive browserAction click event from background script and toggle app
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleApp") {
      unmountApp() || mountApp();
    }
  });
});
