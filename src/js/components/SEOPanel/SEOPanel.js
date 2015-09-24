import React from 'react';
import PanelContainer from '../PanelContainer';
import Heading from './Heading';
import SearchResult from './SearchResult';
import SocialShareCounts from './SocialShareCounts';
import KeywordInfo from './KeywordInfo';

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

    return (
      <PanelContainer title={title} isOpen={isOpen} toggle={toggle}>
        <Heading text="Google result" subtext="(click to see on Google)" />
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
