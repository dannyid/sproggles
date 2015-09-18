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
    color: 'rgba(0, 0, 0, 0.498039)',
    fontSize: 14,
    marginLeft: 5
  }
};

const Header = React.createClass({
  render: function() {
    const {text, subtext} = this.props;
    const containerStyle = resetCSS(styles.containerStyle);
    const headerStyle = resetCSS(styles.headerStyle);
    const subtextStyle = resetCSS(styles.subtextStyle);

    return (
      <span style={containerStyle}>
        <h4 style={headerStyle}>
          {text}
        </h4>
        <span style={subtextStyle}>
          {subtext}
        </span>
      </span>
    );
  }
});

export default Header;
