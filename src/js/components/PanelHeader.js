import React from 'react';
import {resetCSS} from '../modules/utils';

const styles = {
  PanelHeaderStyle: {
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

  PanelHeaderTitleStyle: {
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
    const PanelHeaderStyle = resetCSS(styles.PanelHeaderStyle),
          PanelHeaderTitleStyle = resetCSS(styles.PanelHeaderTitleStyle),
          openArrowStyle = resetCSS(styles.openArrowStyle);

    const {toggle, isOpen, title} = this.props;

    const arrow = isOpen ? '▼' : '▲';

    return (
      <div className='drag-handle' style={PanelHeaderStyle}>
        <span style={PanelHeaderTitleStyle} onClick={toggle}>
          {title}
        </span>
        <a style={openArrowStyle} onClick={toggle}>
          {arrow}
        </a>
      </div>
    );
  }
});

export default PanelHeader;
