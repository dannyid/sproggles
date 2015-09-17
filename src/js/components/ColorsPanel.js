import React from 'react';
import PanelContainer from './PanelContainer';
import ColorSquare from './ColorSquare';

const ColorsPanel = React.createClass({
  render: function() {
    const {data, title, toggle, isOpen} = this.props;
    const colorSquares = data.map(color => <ColorSquare color={color} />);

    return (
      <PanelContainer title={title} toggle={toggle} isOpen={isOpen}>
        {colorSquares}
        <div style={{clear: "both"}}></div>
      </PanelContainer>
    );
  }
});

export default ColorsPanel;
