import React from 'react';
import moment from 'moment';
import {mergeCSS, formatNum} from '../../modules/utils';
import * as mixpanelEvents from '../../modules/mixpanelEvents';

const styles = {
  keywordsSection: {
    display: 'block',
    margin: 10,
    textAlign: 'center'
  },

  label: {
    display: 'inline-block',
    margin: 0
  },

  input: {
    border: '1px solid #AAA',
    borderRadius: 2,
    margin: '0 10px',
    minWidth: 230,
    outline: 'none',
    padding: 5
  },

  button: {
    backgroundColor: '#DDD',
    border: '1px solid #AAA',
    borderRadius: 2,
    padding: 5
  },

  table: {
    borderCollapse: 'collapse',
    display: 'table',
    marginTop: 10,
    width: '100%'
  },

  thead: {
    display: 'table-row-group'
  },

  tbody: {
    display: 'table-row-group'
  },

  tr: {
    display: 'table-row'
  },

  th: {
    backgroundColor: '#DDD',
    border: '1px solid #DDD',
    color: 'black',
    display: 'table-cell',
    height: 25,
    fontSize: 16,
    width: '25%',
    textAlign: 'center',
    padding: 5
  },

  td: {
    border: '1px solid #DDD',
    display: 'table-cell',
    height: 35,
    fontSize: 14,
    padding: 5,
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '25%'
  }
};

const KeywordRow = React.createClass({
  render: function() {
    const {keyword, rank, volume, lastUpdated} = this.props;
    const formattedVolume = formatNum(volume);
    const relativelastUpdated = moment(lastUpdated).fromNow();
    const lastUpdatedStyle = mergeCSS(styles.td, {fontSize: 13});

    return (
      <tr style={styles.tr}>
        <td style={styles.td}>{keyword}</td>
        <td style={styles.td}>{rank}</td>
        <td style={styles.td}>{formattedVolume}</td>
        <td style={lastUpdatedStyle}>{relativelastUpdated}</td>
      </tr>
    );
  }
});

const KeywordInfo = React.createClass({
  getInitialState: function() {
    return {inputtedKeywords: ''};
  },

  componentDidMount: function() {
    React.findDOMNode(this.refs.keywordInput).onkeydown = function(e) {
      e.stopPropagation();
    };
  },

  handleClick: function(e) {
    const {inputtedKeywords} = this.state;
    const {getKeywordInfo} = this.props;

    e.preventDefault();
    mixpanelEvents.keywordSearched(inputtedKeywords);

    // This allows you to paste in comma separated keywords;
    inputtedKeywords.split(',').forEach(getKeywordInfo);
    this.setState({inputtedKeywords: ''});
  },

  handleChange: function(e) {
    this.setState({inputtedKeywords: e.target.value});
  },

  render: function() {
    const {getKeywordInfo, keywordInfo} = this.props;
    const keywordRows = keywordInfo.map(result => <KeywordRow {...result} />);

    return (
      <div style={styles.keywordsSection}>
        <form>
          <label htmlFor="keyword" style={styles.label}>
            Search keyword:
            <input
              ref="keywordInput"
              name="keyword"
              type="text"
              placeholder="comma, separated, keywords"
              style={styles.input}
              onChange={this.handleChange}
              value={this.state.inputtedKeywords}
            />
          </label>
          <button type="submit" style={styles.button} onClick={this.handleClick}>
            Search
          </button>
        </form>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr style={styles.tr}>
              <th style={styles.th}>Keyword</th>
              <th style={styles.th}>Rank</th>
              <th style={styles.th}>Search Volume</th>
              <th style={styles.th}>Last Updated</th>
            </tr>
          </thead>
          <tbody style={styles.tbody}>
            {keywordRows}
          </tbody>
        </table>
      </div>
    );
  }
});

export default KeywordInfo;
