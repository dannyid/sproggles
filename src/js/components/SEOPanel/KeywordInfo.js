import React from 'react';
import {resetCSS} from '../../modules/utils';

const styles = {
  containerStyle: {
    display: 'block',
    marginTop: 10,
    textAlign: 'center'
  }
};

const KeywordRow = React.createClass({
  render: function() {
    const {keyword, rank, volume, lastSearched} = this.props;
    return (
      <tr>
        <td>{keyword}</td>
        <td>{rank}</td>
        <td>{volume}</td>
        <td>{lastSearched}</td>
      </tr>
    );
  }
});

const KeywordInfo = React.createClass({
  render: function() {
    const keywordRows = this.props.keywordResults.map(result => <KeywordRow {...result} />);

    return (
      <div className="derived-keywords">
        <form>
          <label for="keyword">Search keyword:
            <input name="keyword" type="text" />
          </label>
          <button type="submit">Search</button>
        </form>
        <table>
          <tr>
            <th className="keyword-name-header">Keyword</th>
            <th className="keywork-rank-header">Rank</th>
            <th className="keyword-volume-header">Search Volume</th>
            <th>Last Searched</th>
          </tr>
          {keywordRows}
        </table>
      </div>
    );
  }
});

export default KeywordInfo;
