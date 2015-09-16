import React from 'react';
import {preNormalize} from '../modules/utils';

const PanelContainer = React.createClass({
  getDefaultProps: function() {
    return {
      styles: {
        panelContainer: {
          fontFamily: `Helvetica`,
          fontSize: 14,
          padding: 0,
          margin: 0,
          overflow: `hidden`,
          display: `block`
        }
      }
    };
  },

  render: function() {
    return (
      <div style={preNormalize(this.props.styles.panelContainer)}>
        {this.props.children}
      </div>
    );
  }
});

export default PanelContainer;
