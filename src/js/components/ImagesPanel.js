import React from 'react';
import PanelContainer from './PanelContainer';
import PanelToolbar from './PanelToolbar';
import PanelBody from './PanelBody';

const ColorsPanel = React.createClass({
  render: function() {
    return (
      <PanelContainer>
        <PanelToolbar title={this.props.title} toggle={this.props.toggle} />
        <PanelBody isOpen={this.props.isOpen}>
          <div>images panel</div>
        </PanelBody>
      </PanelContainer>
    );
  }
});

export default ColorsPanel;
