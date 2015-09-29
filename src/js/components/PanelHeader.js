import React from 'react';
import HelpIcon from './HelpIcon';

const styles = {
  panelHeader: {
    backgroundColor: `dodgerblue`,
    border: `1px solid hsl(210, 100%, 48%)`,
    color: `white`,
    cursor: `-webkit-grab`,
    display: `block`,
    fontSize: 20,
    fontWeight: 400,
    height: 34,
    padding: 5,
    position: 'relative',
    verticalAlign: `middle`
  },

  panelHeaderTitle: {
    color: 'inherit',
    cursor: 'pointer',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    textDecoration: 'none'
  },

  openArrow: {
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
  render() {
    const {toggle, isOpen, title} = this.props;

    const arrow = isOpen ? '▼' : '▲';

    const helpIcon = isOpen ? <HelpIcon /> : null;

    return (
      <div className='drag-handle' style={styles.panelHeader}>
        <a style={styles.panelHeaderTitle} onClick={toggle}>
          {title}
        </a>
        {helpIcon}
        <a style={styles.openArrow} onClick={toggle}>
          {arrow}
        </a>
      </div>
    );
  }
});

export default PanelHeader;
