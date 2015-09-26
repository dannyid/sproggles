import React from 'react';
import {mergeCSS} from '../../modules/utils';
import LoadingSpinner from '../LoadingSpinner';

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

  centerLoader: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center'
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
  placeholderOrRealResult: function() {
    const {color, googleResult} = this.props;
    const {lastUpdated, isSearching, resultJson} = googleResult;
    const {title, link, description} = resultJson;

    if (isSearching) {
      return (
        <div style={styles.centerLoader}>
          <LoadingSpinner />
        </div>
      );
    }

    return (
      <div>
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
    );
  },

  render: function() {
    return (
      <div style={styles.searchResult}>
        {this.placeholderOrRealResult()}
      </div>
    );
  }
});

export default SearchResult;

