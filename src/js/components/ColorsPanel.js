import React from 'react';
import ColorSquare from './ColorSquare';
import {preNormalize} from '../modules/utils';

const important = '!important';

// const colors = ['#CCC', '#999', '#333', '#CCC', '#CCC'];

const ColorsPanel = React.createClass({
  getInitialState: function() {
    return {
      open: true
    };
  },

  getDefaultProps: function() {
    return {
      colorsPanelStyle: {
        background: `white ${important}`,
        // border: `1px solid #CCC ${important}`,
        boxShadow: /*0 -1px 0 #e5e5e5,*/ `0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24) ${important}`,
        fontFamily: `Helvetica ${important}`,
        fontSize: `16px ${important}`,
        height: `400px ${important}`,
        left: `10px ${important}`,
        padding: `0 ${important}`,
        opacity: `0.98 ${important}`,
        position: `fixed ${important}`,
        textAlign: `left ${important}`,
        top: `10px ${important}`,
        width: `250px ${important}`,
        zIndex: `9999999999999999 ${important}`
      },

      panelToolbarStyle: {
        backgroundColor: `dodgerblue ${important}`,
        border: `1px solid hsl(210, 100%, 48%) ${important}`,
        color: `white ${important}`,
        display: `table-cell ${important}`,
        fontSize: `20px ${important}`,
        fontWeight: `400 ${important}`,
        height: `22px ${important}`,
        padding: `5px ${important}`,
        verticalAlign: `middle ${important}`,
        width: `250px ${important}`
      },

      closeButtonStyle: {
        color: `white ${important}`,
        fontFamily: `Helvetica ${important}`,
        fontSize: `18px ${important}`,
        position: `absolute ${important}`,
        right: `12px ${important}`,
        textDecoration: `none ${important}`,
        transform: `scaleX(1.3) ${important}`,
        top: `6px ${important}`
      },

      panelTextStyle: {
        display: `block ${important}`,
        fontFamily: `Helvetica ${important}`,
        fontSize: `14px ${important}`,
        margin: `0 ${important}`,
        padding: `5px ${important}`
      }
    };
  },

  closePanel: function(e) {
    e.preventDefault();

    this.setState({
      open: false
    });
  },

  render: function() {
    if (this.state.open) {
      return (
        <div className="colorsPanel" style={this.props.colorsPanelStyle}>
          <div className="panelToolbar" style={this.props.panelToolbarStyle}>
            <span>
              Colors
            </span>
            <a className="closeButton" style={this.props.closeButtonStyle} onClick={this.closePanel} href>
              x
            </a>
          </div>

          <p style={this.props.panelTextStyle}>
            Hello, I am a React component embedded on the screen!
          </p>
          {this.props.colors.map(function(color){
            return (
              <ColorSquare color={color}/>
            );
          })}
        </div>
      );
    } else {
      return (
        <span></span>
      );
    }
  }
});

export default ColorsPanel;
