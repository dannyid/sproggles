import React from 'react';
import PanelContainer from '../PanelContainer';
import SearchResult from './SearchResult';

const SEOPanel = React.createClass({
  componentWillMount: function() {
    const {getResult} = this.props;
    getResult('http://www.google.com');
  },

  render: function() {
    const {data, title, toggle, isOpen} = this.props;
    const {resultJson} = data;
    // const searchResultJson = {title: 'Google', link: 'www.google.com/', description: "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking ..."};

    return (
      <PanelContainer title={title} toggle={toggle} isOpen={isOpen}>
        <SearchResult resultJson={resultJson} />
      </PanelContainer>
    );
  }
});

export default SEOPanel;
