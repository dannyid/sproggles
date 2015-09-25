import React from 'react';
import {mergeCSS} from '../../modules/utils';

const styles = {
  colorSquareStyle: {
    backgroundColor: `#FFF`,
    float: 'left',
    paddingTop: `${1 / 12 * 100}%`, // This is a trick for height to match width
    width: `${1 / 12 * 100}%`
  }
};

const ColorSquare = React.createClass({
  render: function() {
    const {color} = this.props;
    const combinedStyles = mergeCSS(styles.colorSquareStyle, {'backgroundColor': color});

    return (
      <div style={combinedStyles}></div>
    );
  }
});

export default ColorSquare;
