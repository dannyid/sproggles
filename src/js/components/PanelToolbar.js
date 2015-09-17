import React from 'react';
import {preNormalize} from '../modules/utils';

const PanelToolbar = React.createClass({
  getDefaultProps: function() {
    return {
      styles: {
        panelToolbarStyle: {
          backgroundColor: `dodgerblue`,
          border: `1px solid hsl(210, 100%, 48%)`,
          color: `white`,
          display: `table-cell`,
          fontSize: 20,
          fontWeight: 400,
          height: 22,
          padding: 5,
          position: 'relative',
          verticalAlign: `middle`,
          width: 250
        },

        panelToolbarTitleStyle: {
          color: 'inherit',
          cursor: 'pointer',
          fontSize: 'inherit',
          fontWeight: 'inherit'
        },

        closeButtonStyle: {
          color: `inherit`,
          cursor: `pointer`,
          fontFamily: `inherit`,
          fontSize: 18,
          position: `absolute`,
          right: 12,
          textDecoration: `none`,
          transform: `scaleX(1.3)`,
          top: 6
        }
      }
    };
  },

  render: function() {
    const panelToolbarStyle = preNormalize(this.props.styles.panelToolbarStyle);
    const panelToolbarTitleStyle = preNormalize(this.props.styles.panelToolbarTitleStyle);
    const closeButtonStyle = preNormalize(this.props.styles.closeButtonStyle);

    return (
      <div className="panel-toolbar" style={panelToolbarStyle}>
        <span style={panelToolbarTitleStyle} onClick={this.props.toggle}>
          {this.props.title}
        </span>
        <a className="close-button" style={closeButtonStyle} onClick={this.props.toggle}>
          x
        </a>
      </div>
    );
  }
});

export default PanelToolbar;
