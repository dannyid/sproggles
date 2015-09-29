import React from 'react';
import {CURRENT_EXTENSION_ID} from '../modules/constants';

const LoadingSpinner = React.createClass({
  render() {
    const imageUrl = `chrome-extension://${CURRENT_EXTENSION_ID}/img/loading-spinner.gif`;

    return (
      <img src={imageUrl} style={{width: 16}}/>
    );
  }
});

export default LoadingSpinner;
