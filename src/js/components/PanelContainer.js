import React from 'react';
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import {resetCSS} from '../modules/utils';

const styles = {
  panelContainer: {
    fontFamily: `Helvetica`,
    fontSize: 14,
    padding: 0,
    margin: 0,
    overflow: `hidden`,
    display: `block`
  }
};

const PanelContainer = React.createClass({
  render: function() {
    const {title, toggle, isOpen} = this.props;
    const panelContainerStyle = resetCSS(styles.panelContainer);

    return (
      <div style={panelContainerStyle}>
        <PanelHeader title={title} toggle={toggle} isOpen={isOpen} />
        <PanelBody isOpen={isOpen}>
          {this.props.children}
        </PanelBody>
      </div>
    );
  }
});

export default PanelContainer;
