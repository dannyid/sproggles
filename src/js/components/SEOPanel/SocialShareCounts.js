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
    googlePlus: {
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
      twitterShareCount,
      facebookShareCount,
      linkedInShareCount,
      googlePlusShareCount
    } = this.props.shareCounts;

    const socialCountsStyle = resetCSS(styles.socialCountsStyle);
    const socialCountsTableStyle = resetCSS(styles.socialCountsTableStyle);
    const socialCountsTdStyle = resetCSS(styles.socialCountsTdStyle);
    const twitterHeaderStyle = resetCSS(styles.socialCountsThStyle.base, styles.socialCountsThStyle.twitter);
    const facebookHeaderStyle = resetCSS(styles.socialCountsThStyle.base, styles.socialCountsThStyle.facebook);
    const linkedInHeaderStyle = resetCSS(styles.socialCountsThStyle.base, styles.socialCountsThStyle.linkedIn);
    const googlePlusHeaderStyle = resetCSS(styles.socialCountsThStyle.base, styles.socialCountsThStyle.googlePlus);

    return (
      <div style={socialCountsStyle}>
        <table style={socialCountsTableStyle}>
          <tr>
            <th style={twitterHeaderStyle}>Twitter</th>
            <th style={facebookHeaderStyle}>Facebook</th>
            <th style={linkedInHeaderStyle}>LinkedIn</th>
            <th style={googlePlusHeaderStyle}>Pinterest</th>
          </tr>
          <tr>
            <td style={socialCountsTdStyle}>{twitterShareCount}</td>
            <td style={socialCountsTdStyle}>{facebookShareCount}</td>
            <td style={socialCountsTdStyle}>{linkedInShareCount}</td>
            <td style={socialCountsTdStyle}>{googlePlusShareCount}</td>
          </tr>
        </table>
      </div>
    );
  }
});

export default SocialShareCounts;
