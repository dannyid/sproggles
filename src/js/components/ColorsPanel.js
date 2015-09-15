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
            background: `white`,
            // border: `1px solid #CCC`,
            boxShadow: /*0 -1px 0 #e5e5e5,*/ `0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)`,
            fontFamily: `Helvetica`,
            fontSize: 16,
            left: 10,
            padding: 0,
            opacity: 0.98,
            overflow: `hidden`,
            position: `fixed`,
            top: 10,
            width: 250,
            zIndex: `9999999999999999`
          },

          opened: {
            height: 400
          },

          closed: {
            height: 35
          }
        },

        closeButtonStyle: {
          color: `white`,
          fontFamily: `Helvetica`,
          fontSize: 18,
          position: `absolute`,
          right: 12,
          textDecoration: `none`,
          transform: `scaleX(1.3)`,
          top: 6
        },

        panelToolbarStyle: {
          backgroundColor: `dodgerblue`,
          border: `1px solid hsl(210, 100%, 48%)`,
          color: `white`,
          display: `table-cell`,
          fontSize: `20px`,
          fontWeight: `400`,
          height: `22px`,
          padding: `5px`,
          verticalAlign: `middle`,
          width: `250px`
        },

        panelTextStyle: {
          display: `block`,
          fontFamily: `Helvetica`,
          fontSize: `14px`,
          margin: `0`,
          padding: `5px`
        }
      }
    };
  },

  getInitialState: function() {
    return {
      isOpen: true
    };
  },

  togglePanel: function(e) {
    e.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  render: function() {
    const openState =
      this.state.isOpen
      ? this.props.styles.colorsPanelStyle.opened
      : this.props.styles.colorsPanelStyle.closed;

    return (
      <div className="colorsPanel" style={preNormalize(this.props.styles.colorsPanelStyle.base, openState)}>
        <div className="panelToolbar" style={preNormalize(this.props.styles.panelToolbarStyle)}>
          <span>
            Colors
          </span>
          <a className="closeButton" style={preNormalize(this.props.styles.closeButtonStyle)} onClick={this.togglePanel} href>
            x
          </a>
        </div>
        <p style={preNormalize(this.props.styles.panelTextStyle)}>
          Hello, I am a React component embedded on the screen!
        </p>
        {this.props.colors.map(function(color){
          return (
            <ColorSquare color={color}/>
          );
        })}
      </div>
    );
  }
});

export default ColorsPanel;
