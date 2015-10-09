import React from 'react';
import PanelContainer from '../PanelContainer';
import RenderedFont from './RenderedFont';

const styles = {
  ul: {
    background: '#FFF',
    padding: 10,
    display: 'inline-block'
  }
};

const FontsPanel = React.createClass({
  renderFontList() {
    return Object.keys(this.props.fonts)
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      .map((font, index) => <RenderedFont key={index} font={font} />);
  },

  render() {
    const {title, toggle, isOpen} = this.props;
    return (
      <PanelContainer title={title} toggle={toggle} isOpen={isOpen}>
        <ul style={styles.ul}>
          {this.renderFontList()}
        </ul>
      </PanelContainer>
    );
  }
});

export default FontsPanel;
