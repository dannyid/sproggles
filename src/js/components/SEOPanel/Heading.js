import React from 'react';

const styles = {
  container: {
    display: 'block',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center'
  },

  header: {
    color: 'rgb(51, 51, 51)',
    display: 'inline-block',
    fontSize: 18,
    fontWeight: 500,
    margin: '0 auto',
    textAlign: 'center'
  },

  subtext: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 13,
    fontStyle: 'italic',
    marginLeft: 5
  },

  reloadArrow: {
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

    const reloadIcon = (function() {
      if (reload === '') {
        return '';
      } else {
        return <a onClick={reload} style={styles.reloadArrow}>&#x21bb;</a>;
      }
    })();

    return (
      <span style={styles.container}>
        <h4 style={styles.header}>
          {text}
        </h4>
        <span style={styles.subtext}>
          {subtext}
        </span>
        {reloadIcon}
      </span>
    );
  }
});

export default Header;
