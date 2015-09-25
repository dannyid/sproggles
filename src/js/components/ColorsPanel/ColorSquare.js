import React from 'react';
import {mergeCSS} from '../../modules/utils';

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
    const {color} = this.props;
    const colorSquareStyle = mergeCSS(styles.colorSquare, {'backgroundColor': color});

    return (
      <div style={colorSquareStyle} onClick={this.handleClick}></div>
    );
  }
});

export default ColorSquare;
