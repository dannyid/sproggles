import React from 'react';
import $ from 'jquery';
import App from './components/App.js';

const renderApp = (appVisible) => {
  React.render(
    <App visible={appVisible}/>,
    document.getElementById('sproggles-app-container')
  );
};

$(() => {
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
    console.log('Content Script hears click.');
    if (request.action === "toggleApp") {
      console.log('The click is a "toggleApp" event.');
      appVisible = !appVisible;
      renderApp(appVisible);
    }
  });
});
