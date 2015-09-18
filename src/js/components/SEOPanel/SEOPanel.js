import React from 'react';
import PanelContainer from '../PanelContainer';
import SearchResult from './SearchResult';
import Heading from './Heading';

const SEOPanel = React.createClass({
  componentWillMount: function() {
    const {getResult, data, url} = this.props;
    getResult(url);
  },

  render: function() {
    const {data, title, toggle, isOpen} = this.props;
    const {resultJson} = data;

    return (
      <PanelContainer title={title} toggle={toggle} isOpen={isOpen}>
        <Heading text="Google result" subtext="(click to see on Google)" />
        <SearchResult resultJson={resultJson} />
        <Heading text="Social share counts" subtext="" />
        <Heading text="Real-time Keyword Research" subtext="" />
      </PanelContainer>
    );
  }
});

export default SEOPanel;
