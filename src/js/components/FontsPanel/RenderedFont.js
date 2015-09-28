import React from 'react';
import {mergeCSS} from '../../modules/utils';

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
  render: function() {
    const {font} = this.props;
    const linkTextStyle = mergeCSS(styles.a, {fontFamily: font});

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
