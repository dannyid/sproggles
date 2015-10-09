import React from 'react';
import PanelContainer from '../PanelContainer';
import ImageSquare from './ImageSquare';

const ImagesPanel = React.createClass({
  renderImageSquares() {
    return this.props.images.map((imageUrl, index) => <ImageSquare key={index} imageUrl={imageUrl} />);
  },

  render() {
    const {title, toggle, isOpen} = this.props;
    return (
      <PanelContainer title={title} toggle={toggle} isOpen={isOpen}>
        {this.renderImageSquares()}
      </PanelContainer>
    );
  }
});

export default ImagesPanel;
