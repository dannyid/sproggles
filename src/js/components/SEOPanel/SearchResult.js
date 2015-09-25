import React from 'react';
import {mergeCSS} from '../../modules/utils';

const styles = {
  searchResultStyle: {
    border: '1px solid transparent',
    boxShadow: '0 -1px 0 #e5e5e5, 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
    cursor: 'pointer',
    display: 'block',
    fontFamily: 'arial, sans-serif',
    height: 84,
    margin: '10px 10px 20px 10px',
    overflow: 'visible',
    padding: 5,
    textAlign: 'left',
    transitionDuration: '200ms',
    transitionProperty: 'border',
    width: 522
  },

  h3Style: {
    fontWeight: 500,
    lineHeight: 1.1,
    margin: 0,
    overflow: 'hidden',
    padding: 0,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },

  titleLinkStyle: {
    color: '#1a0dab',
    fontSize: 18,
    textDecoration: 'none'
  },

  urlLinkStyle: {
    color: '#006621',
    fontSize: 14,
    fontStyle: 'normal',
    display: 'block'
  },

  descriptionStyle: {
    color: '#545454',
    fontSize: 'small',
    display: 'block',
    lineHeight: 1.4

  }
};

const SearchResult = React.createClass({
  render: function() {
    const {color} = this.props;
    const {title, link, description} = this.props.resultJson;
    const searchResultStyle = mergeCSS(styles.searchResultStyle);
    const h3Style = mergeCSS(styles.h3Style);
    const titleLinkStyle = mergeCSS(styles.titleLinkStyle);
    const urlLinkStyle = mergeCSS(styles.urlLinkStyle);
    const descriptionStyle = mergeCSS(styles.descriptionStyle);

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

