import React from 'react';
import * as mixpanelEvents from '../modules/mixpanelEvents';
import {CURRENT_EXTENSION_ID} from '../modules/constants';


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
  handleClick() {
    mixpanelEvents.feedbackButtonClicked();
  },

  render() {
    const imageUrl = `chrome-extension://${CURRENT_EXTENSION_ID}/img/help-icon-128.png`;
    const helpUrl = `chrome-extension://${CURRENT_EXTENSION_ID}/html/intro.html`;

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
