import React from 'react';
import {resetCSS} from '../../modules/utils';

const styles = {
  searchResultStyle: {
    fontFamily: 'arial, sans-serif',
    boxShadow: '0 -1px 0 #e5e5e5, 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
    overflow: 'visible',
    width: 522,
    height: 84,
    padding: 5,
    cursor: 'pointer',
    border: '1px solid transparent',
    transitionProperty: 'border',
    transitionDuration: '200ms',
    textAlign: 'left',
    margin: '10px auto',
    display: 'block'
  },

  h3Style: {
    fontSize: 18,
    padding: 0,
    margin: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },

  titleLinkStyle: {
    color: '#1a0dab',
    textDecoration: 'none',
    fontWeight: 'normal'
  },

  urlLinkStyle: {
    color: '#006621',
    fontSize: 14,
    fontStyle: 'normal',
    display: 'block'
  },

  descriptionStyle: {
    color: '#545454',
    lineHeight: 1.4,
    fontSize: 'small',
    display: 'block'
  }
};

const SearchResult = React.createClass({
  render: function() {
    const {color} = this.props;
    const {title, link, description} = this.props.resultJson;
    const searchResultStyle = resetCSS(styles.searchResultStyle);
    const h3Style = resetCSS(styles.h3Style);
    const titleLinkStyle = resetCSS(styles.titleLinkStyle);
    const urlLinkStyle = resetCSS(styles.urlLinkStyle);
    const descriptionStyle = resetCSS(styles.descriptionStyle);

    return (
      <div style={searchResultStyle}>
        <div className="serp">
          <h3 style={h3Style}>
            <a style={titleLinkStyle}>
              {title}
            </a>
          </h3>
          <div>
            <cite style={urlLinkStyle}>
              {link}
            </cite>
            <span style={descriptionStyle}>
              {description}
            </span>
          </div>
        </div>
      </div>
    );
  }
});

export default SearchResult;

