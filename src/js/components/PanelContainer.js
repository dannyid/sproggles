import React from 'react';
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
    const panelContainerStyle = resetCSS(styles.panelContainer);

    return (
      <div style={panelContainerStyle}>
        {this.props.children}
      </div>
    );
  }
});

export default PanelContainer;
