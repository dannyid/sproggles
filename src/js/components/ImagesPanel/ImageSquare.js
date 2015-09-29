import React from 'react';

const styles = {
 imageSquareContainer: {
    display: 'inline-block',
    float: 'left',
    width: `${1 / 6 * 100}%`,
    verticalAlign: 'middle',
    position: 'relative'
  },

  img: {
    width: '100%',
    display: 'block'
  }
};

const ImageSquare = React.createClass({
  render() {
    const {imageUrl} = this.props;

    return (
      <div style={styles.imageSquareContainer}>
        <a target="_blank" href={imageUrl}>
          <img src={imageUrl} style={styles.img} />
        </a>
      </div>
    );
  }
});

export default ImageSquare;
