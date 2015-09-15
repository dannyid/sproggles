import React from 'react';

const ColorSquare = React.createClass({
  componentWillMount: function() {
    this.props.colorSquareStyle.backgroundColor = this.props.color;
  },

  getDefaultProps: function() {
    return {
      colorSquareStyle: {
        backgroundColor: `#FFF`,
        float: 'left',
        height: `25px`,
        width: `25px`
      }
    };
  },

  render: function() {
    return (
      <div className="color-square" style={this.props.colorSquareStyle}>
      </div>
    );
  }
});

export default ColorSquare;
