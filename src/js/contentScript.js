import React from 'react';
import {domReady} from './modules/utils'; // Replacement for jQuery's ready function
import App from './components/App.js';

function mountApp() {
  console.log('mountApp');
  React.render(
    <App />,
    document.getElementById('sproggles-app-container')
  );
  return true;
}

function unmountApp() {
  console.log('unmountApp');
  const appContainer = document.getElementById('sproggles-app-container');
  // The below returns false is there's no React component mounted
  return React.unmountComponentAtNode(appContainer);
}

domReady(() => {
  // Inject app container div
  const app = document.createElement('div');
  app.id = 'sproggles-app-container';
  document.body.insertBefore(app, document.body.firstChild);

  // Receive browserAction click event from background script and toggle app
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleApp") {
      unmountApp() || mountApp();
    }
  });
});
