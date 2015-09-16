import React from 'react';
import {preNormalize} from '../modules/utils';

const styles = {
  colorSquareStyle: {
    backgroundColor: `#FFF`,
    float: 'left',
    paddingTop: `20%`, // This is a trick for height to match width
    width: `20%`
  }
};

const ColorSquare = React.createClass({
  getDefaultProps: function() {
    return {

    };
  },

  render: function() {
    const combinedStyles = preNormalize(styles.colorSquareStyle, {'backgroundColor': this.props.color});

    return (
      <div style={combinedStyles}></div>
    );
  }
});

export default ColorSquare;
