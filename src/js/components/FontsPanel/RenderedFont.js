import React from 'react';
import {resetCSS} from '../../modules/utils';

const styles = {
  listItem: {
    listStyle: 'none',
    display: 'block'
  },

  link: {
    color: 'black',
    fontSize: 16,
    textDecoration: 'none'
  }
};

const RenderedFont = React.createClass({
  render: function() {
    const {font} = this.props;
    const listItemStyle = resetCSS(styles.listItem);
    const linkTextStyle = resetCSS(styles.link, {fontFamily: font});

    return (
      <li className="font" style={listItemStyle}>
        <a target="_blank" style={linkTextStyle} href={`https://typekit.com/search?utf8=✓&q=${font}`}>
          {font}
        </a>
      </li>
    );
  }
});

export default RenderedFont;
