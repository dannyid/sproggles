import React from 'react';
import LoadingSpinner from '../LoadingSpinner';
import {resetCSS, formatNum} from '../../modules/utils';
import moment from 'moment';

const styles = {
  socialCountsStyle: {
    margin: '10px 10px 20px 10px',
    textAlign: 'center'
  },

  tableStyle: {
    borderCollapse: 'collapse',
    display: 'table',
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
    base: {
      border: '1px solid',
      color: 'white',
      display: 'table-cell',
      fontSize: 16,
      height: 25,
      padding: 5,
      textAlign: 'center',
      width: '25%'
    },
    twitter: {
      backgroundColor: '#55acee',
      borderColor: '#55acee'
    },
    facebook: {
      backgroundColor: '#3b5998',
      borderColor: '#3b5998'
    },
    linkedIn: {
      backgroundColor: '#0077b5',
      borderColor: '#0077b5'
    },
    pinterest: {
      backgroundColor: '#cc2127',
      borderColor: '#cc2127'
    }
  },

  tdStyle: {
    border: '1px solid #DDD',
    display: 'table-cell',
    fontSize: 16,
    height: 35,
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '25%'
  }
};

const SocialShareCounts = React.createClass({
  loadingSpinnerIfSearching: function(network) {
    if (network.isSearching) {
      return (
        <LoadingSpinner />
      );
    }
    return formatNum(network.count);
  },

  render: function() {
    const {
      twitter,
      facebook,
      linkedIn,
      pinterest
    } = this.props.shareCounts.networks;

    const socialCountsStyle = resetCSS(styles.socialCountsStyle);
    const tableStyle = resetCSS(styles.tableStyle);
    const theadStyle = resetCSS(styles.theadStyle);
    const tbodyStyle = resetCSS(styles.tbodyStyle);
    const trStyle = resetCSS(styles.trStyle);
    const tdStyle = resetCSS(styles.tdStyle);
    const twitterHeaderStyle = resetCSS(styles.thStyle.base, styles.thStyle.twitter);
    const facebookHeaderStyle = resetCSS(styles.thStyle.base, styles.thStyle.facebook);
    const linkedInHeaderStyle = resetCSS(styles.thStyle.base, styles.thStyle.linkedIn);
    const pinterestHeaderStyle = resetCSS(styles.thStyle.base, styles.thStyle.pinterest);

    return (
      <div style={socialCountsStyle}>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr style={trStyle}>
              <th style={twitterHeaderStyle}>Twitter</th>
              <th style={facebookHeaderStyle}>Facebook</th>
              <th style={linkedInHeaderStyle}>LinkedIn</th>
              <th style={pinterestHeaderStyle}>Pinterest</th>
            </tr>
          </thead>
          <tbody style={tbodyStyle}>
            <tr style={trStyle}>
              <td style={tdStyle}>{this.loadingSpinnerIfSearching(twitter)}</td>
              <td style={tdStyle}>{this.loadingSpinnerIfSearching(facebook)}</td>
              <td style={tdStyle}>{this.loadingSpinnerIfSearching(linkedIn)}</td>
              <td style={tdStyle}>{this.loadingSpinnerIfSearching(pinterest)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

export default SocialShareCounts;
