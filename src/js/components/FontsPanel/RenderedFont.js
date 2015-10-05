import React from 'react';

const styles = {
  li: {
    listStyle: 'none',
    display: 'block'
  },

  a: {
    color: 'black',
    fontSize: 16,
    textDecoration: 'none'
  }
};

const RenderedFont = React.createClass({
  render() {
    const {font} = this.props;
    const fontStyle = {fontFamily: font};
    const linkTextStyle = {...styles.a, ...fontStyle};

    return (
      <li className="font" style={styles.li}>
        <a target="_blank" style={linkTextStyle} href={`https://typekit.com/search?utf8=✓&query=${font}`}>
          {font}
        </a>
      </li>
    );
  }
});

export default RenderedFont;
