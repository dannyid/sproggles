import React from 'react';
import {resetCSS} from '../../modules/utils';

const styles = {
  socialCountsStyle: {
    margin: '10px 10px 20px 10px',
    textAlign: 'center'
  },

  socialCountsTableStyle: {
    width: '100%'
  },

  socialCountsThStyle: {
    base: {
      width: '25%',
      textAlign: 'center',
      border: '1px solid',
      color: 'white',
      height: '25px',
      fontSize: '16px'
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

  socialCountsTdStyle: {
    width: '25%',
    textAlign: 'center',
    border: '1px solid #DDD',
    height: '35px',
    fontSize: '18px'
  }
};

const SocialShareCounts = React.createClass({
  render: function() {
    const {
      twitter,
      facebook,
      linkedIn,
      pinterest
    } = this.props.shareCounts;

    const socialCountsStyle = resetCSS(styles.socialCountsStyle);
    const socialCountsTableStyle = resetCSS(styles.socialCountsTableStyle);
    const socialCountsTdStyle = resetCSS(styles.socialCountsTdStyle);
    const twitterHeaderStyle = resetCSS(styles.socialCountsThStyle.base, styles.socialCountsThStyle.twitter);
    const facebookHeaderStyle = resetCSS(styles.socialCountsThStyle.base, styles.socialCountsThStyle.facebook);
    const linkedInHeaderStyle = resetCSS(styles.socialCountsThStyle.base, styles.socialCountsThStyle.linkedIn);
    const pinterestHeaderStyle = resetCSS(styles.socialCountsThStyle.base, styles.socialCountsThStyle.pinterest);

    return (
      <div style={socialCountsStyle}>
        <table style={socialCountsTableStyle}>
          <tr>
            <th style={twitterHeaderStyle}>Twitter</th>
            <th style={facebookHeaderStyle}>Facebook</th>
            <th style={linkedInHeaderStyle}>LinkedIn</th>
            <th style={pinterestHeaderStyle}>Pinterest</th>
          </tr>
          <tr>
            <td style={socialCountsTdStyle}>{twitter.count}</td>
            <td style={socialCountsTdStyle}>{facebook.count}</td>
            <td style={socialCountsTdStyle}>{linkedIn.count}</td>
            <td style={socialCountsTdStyle}>{pinterest.count}</td>
          </tr>
        </table>
      </div>
    );
  }
});

export default SocialShareCounts;
