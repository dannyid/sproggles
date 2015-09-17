import React from 'react';
import PanelContainer from './PanelContainer';
import PanelHeader from './PanelHeader';
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
    const {data, title, toggle, isOpen} = this.props;
    const fontList = data.map(font => <RenderedFont font={font} />);
    const fontsContainerStyle = resetCSS(styles.fontsContainer);

    return (
      <PanelContainer>
        <PanelHeader title={title} toggle={toggle} />
        <PanelBody isOpen={isOpen}>
          <ul style={fontsContainerStyle}>
            {fontList}
          </ul>
        </PanelBody>
      </PanelContainer>
    );
  }
});

export default FontsPanel;
