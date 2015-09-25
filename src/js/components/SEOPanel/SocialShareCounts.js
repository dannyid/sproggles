import React from 'react';
import LoadingSpinner from '../LoadingSpinner';
import {mergeCSS, formatNum} from '../../modules/utils';
import moment from 'moment';

const styles = {
  socialCounts: {
    display: 'block',
    margin: '10px 10px 10px 10px',
    textAlign: 'center'
  },

  table: {
    borderCollapse: 'collapse',
    display: 'table',
    width: '100%'
  },

  thead: {
    display: 'table-row-group'
  },

  tbodyStyle: {
    display: 'table-row-group'
  },

  tr: {
    display: 'table-row'
  },

  th: {
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

  td: {
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

    const twitterHeaderStyle = mergeCSS(styles.th.base, styles.th.twitter);
    const facebookHeaderStyle = mergeCSS(styles.th.base, styles.th.facebook);
    const linkedInHeaderStyle = mergeCSS(styles.th.base, styles.th.linkedIn);
    const pinterestHeaderStyle = mergeCSS(styles.th.base, styles.th.pinterest);

    return (
      <div style={styles.socialCounts}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr style={styles.tr}>
              <th style={twitterHeaderStyle}>Twitter</th>
              <th style={facebookHeaderStyle}>Facebook</th>
              <th style={linkedInHeaderStyle}>LinkedIn</th>
              <th style={pinterestHeaderStyle}>Pinterest</th>
            </tr>
          </thead>
          <tbody style={styles.tbodyStyle}>
            <tr style={styles.tr}>
              <td style={styles.td}>{this.loadingSpinnerIfSearching(twitter)}</td>
              <td style={styles.td}>{this.loadingSpinnerIfSearching(facebook)}</td>
              <td style={styles.td}>{this.loadingSpinnerIfSearching(linkedIn)}</td>
              <td style={styles.td}>{this.loadingSpinnerIfSearching(pinterest)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

export default SocialShareCounts;
