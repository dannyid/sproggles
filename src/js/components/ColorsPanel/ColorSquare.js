import React from 'react';

const styles = {
  colorSquare: {
    backgroundColor: `#FFF`,
    cursor: 'pointer',
    float: 'left',
    paddingTop: `${1 / 12 * 100}%`, // This is a trick for height to match width
    width: `${1 / 12 * 100}%`
  }
};

const ColorSquare = React.createClass({
  handleClick: function(e) {
    const {copyColor, color} = this.props;
    copyColor(color);
  },

  render: function() {
    const bgColor = {'backgroundColor': this.props.color};
    const colorSquareStyle = {...styles.colorSquare, ...bgColor};

    return (
      <div style={colorSquareStyle} onClick={this.handleClick}></div>
    );
  }
});

export default ColorSquare;
