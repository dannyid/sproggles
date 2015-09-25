import React from 'react';
import {mergeCSS} from '../../modules/utils';
import copyToClipboard from '../../modules/copyToClipboard';

const styles = {
  colorSquareStyle: {
    backgroundColor: `#FFF`,
    cursor: 'pointer',
    float: 'left',
    paddingTop: `${1 / 12 * 100}%`, // This is a trick for height to match width
    width: `${1 / 12 * 100}%`
  }
};

const ColorSquare = React.createClass({
  copyColor: function() {
    copyToClipboard(this.props.color);
  },

  render: function() {
    const {color} = this.props;
    const combinedStyles = mergeCSS(styles.colorSquareStyle, {'backgroundColor': color});

    return (
      <div style={combinedStyles} onClick={this.copyColor}></div>
    );
  }
});

export default ColorSquare;
