import React from 'react';

const ColorSquare = React.createClass({
  getDefaultProps: function() {
    return {
      colorSquareStyle: {
        backgroundColor: `#FFF`,
        float: 'left',
        height: `50px`,
        width: `50px`
      }
    };
  },

  combineStyles: function(backgroundColor) {
    return Object.assign({}, this.props.colorSquareStyle, backgroundColor);
  },

  render: function() {
    const combinedStyles = this.combineStyles({'backgroundColor': this.props.color});

    return (
      <div className="color-square" style={combinedStyles}>
      </div>
    );
  }
});

export default ColorSquare;
