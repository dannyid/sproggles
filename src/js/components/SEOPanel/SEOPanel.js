import React from 'react';
import PanelContainer from '../PanelContainer';
import SearchResult from './SearchResult';

const SEOPanel = React.createClass({
  componentWillUpdate: function(nextProps, nextState) {
    const {isOpen} = nextProps;

    if (isOpen) {
      console.log(true);
      // do Google search
    } else {
      console.log(false);
    }
  },

  render: function() {
    const {data, title, toggle, isOpen} = this.props;
    // const {searchResultJson} = data;
    const searchResultJson = {title: 'Google', link: 'www.google.com/', description: "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking ..."};

    return (
      <PanelContainer title={title} toggle={toggle} isOpen={isOpen}>
        <SearchResult resultJson={searchResultJson} />
      </PanelContainer>
    );
  }
});

export default SEOPanel;
