import React from 'react';
import PanelContainer from './PanelContainer';
import PanelToolbar from './PanelToolbar';
import PanelBody from './PanelBody';
import RenderedFont from './RenderedFont';
import {resetCSS} from '../modules/utils';

const styles = {
  fontsContainer: {
    background: '#FFF',
    padding: 10,
    display: 'inline-block'
  }
};

const FontsPanel = React.createClass({
  render: function() {
    const fontList = this.props.data.map(font => <RenderedFont font={font} />);
    const fontsContainerStyle = resetCSS(styles.fontsContainer);

    return (
      <PanelContainer>
        <PanelToolbar title={this.props.title} toggle={this.props.toggle} />
        <PanelBody isOpen={this.props.isOpen}>
          <ul style={fontsContainerStyle}>
            {fontList}
          </ul>
        </PanelBody>
      </PanelContainer>
    );
  }
});

export default FontsPanel;
