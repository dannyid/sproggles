import React from 'react';
import PanelContainer from '../PanelContainer';
import ColorSquare from './ColorSquare';
import copyToClipboard from '../../modules/copyToClipboard';
import * as mixpanelEvents from '../../modules/mixpanelEvents';

const styles = {
  colorCopiedContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    pointerEvents: 'none',
    position: 'absolute',
    width: '100%'
  },

  colorCopiedMessage: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 5,
    color: 'white',
    fontSize: '150%',
    fontWeight: 100,
    padding: 20,
    pointerEvents: 'none'
  }
};

const ColorsPanel = React.createClass({
  getInitialState() {
    return {
      selectedColor: null,
      timeout: null
    };
  },

  copyColor(selectedColor) {
    // Show "copied" message upon copy and then remove it after 1.2 seconds
    clearTimeout(this.state.timeout);
    const timeout = setTimeout(() => {
      this.setState({selectedColor: null, timeout: null});
    }, 1200);

    this.setState({selectedColor, timeout});
    copyToClipboard(selectedColor);
    mixpanelEvents.colorCopied(selectedColor);
  },

  renderCopiedMessage() {
    const {selectedColor} = this.state;
    if (selectedColor === null) {
      return null;
    }
    return (
      <div style={styles.colorCopiedContainer}>
        <span style={styles.colorCopiedMessage}>
          {'Copied: ' + selectedColor}
        </span>
      </div>
    );
  },

  renderColorSquares() {
    const {data} = this.props;
    return Object.keys(data).map((color, index) => <ColorSquare key={index} color={color} copyColor={this.copyColor} />);
  },

  render() {
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
