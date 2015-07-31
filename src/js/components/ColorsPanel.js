import React from 'react';
import Draggable from 'react-draggable';

const important = '!important';

const ColorsPanel = React.createClass({
  getDefaultProps: function() {
    return {
      colorsPanelStyle: {
        base: {
          background: `white ${important}`,
          // border: `1px solid #CCC ${important}`,
          boxShadow: /*0 -1px 0 #e5e5e5,*/ `0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24) ${important}`,
          fontFamily: `Helvetica ${important}`,
          fontSize: 16,
          left: 10,
          padding: 0,
          opacity: 0.98,
          overflow: `hidden ${important}`,
          position: `fixed ${important}`,
          top: 10,
          width: 250,
          zIndex: `9999999999999999 ${important}`
        },

        opened: {
          height: 400
        },

        closed: {
          height: 37
        }
      },

      closeButtonStyle: {
        color: `white ${important}`,
        fontFamily: `Helvetica ${important}`,
        fontSize: 18,
        position: `absolute ${important}`,
        right: 12,
        textDecoration: `none ${important}`,
        transform: `scaleX(1.3) ${important}`,
        top: 6
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

      panelTextStyle: {
        display: `block ${important}`,
        fontFamily: `Helvetica ${important}`,
        fontSize: `14px ${important}`,
        margin: `0 ${important}`,
        padding: `5px ${important}`
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
    const style = Object.assign({}, this.props.colorsPanelStyle.base,
      this.state.isOpen
      ? this.props.colorsPanelStyle.opened
      : this.props.colorsPanelStyle.closed);

    console.log(style);

    return (
      <Draggable>
        <div style={style}>
          <div className="panelToolbar" style={this.props.panelToolbarStyle}>
            <span>
              Colors
            </span>
            <a className="closeButton" style={this.props.closeButtonStyle} onClick={this.togglePanel} href>
              x
            </a>
          </div>
          <p style={this.props.panelTextStyle}>
            Hello, I am a React component embedded on the screen!
          </p>
        </div>
      </Draggable>
    );
  }
});

export default ColorsPanel;
