import React from 'react';
import {resetCSS} from '../modules/utils';

const styles = {
  colorSquareStyle: {
    backgroundColor: `#FFF`,
    float: 'left',
    paddingTop: `${1 / 6 * 100}%`, // This is a trick for height to match width
    width: `${1 / 6 * 100}%`
  }
};

const ColorSquare = React.createClass({
  render: function() {
    const combinedStyles = resetCSS(styles.colorSquareStyle, {'backgroundColor': this.props.color});

    return (
      <div style={combinedStyles}></div>
    );
  }
});

export default ColorSquare;
