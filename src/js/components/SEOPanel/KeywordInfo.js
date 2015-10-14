import React from 'react';
import moment from 'moment';
import {formatNum} from '../../modules/utils';
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
    base: {
      border: '1px solid #AAA',
      borderRadius: 2,
      margin: '0 10px',
      minWidth: 230,
      outline: 'none',
      padding: 5
    },

    invalid: {
      boxShadow: '0 0 3px red'
    }
  },

  button: {
    base: {
      backgroundColor: '#DDD',
      border: '1px solid #AAA',
      borderRadius: 2,
      cursor: 'pointer',
      padding: 5
    },

    invalid: {
      border: '1px solid #DDD',
      color: '#BBB',
      cursor: 'auto'
    }
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
  render() {
    const {keyword, rank, volume, lastUpdated} = this.props;
    const formattedVolume = formatNum(volume);
    const relativelastUpdated = moment(lastUpdated).fromNow();
    const lastUpdatedStyle = {...styles.td, ...{fontSize: 13}};

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
  getInitialState() {
    return {
      inputtedKeywords: '',
      invalid: false
    };
  },

  componentDidMount() {
    React.findDOMNode(this.refs.keywordInput).onkeydown = function(e) {
      e.stopPropagation();
    };
  },

  handleClick(e) {
    const {inputtedKeywords} = this.state;
    const {getKeywordInfo} = this.props;

    e.preventDefault();

    if (inputtedKeywords.trim().length > 0) {
      // This allows you to paste in comma separated keywords;
      inputtedKeywords.split(',').forEach(getKeywordInfo);
      this.setState({
        inputtedKeywords: '',
        invalid: false
      });
    }
  },

  handleChange(e) {
    if (e.target.value.length === 0 || e.target.value.trim().length > 0) {
      this.setState({
        inputtedKeywords: e.target.value,
        invalid: false
      });
    } else if (e.target.value.trim().length === 0) {
      this.setState({
        inputtedKeywords: e.target.value,
        invalid: true
      });
    }
  },

  renderKeywordRows() {
    return this.props.keywordInfo.map((result, index) => <KeywordRow key={index} {...result} />);
  },

  render() {
    const validationStyle = this.state.invalid ? styles.input.invalid : null;
    const buttonValidationStyle = this.state.invalid ? styles.button.invalid : null;
    const inputStyle = {...styles.input.base, ...validationStyle};
    const buttonStyle = {...styles.button.base, ...buttonValidationStyle};

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
              style={inputStyle}
              onChange={this.handleChange}
              value={this.state.inputtedKeywords}
            />
          </label>
          <button type="submit" style={buttonStyle} onClick={this.handleClick}>
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
            {this.renderKeywordRows()}
          </tbody>
        </table>
      </div>
    );
  }
});

export default KeywordInfo;
