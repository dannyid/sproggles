import React from 'react';
import PanelContainer from '../PanelContainer';
import SearchResult from './SearchResult';

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
        <SearchResult resultJson={resultJson} />
      </PanelContainer>
    );
  }
});

export default SEOPanel;
