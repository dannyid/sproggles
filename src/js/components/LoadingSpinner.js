import React from 'react';

const LeadingSpinner = React.createClass({
  render: function() {
    const extensionId = chrome.i18n.getMessage('@@extension_id');
    const imageUrl = `chrome-extension://${extensionId}/img/loading-spinner.gif`;

    return (
      <img src={imageUrl} style={{width: 16}}/>
    );
  }
});

export default LeadingSpinner;
