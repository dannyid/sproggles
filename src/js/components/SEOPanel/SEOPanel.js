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
    const lastUpdated = moment(resultJson.lastUpdated).fromNow();

    return (
      <PanelContainer title={title} isOpen={isOpen} toggle={toggle}>
        <Heading text="Google result" subtext={`(Last Updated: ${lastUpdated})`} />
        <SearchResult resultJson={resultJson} getResult={getResult} />
        <Heading text="Social Share Counts" subtext="" />
        <SocialShareCounts shareCounts={shareCounts} getSocialCounts={getSocialCounts} />
        <Heading text="Real-time Keyword Research" subtext="" />
        <KeywordInfo keywordInfo={keywordInfo} getKeywordInfo={getKeywordInfo}/>
      </PanelContainer>
    );
  }
});

export default SEOPanel;
