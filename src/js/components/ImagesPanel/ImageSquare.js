import React from 'react';
import {mergeCSS} from '../../modules/utils';

const styles = {
 imageSquareContainer: {
    display: 'inline-block',
    float: 'left',
    width: `${1 / 6 * 100}%`,
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
    const {imageUrl} = this.props;
    const imageSquareContainerStyle = mergeCSS(styles.imageSquareContainer);

    return (
      <div style={imageSquareContainerStyle}>
        <a target="_blank" href={imageUrl}>
          <img src={imageUrl} style={styles.image} />
        </a>
      </div>
    );
  }
});

export default ImageSquare;
