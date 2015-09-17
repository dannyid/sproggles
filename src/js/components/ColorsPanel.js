import React from 'react';
import PanelContainer from './PanelContainer';
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import ColorSquare from './ColorSquare';

const ColorsPanel = React.createClass({
  render: function() {
    const {data, title, toggle, isOpen} = this.props;
    const colorSquares = data.map(color => <ColorSquare color={color} />);

    return (
      <PanelContainer>
        <PanelHeader title={title} toggle={toggle} />
        <PanelBody isOpen={isOpen}>
          {colorSquares}
          <div style={{clear: "both"}}></div>
        </PanelBody>
      </PanelContainer>
    );
  }
});

export default ColorsPanel;
