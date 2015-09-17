import React from 'react';
import PanelContainer from './PanelContainer';
import ImageSquare from './ImageSquare';

const ColorsPanel = React.createClass({
  render: function() {
    const {title, toggle, isOpen} = this.props;
    const imageList = this.props.data.map(imageUrl => <ImageSquare imageUrl={imageUrl} />);

    return (
      <PanelContainer title={title} toggle={toggle} isOpen={isOpen}>
        {imageList}
      </PanelContainer>
    );
  }
});

export default ColorsPanel;
