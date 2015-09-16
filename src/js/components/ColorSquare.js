import React from 'react';

const ColorSquare = React.createClass({
  getDefaultProps: function() {
    return {
      colorSquareStyle: {
        backgroundColor: `#FFF`,
        float: 'left',
        paddingTop: `20%`, // This is a trick for height to match width
        width: `20%`
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
