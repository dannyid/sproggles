import React from 'react';
import PanelContainer from './PanelContainer';
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import ImageSquare from './ImageSquare';

const ColorsPanel = React.createClass({
  render: function() {
    const {title, toggle, isOpen} = this.props;
    const imageList = this.props.data.map(imageUrl => <ImageSquare imageUrl={imageUrl} />);

    return (
      <PanelContainer>
        <PanelHeader title={title} toggle={toggle} />
        <PanelBody isOpen={isOpen}>
          {imageList}
        </PanelBody>
      </PanelContainer>
    );
  }
});

export default ColorsPanel;
