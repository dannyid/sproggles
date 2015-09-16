import React from 'react';
import {preNormalize} from '../modules/utils';

const styles = {
 imageSquareContainer: {
    display: 'inline-block',
    float: 'left',
    width: '33.333%',
    verticalAlign: 'middle',
    position: 'relative'
  },

  image: {
    width: '100%',
    display: 'block'
  }
};

const ImageSquare = React.createClass({
  render: function() {
    const imageSquareContainerStyle = preNormalize(styles.imageSquareContainer);

    return (
      <div style={imageSquareContainerStyle}>
        <a target="_blank" href={this.props.imageUrl}>
          <img src={this.props.imageUrl} style={styles.image} />
        </a>
      </div>
    );
  }
});

export default ImageSquare;
