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

const PanelHeader = React.createClass({
  render: function() {
    const PanelHeaderStyle = resetCSS(styles.PanelHeaderStyle),
          PanelHeaderTitleStyle = resetCSS(styles.PanelHeaderTitleStyle),
          closeButtonStyle = resetCSS(styles.closeButtonStyle);

    const {toggle} = this.props;

    return (
      <div className='drag-handle' style={PanelHeaderStyle}>
        <span style={PanelHeaderTitleStyle} onClick={toggle}>
          {this.props.title}
        </span>
        <a style={closeButtonStyle} onClick={toggle}>
          x
        </a>
      </div>
    );
  }
});

export default PanelHeader;
