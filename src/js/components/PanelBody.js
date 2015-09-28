import React from 'react';
import {mergeCSS} from '../modules/utils';

const styles = {
  panelBodyContainer: {
    base: {
      display: `block`,
      position: `relative`,
      overflowX: 'hidden',
      overflowY: `auto`
    },

    opened: {
      maxHeight: 400
    },

    closed: {
      height: 0,
      maxHeight: 0
    }
  }
};

const PanelBody = React.createClass({
  render: function() {
    const openCloseStyle =
      this.props.isOpen
      ? styles.panelBodyContainer.opened
      : styles.panelBodyContainer.closed;

    const panelBodyContainerStyle = mergeCSS(styles.panelBodyContainer.base, openCloseStyle);

    return (
      <div style={panelBodyContainerStyle}>
        {this.props.children}
      </div>
    );
  }
});

export default PanelBody;
