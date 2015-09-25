import React from 'react';
import PanelContainer from '../PanelContainer';
import RenderedFont from './RenderedFont';
import {mergeCSS} from '../../modules/utils';

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
    const fontsContainerStyle = mergeCSS(styles.fontsContainer);

    return (
      <PanelContainer title={title} toggle={toggle} isOpen={isOpen}>
        <ul style={fontsContainerStyle}>
          {fontList}
        </ul>
      </PanelContainer>
    );
  }
});

export default FontsPanel;
