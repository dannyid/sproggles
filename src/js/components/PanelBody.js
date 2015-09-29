import React from 'react';

const styles = {
  panelBodyContainer: {
    base: {
      display: `block`,
      position: `relative`,
      overflowX: 'hidden',
      overflowY: `auto`
    },

    opened: {
      maxHeight: 400
    },

    closed: {
      height: 0,
      maxHeight: 0
    }
  }
};

const PanelBody = React.createClass({
  render: function() {
    const openCloseStyle =
      this.props.isOpen
      ? styles.panelBodyContainer.opened
      : styles.panelBodyContainer.closed;

    const panelBodyContainerStyle = {...styles.panelBodyContainer.base, ...openCloseStyle};

    return (
      <div style={panelBodyContainerStyle} ref="PanelBody">
        {this.props.children}
      </div>
    );
  }
});

export default PanelBody;
