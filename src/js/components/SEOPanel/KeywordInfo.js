import React from 'react';
import moment from 'moment';
import {resetCSS, formatNum} from '../../modules/utils';

const styles = {
  keywordsSectionStyle: {
    margin: 10,
    textAlign: 'center'
  },

  labelStyle: {
    display: 'inline-block',
    margin: 0
  },

  inputStyle: {
    border: '1px solid #AAA',
    borderRadius: 2,
    margin: '0 10px',
    minWidth: 230,
    outline: 'none',
    padding: 5
  },

  buttonStyle: {
    backgroundColor: '#DDD',
    border: '1px solid #AAA',
    borderRadius: 2,
    padding: 5
  },

  tableStyle: {
    borderCollapse: 'collapse',
    display: 'table',
    marginTop: 10,
    width: '100%'
  },

  theadStyle: {
    display: 'table-row-group'
  },

  tbodyStyle: {
    display: 'table-row-group'
  },

  trStyle: {
    display: 'table-row'
  },

  thStyle: {
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

  tdStyle: {
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

    const trStyle = resetCSS(styles.trStyle);
    const tdStyle = resetCSS(styles.tdStyle);
    const lastUpdatedStyle = resetCSS(styles.tdStyle, {fontSize: 13});

    return (
      <tr style={trStyle}>
        <td style={tdStyle}>{keyword}</td>
        <td style={tdStyle}>{rank}</td>
        <td style={tdStyle}>{formattedVolume}</td>
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

    const keywordsSectionStyle = resetCSS(styles.keywordsSectionStyle);
    const labelStyle = resetCSS(styles.labelStyle);
    const inputStyle = resetCSS(styles.inputStyle);
    const buttonStyle = resetCSS(styles.buttonStyle);
    const tableStyle = resetCSS(styles.tableStyle);
    const theadStyle = resetCSS(styles.theadStyle);
    const tbodyStyle = resetCSS(styles.tbodyStyle);
    const thStyle = resetCSS(styles.thStyle);
    const trStyle = resetCSS(styles.trStyle);

    return (
      <div style={keywordsSectionStyle}>
        <form>
          <label htmlFor="keyword" style={labelStyle}>
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
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr style={trStyle}>
              <th style={thStyle}>Keyword</th>
              <th style={thStyle}>Rank</th>
              <th style={thStyle}>Search Volume</th>
              <th style={thStyle}>Last Updated</th>
            </tr>
          </thead>
          <tbody style={tbodyStyle}>
            {keywordRows}
          </tbody>
        </table>
      </div>
    );
  }
});

export default KeywordInfo;
