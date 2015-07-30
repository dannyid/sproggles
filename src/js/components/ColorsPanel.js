import React from 'react';
import Draggable from 'react-draggable';


const ColorsPanel = React.createClass({
  getInitialState: function() {
    return {
      open: true
    }
  },

  getDefaultProps: function() {
    return {
      colorsPanelStyle: {
        background: 'white',
        border: '1px solid #CCC',
        boxShadow: '0 -1px 0 #e5e5e5, 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
        fontSize: '16px',
        fontStyle: 'Helvetica',
        height: '500px',
        left: '30px',
        padding: '5px',
        position: 'fixed',
        top: '30px',
        width: '300px',
        zIndex: '9999999999999999 !important'
      },

      closeButtonStyle: {
        color: 'dodgerblue',
        fontSize: '15px',
        fontFamily: 'Helvetica',
        height: '7px',
        position: 'absolute',
        right: '7px',
        textDecoration: 'none',
        transform: 'scaleX(1.3)',
        top: '-1px',
        width: '7px'
      },
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
        <Draggable>
          <div className="colorsPanel" style={this.props.colorsPanelStyle}>
            <p>
              Hello, I am a React component embedded on the screen!
            </p>
            <a
              className="closeButton"
              style={this.props.closeButtonStyle}
              onClick={this.closePanel}
              href>
              x
            </a>
          </div>
        </Draggable>
      );
    } else {
      return(
        <span></span>
      )
    }
  }
});


export default ColorsPanel;
