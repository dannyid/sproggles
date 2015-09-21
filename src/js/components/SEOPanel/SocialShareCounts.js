import React from 'react';
import {resetCSS} from '../../modules/utils';

const styles = {
  containerStyle: {
    display: 'block',
    marginTop: 10,
    textAlign: 'center'
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

    return (
      <div className="social-counts">
        <table>
          <tr>
            <th className="twitter-share-header">Twitter</th>
            <th className="facebook-share-header">Facebook</th>
            <th className="linkedin-share-header">LinkedIn</th>
            <th className="pinterest-share-header">Pinterest</th>
          </tr>
          <tr>
            <td className="twitter-share-count">{twitterShareCount}</td>
            <td className="facebook-share-count">{facebookShareCount}</td>
            <td className="linkedin-share-count">{linkedInShareCount}</td>
            <td className="pinterest-share-count">{googlePlusShareCount}</td>
          </tr>
        </table>
      </div>
    );
  }
});

export default SocialShareCounts;
