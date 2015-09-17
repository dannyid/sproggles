import React from 'react';
import {resetCSS} from '../modules/utils';

const styles = {
  panelToolbarStyle: {
    backgroundColor: `dodgerblue`,
    border: `1px solid hsl(210, 100%, 48%)`,
    color: `white`,
    cursor: `pointer`,
    display: `table-cell`,
    fontSize: 20,
    fontWeight: 400,
    height: 22,
    padding: 5,
    position: 'relative',
    verticalAlign: `middle`,
    width: 250
  },

  panelToolbarTitleStyle: {
    color: 'inherit',
    cursor: 'pointer',
    fontSize: 'inherit',
    fontWeight: 'inherit'
  },

  closeButtonStyle: {
    color: `inherit`,
    cursor: `pointer`,
    fontFamily: `inherit`,
    fontSize: 18,
    position: `absolute`,
    right: 12,
    textDecoration: `none`,
    transform: `scaleX(1.3)`,
    top: 6
  }
};

const PanelToolbar = React.createClass({
  render: function() {
    const panelToolbarStyle = resetCSS(styles.panelToolbarStyle),
          panelToolbarTitleStyle = resetCSS(styles.panelToolbarTitleStyle),
          closeButtonStyle = resetCSS(styles.closeButtonStyle);

    return (
      <div className='drag-handle' style={panelToolbarStyle}>
        <span style={panelToolbarTitleStyle} onClick={this.props.toggle}>
          {this.props.title}
        </span>
        <a style={closeButtonStyle} onClick={this.props.toggle}>
          x
        </a>
      </div>
    );
  }
});

export default PanelToolbar;
