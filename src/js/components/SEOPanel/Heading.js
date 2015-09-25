import React from 'react';
import {resetCSS} from '../../modules/utils';

const styles = {
  containerStyle: {
    display: 'block',
    marginTop: 10,
    textAlign: 'center'
  },

  headerStyle: {
    color: 'rgb(51, 51, 51)',
    display: 'inline-block',
    fontSize: 18,
    fontWeight: 500,
    margin: '0 auto',
    textAlign: 'center'
  },

  subtextStyle: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 13,
    marginLeft: 5
  },

  reloadArrowStyle: {
    color: '#1a0dab',
    cursor: 'pointer',
    display: 'inline-block',
    marginLeft: 5,
    position: 'relative',
    textDecoration: 'none',
    top: 2,
    transform: 'rotate(110deg)'
  }
};

const Header = React.createClass({
  render: function() {
    const {text, subtext, reload} = this.props;
    const containerStyle = resetCSS(styles.containerStyle);
    const headerStyle = resetCSS(styles.headerStyle);
    const subtextStyle = resetCSS(styles.subtextStyle);
    const reloadArrowStyle = resetCSS(styles.reloadArrowStyle);

    const reloadIcon = (function() {
      if (reload === '') {
        return '';
      } else {
        return <a onClick={reload} style={reloadArrowStyle}>&#x21bb;</a>;
      }
    })();

    return (
      <span style={containerStyle}>
        <h4 style={headerStyle}>
          {text}
        </h4>
        <span style={subtextStyle}>
          {subtext}
        </span>
        {reloadIcon}
      </span>
    );
  }
});

export default Header;
