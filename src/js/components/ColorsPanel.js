import React from 'react';
import ColorSquare from './ColorSquare';
import {preNormalize} from '../modules/utils';

const important = '!important';

// const colors = ['#CCC', '#999', '#333', '#CCC', '#CCC'];

const ColorsPanel = React.createClass({
  getDefaultProps: function() {
    return {
      styles: {
        colorsPanelStyle: {
          base: {
            fontFamily: `Helvetica`,
            fontSize: 16,
            padding: 0,
            overflow: `hidden`,
            display: `block`
          },

          opened: {
            height: 400
          },

          closed: {
            height: 35
          }
        },

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
        },

        panelTextStyle: {
          display: `block`,
          fontFamily: `inherit`,
          fontSize: 14,
          margin: 0,
          padding: 5
        },

        colorSquaresContainer: {
          display: `block`,
          position: `relative`
        }
      }
    };
  },

  render: function() {
    const openState =
      this.props.open
      ? this.props.styles.colorsPanelStyle.opened
      : this.props.styles.colorsPanelStyle.closed;

    return (
      <div className="colors-panel" style={preNormalize(this.props.styles.colorsPanelStyle.base, openState)}>
        <div className="panel-toolbar" style={preNormalize(this.props.styles.panelToolbarStyle)}>
          <span style={preNormalize(this.props.styles.panelToolbarTitleStyle)}>
            {this.props.title}
          </span>
          <a className="close-button" style={preNormalize(this.props.styles.closeButtonStyle)} onClick={this.props.toggle}>
            x
          </a>
        </div>
        <p style={preNormalize(this.props.styles.panelTextStyle)}>
          Hello, I am a React component embedded on the screen!
        </p>
        <div className="color-squares-container" style={preNormalize(this.props.styles.colorSquaresContainer)}>
          {this.props.data.map(function(color){
            return (
              <ColorSquare color={color} />
            );
          })}
          <div style={{clear: "both"}}></div>
        </div>
      </div>
    );
  }
});

export default ColorsPanel;
