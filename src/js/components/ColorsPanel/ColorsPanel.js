import React from 'react';
import PanelContainer from '../PanelContainer';
import ColorSquare from './ColorSquare';
import copyToClipboard from '../../modules/copyToClipboard';


const ColorsPanel = React.createClass({
  getInitialState: function() {
    return {
      selectedColor: null,
      timeout: null
    };
  },

  copyColor: function(selectedColor) {
    clearTimeout(this.state.timeout);
    const timeout = setTimeout(() => {
      this.setState({selectedColor: null, timeout: null});
    }, 2000);

    this.setState({selectedColor, timeout});

    copyToClipboard(selectedColor);
  },

  renderCopiedMessage: function() {
    const {selectedColor} = this.state;
    if (selectedColor === null) {
      return null;
    }
    return <div>Copied: {selectedColor}</div>;
  },

  renderColorSquares: function() {
    const {data} = this.props;
    return data.map(color => <ColorSquare color={color} copyColor={this.copyColor} />);
  },

  render: function() {
    const {title, toggle, isOpen} = this.props;

    return (
      <PanelContainer title={title} toggle={toggle} isOpen={isOpen}>
        {this.renderCopiedMessage()}
        {this.renderColorSquares()}
        <div style={{clear: "both"}}></div>
      </PanelContainer>
    );
  }
});

export default ColorsPanel;
