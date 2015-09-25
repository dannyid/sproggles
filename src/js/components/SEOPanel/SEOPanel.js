import React from 'react';
import PanelContainer from '../PanelContainer';
import Heading from './Heading';
import SearchResult from './SearchResult';
import SocialShareCounts from './SocialShareCounts';
import KeywordInfo from './KeywordInfo';
import moment from 'moment';


const SEOPanel = React.createClass({
  render: function() {
    const {
      data,
      title,
      isOpen,
      toggle,
      getResult,
      getSocialCounts,
      getKeywordInfo
    } = this.props;

    const {resultJson, shareCounts, keywordInfo} = data;
    const googleResultlastUpdated = moment(resultJson.lastUpdated).fromNow();
    const socialCountslastUpdated = moment(shareCounts.lastUpdated).fromNow();


    return (
      <PanelContainer title={title} isOpen={isOpen} toggle={toggle}>
        <Heading
          text='Google Result'
          subtext={`(Last Updated: ${googleResultlastUpdated})`}
          reload={getResult}
        />
        <SearchResult
          resultJson={resultJson}
          getResult={getResult}
        />
        <Heading
          text='Social Share Counts'
          subtext={`(Last Updated: ${socialCountslastUpdated})`}
          reload={getSocialCounts}
        />
        <SocialShareCounts
          shareCounts={shareCounts}
          getSocialCounts={getSocialCounts}
        />
        <Heading
          text='Real-time Keyword Research'
          subtext=''
          reload=''
        />
        <KeywordInfo
          keywordInfo={keywordInfo}
          getKeywordInfo={getKeywordInfo}
        />
      </PanelContainer>
    );
  }
});

export default SEOPanel;
