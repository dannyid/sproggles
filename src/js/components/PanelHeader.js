import React from 'react';
import {resetCSS} from '../modules/utils';

const styles = {
  panelHeaderStyle: {
    backgroundColor: `dodgerblue`,
    border: `1px solid hsl(210, 100%, 48%)`,
    color: `white`,
    cursor: `pointer`,
    display: `block`,
    fontSize: 20,
    fontWeight: 400,
    height: 34,
    padding: 5,
    position: 'relative',
    verticalAlign: `middle`
  },

  panelHeaderTitleStyle: {
    color: 'inherit',
    cursor: 'pointer',
    fontSize: 'inherit',
    fontWeight: 'inherit'
  },

  openArrowStyle: {
    color: `#80BFFF`,
    cursor: `pointer`,
    fontFamily: `inherit`,
    fontSize: 12,
    position: `absolute`,
    right: 12,
    textDecoration: `none`,
    transform: `scaleX(1.3)`,
    top: 10
  }
};

const PanelHeader = React.createClass({
  render: function() {
    const panelHeaderStyle = resetCSS(styles.panelHeaderStyle),
          panelHeaderTitleStyle = resetCSS(styles.panelHeaderTitleStyle),
          openArrowStyle = resetCSS(styles.openArrowStyle);

    const {toggle, isOpen, title} = this.props;

    const arrow = isOpen ? '▼' : '▲';

    return (
      <div className='drag-handle' style={panelHeaderStyle}>
        <a style={panelHeaderTitleStyle} onClick={toggle}>
          {title}
        </a>
        <a style={openArrowStyle} onClick={toggle}>
          {arrow}
        </a>
      </div>
    );
  }
});

export default PanelHeader;
