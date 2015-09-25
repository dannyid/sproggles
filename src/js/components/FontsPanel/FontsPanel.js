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
  render: function() {
    const {data, title, toggle, isOpen} = this.props;
    const fontList = data.map(font => <RenderedFont font={font} />);

    return (
      <PanelContainer title={title} toggle={toggle} isOpen={isOpen}>
        <ul style={styles.ul}>
          {fontList}
        </ul>
      </PanelContainer>
    );
  }
});

export default FontsPanel;
