import React from 'react';
import {mergeCSS} from '../../modules/utils';

const styles = {
  searchResult: {
    border: '1px solid transparent',
    boxShadow: '0 -1px 0 #e5e5e5, 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
    cursor: 'pointer',
    display: 'block',
    fontFamily: 'arial, sans-serif',
    height: 84,
    margin: '10px 10px 10px 10px',
    overflow: 'visible',
    padding: 5,
    textAlign: 'left',
    transitionDuration: '200ms',
    transitionProperty: 'border',
    width: 522
  },

  h3: {
    fontWeight: 500,
    lineHeight: 1.1,
    margin: 0,
    overflow: 'hidden',
    padding: 0,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },

  titleLink: {
    color: '#1a0dab',
    fontSize: 18,
    textDecoration: 'none'
  },

  urlLink: {
    color: '#006621',
    fontSize: 14,
    fontStyle: 'normal',
    display: 'block'
  },

  description: {
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

    return (
      <div style={styles.searchResult}>
        <div className="serp">
          <h3 style={styles.h3}>
            <a style={styles.titleLink}>
              {title}
            </a>
          </h3>
          <div>
            <cite style={styles.urlLink}>
              {link}
            </cite>
            <span style={styles.description}>
              {description}
            </span>
          </div>
        </div>
      </div>
    );
  }
});

export default SearchResult;

