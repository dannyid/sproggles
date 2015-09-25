import React from 'react';
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';

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

    return (
      <div style={styles.panelContainer}>
        <PanelHeader title={title} toggle={toggle} isOpen={isOpen} />
        <PanelBody isOpen={isOpen}>
          {this.props.children}
        </PanelBody>
      </div>
    );
  }
});

export default PanelContainer;
