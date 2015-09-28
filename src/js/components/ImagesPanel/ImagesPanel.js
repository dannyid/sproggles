import React from 'react';
import PanelContainer from '../PanelContainer';
import ImageSquare from './ImageSquare';

const ColorsPanel = React.createClass({
  renderImageSquares: function() {
    return this.props.data.map(imageUrl => <ImageSquare imageUrl={imageUrl} />);
  },

  render: function() {
    const {title, toggle, isOpen} = this.props;
    return (
      <PanelContainer title={title} toggle={toggle} isOpen={isOpen}>
        {this.renderImageSquares()}
      </PanelContainer>
    );
  }
});

export default ColorsPanel;
