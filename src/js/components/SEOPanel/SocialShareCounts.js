import React from 'react';
import LoadingSpinner from '../LoadingSpinner';
import {resetCSS} from '../../modules/utils';

const styles = {
  socialCountsStyle: {
    margin: '10px 10px 20px 10px',
    textAlign: 'center'
  },

  tableStyle: {
    borderCollapse: 'collapse',
    width: '100%'
  },

  thStyle: {
    base: {
      width: '25%',
      textAlign: 'center',
      border: '1px solid',
      color: 'white',
      height: 25,
      fontSize: 16,
      padding: 5
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
    width: '25%',
    textAlign: 'center',
    border: '1px solid #DDD',
    height: 35,
    fontSize: 16
  }
};

const SocialShareCounts = React.createClass({
  loadingSpinnerIfSearching: function(network) {
    if (network.isSearching) {
      return (
        <LoadingSpinner />
      );
    }
    return network.count;
  },

  render: function() {
    const {
      twitter,
      facebook,
      linkedIn,
      pinterest
    } = this.props.shareCounts;

    const socialCountsStyle = resetCSS(styles.socialCountsStyle);
    const tableStyle = resetCSS(styles.tableStyle);
    const tdStyle = resetCSS(styles.tdStyle);
    const twitterHeaderStyle = resetCSS(styles.thStyle.base, styles.thStyle.twitter);
    const facebookHeaderStyle = resetCSS(styles.thStyle.base, styles.thStyle.facebook);
    const linkedInHeaderStyle = resetCSS(styles.thStyle.base, styles.thStyle.linkedIn);
    const pinterestHeaderStyle = resetCSS(styles.thStyle.base, styles.thStyle.pinterest);

    return (
      <div style={socialCountsStyle}>
        <table style={tableStyle}>
          <tr>
            <th style={twitterHeaderStyle}>Twitter</th>
            <th style={facebookHeaderStyle}>Facebook</th>
            <th style={linkedInHeaderStyle}>LinkedIn</th>
            <th style={pinterestHeaderStyle}>Pinterest</th>
          </tr>
          <tr>
            <td style={tdStyle}>{this.loadingSpinnerIfSearching(twitter)}</td>
            <td style={tdStyle}>{this.loadingSpinnerIfSearching(facebook)}</td>
            <td style={tdStyle}>{this.loadingSpinnerIfSearching(linkedIn)}</td>
            <td style={tdStyle}>{this.loadingSpinnerIfSearching(pinterest)}</td>
          </tr>
        </table>
      </div>
    );
  }
});

export default SocialShareCounts;
