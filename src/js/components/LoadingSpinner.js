import React from 'react';

const LoadingSpinner = React.createClass({
  render() {
    const extensionId = chrome.i18n.getMessage('@@extension_id');
    const imageUrl = `chrome-extension://${extensionId}/img/loading-spinner.gif`;

    return (
      <img src={imageUrl} style={{width: 16}}/>
    );
  }
});

export default LoadingSpinner;
