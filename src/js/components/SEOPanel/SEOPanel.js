import React from 'react';
import PanelContainer from '../PanelContainer';
import Heading from './Heading';
import SearchResult from './SearchResult';
import SocialShareCounts from './SocialShareCounts';
import KeywordInfo from './KeywordInfo';

const SEOPanel = React.createClass({
  componentWillMount: function() {
    const {getResult, getSocialCounts, getKeywordInfo} = this.props;
    getResult();
    getSocialCounts();
  },

  render: function() {
    const {data, title, toggle, isOpen, getKeywordInfo} = this.props;
    const {resultJson, shareCounts, keywordInfo} = data;

    return (
      <PanelContainer title={title} toggle={toggle} isOpen={isOpen}>
        <Heading text="Google result" subtext="(click to see on Google)" />
        <SearchResult resultJson={resultJson} />
        <Heading text="Social Share Counts" subtext="" />
        <SocialShareCounts shareCounts={shareCounts} />
        <Heading text="Real-time Keyword Research" subtext="" />
        <KeywordInfo keywordInfo={keywordInfo} getKeywordInfo={getKeywordInfo}/>
      </PanelContainer>
    );
  }
});

export default SEOPanel;
