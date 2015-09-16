import React from 'react';
import PanelContainer from './PanelContainer';
import PanelToolbar from './PanelToolbar';
import PanelBody from './PanelBody';
import ImageSquare from './ImageSquare';

const ColorsPanel = React.createClass({
  render: function() {
    const imageList = this.props.data.map(imageUrl => <ImageSquare imageUrl={imageUrl} />);

    return (
      <PanelContainer>
        <PanelToolbar title={this.props.title} toggle={this.props.toggle} />
        <PanelBody isOpen={this.props.isOpen}>
          {imageList}
        </PanelBody>
      </PanelContainer>
    );
  }
});

export default ColorsPanel;
