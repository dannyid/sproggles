import React from 'react';
import * as mixpanelEvents from '../modules/mixpanelEvents';
import {mergeCSS} from '../modules/utils';

const styles = {
  iconContainer: {
    base: {
      borderRadius: 17,
      bottom: -3,
      display: 'inline-block',
      float: 'right',
      height: 17,
      position: 'relative',
      right: 30,
      WebkitFilter: 'invert(1)',
      width: 17
    },

    click: {
      backgroundColor: 'yellow',
      WebkitFilter: 'invert(0)'
    }
  },

  a: {
    height: '100%',
    width: '100%'
  },

  img: {
    height: '100%',
    width: '100%'
  }
};

const HelpIcon = React.createClass({
  handleClick: function() {
    mixpanelEvents.feedbackButtonClicked();
  },

  render: function() {
    const extensionId = chrome.i18n.getMessage('@@extension_id');
    const imageUrl = `chrome-extension://${extensionId}/img/help-icon-128.png`;
    const helpUrl = `chrome-extension://${extensionId}/html/intro.html`;

    return (
      <div style={styles.iconContainer.base}>
        <a href={helpUrl} target="_blank" style={styles.a} onClick={this.handleClick}>
          <img src={imageUrl} style={styles.img} />
        </a>
      </div>
    );
  }
});

export default HelpIcon;
