import React from 'react';
import {preNormalize} from '../modules/utils';

const PanelBody = React.createClass({
  getDefaultProps: function() {
    return {
      styles: {
        panelBodyContainer: {
          base: {
            display: `block`,
            position: `relative`,
            overflow: `scroll`
          },

          opened: {
            maxHeight: 400
          },

          closed: {
            height: 0,
            maxHeight: 0
          }
        }
      }
    };
  },

  render: function() {
    const openState =
      this.props.isOpen
      ? this.props.styles.panelBodyContainer.opened
      : this.props.styles.panelBodyContainer.closed;

    return (
      <div style={preNormalize(this.props.styles.panelBodyContainer.base, openState)}>
        {this.props.children}
      </div>
    );
  }
});

export default PanelBody;
