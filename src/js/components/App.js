import React from 'react';
import $ from 'jquery';
import ColorsPanel from './ColorsPanel/ColorsPanel';
import FontsPanel from './FontsPanel/FontsPanel';
import ImagesPanel from './ImagesPanel/ImagesPanel';
import SEOPanel from './SEOPanel/SEOPanel';
import Draggable from 'react-draggable';
import {completeImageUrl, mergeCSS} from '../modules/utils';
import reduceColorsAndFonts from '../modules/reduceColorsAndFonts';
import getSerp from '../modules/getSerp';
import * as chromeStorage from '../modules/chromeStorage';
import {
  getTwitterShareCount,
  getFacebookShareCount,
  getLinkedInShareCount,
  getPinterestShareCount
} from '../modules/getSocialCounts';

const styles = {
  appStyle: {
    base: {
      background: `white`,
      boxShadow: `0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)`,
      fontFamily: `Helvetica`,
      fontSize: 16,
      left: 10,
      padding: 0,
      opacity: 0.98,
      overflow: `hidden`,
      position: `fixed`,
      top: 10,
      width: 542,
      zIndex: 2147483647 // Maximum z-index value
    }
  }
};

const App = React.createClass({
  getInitialState: () => {
    return {
      url: window.location.origin + (window.location.pathname || ''),
      panels: {
        colorsPanel: {
          title: 'Colors',
          isOpen: false,
          data: []
        },
        fontsPanel: {
          title: 'Fonts',
          isOpen: false,
          data: []
        },
        imagesPanel: {
          title: 'Images',
          isOpen: false,
          data: []
        },
        seoPanel: {
          title: 'SEO/Social',
          isOpen: true,
          data: {
            resultJson: {
              title: 'The Title',
              link: 'The Link',
              description: 'The Description',
              lastUpdated: new Date().getTime()
            },
            shareCounts: {
              lastUpdated: new Date().getTime(),
              networks: {
                twitter: {
                  count: 0,
                  isSearching: false
                },
                facebook: {
                  count: 0,
                  isSearching: false
                },
                linkedIn: {
                  count: 0,
                  isSearching: false
                },
                pinterest: {
                  count: 0,
                  isSearching: false
                }
              }
            },
            keywordInfo: []
          }
        }
      }
    };
  },

  componentWillMount: function() {
    // Save state before navigating away from page
    window.onbeforeunload = function() {
      let data = {};
      data[this.state.url] = this.state;
      chromeStorage.set(data);
    }.bind(this);

    // If there's a saved state for this site, use it
    // Otherwise generate all the data anew
    chromeStorage
    .get(this.state.url)
    .then(savedState => {
      if (Object.keys(savedState).length > 0) {
        this.setState(savedState[this.state.url]);
      } else {
        // Get fonts and colors on page load
        const elements = $.makeArray($('body *').not('script, link, style'));

        // Whittle DOM nodes down into list of colors and fonts
        const reduced = reduceColorsAndFonts(elements);

        // Derive all the images and add them to the reduced result
        const images = $.makeArray($('body img'));

        images.forEach((i) => {
          const imgSrc = $(i).attr('src') || '';
          const imageUrl = completeImageUrl(imgSrc);

          // Dedupe images and only add one of each
          if (imageUrl && $.inArray(imageUrl, reduced.results.allImages) === -1) {
            reduced.results.allImages.push(imageUrl);
          }
        });

        let panels = Object.assign({}, this.state.panels);

        panels.colorsPanel.data = reduced.results.allColors;
        panels.fontsPanel.data = reduced.results.allFonts;
        panels.imagesPanel.data = reduced.results.allImages;

        this.setState({panels});
        this.getResult();
        this.getSocialCounts();
      }
    }.bind(this));
  },

  componentWillUnmount: function() {
    // Save data to Chrome storage upon app closing
    let data = {};
    data[this.state.url] = this.state;
    chromeStorage.set(data);

    // Remove listener for navigating away from page
    window.onbeforeunload = null;
  },

  closeAllPanels: function(panels) {
    Object.keys(panels).forEach(panel => {
      panels[panel].isOpen = false;
    });
  },

  togglePanel: function(panelName) {
    return function(e) {
      e.preventDefault();
      e.stopPropagation();

      // Copy panels object from state to modify it and then set it back as state
      let panels = Object.assign({}, this.state.panels);

      // If panel is already open, close it, otherwise switch panels
      if (panels[panelName].isOpen) {
        panels[panelName].isOpen = false;
      } else {
        this.closeAllPanels(panels);
        panels[panelName].isOpen = true;
      }

      this.setState({panels});
    }.bind(this);
  },

  setSocialCountState: function(socialNetwork) {
    return (count) => {
      const panels = Object.assign({}, this.state.panels);
      const {shareCounts} = panels.seoPanel.data;

      shareCounts.lastUpdated = new Date().getTime();
      shareCounts.networks[socialNetwork] = {
        count,
        isSearching: false
      };

      this.setState({panels});
    }.bind(this);
  },

  setShareCountsSearching: function(boolean) {
    const panels = Object.assign({}, this.state.panels);
    const {networks} = panels.seoPanel.data.shareCounts;

    Object.keys(networks).forEach(socialNetwork => {
      networks[socialNetwork].isSearching = boolean;
    });

    this.setState({panels});
  },

  getResult: function() {
    const {url} = this.state;
    return getSerp(url)
    .done(resultData => {
      const panels = Object.assign({}, this.state.panels);
      const {resultJson} = panels.seoPanel.data;

      resultJson.title = resultData.title;
      resultJson.link = resultData.link;
      resultJson.description = resultData.description;
      resultJson.lastUpdated = new Date().getTime();

      this.setState({panels});
    }.bind(this));
  },

  getSocialCounts: function() {
    const {url} = this.state;

    this.setShareCountsSearching(true);

    getTwitterShareCount(url)
      .done(this.setSocialCountState('twitter'))
      .fail(this.getSocialCountsFail('twitter'));

    getFacebookShareCount(url)
      .done(this.setSocialCountState('facebook'))
      .fail(this.getSocialCountsFail('facebook'));

    getLinkedInShareCount(url)
      .done(this.setSocialCountState('linkedIn'))
      .fail(this.getSocialCountsFail('linkedIn'));

    getPinterestShareCount(url)
      .done(this.setSocialCountState('pinterest'))
      .fail(this.getSocialCountsFail('pinterest'));

    // Timeout after 5 seconds
    setTimeout(() => {
      this.setShareCountsSearching(false);
    }.bind(this), 5000);
  },

  getSocialCountsFail: function(socialNetwork) {
    return (data) => {
      console.log(socialNetwork, 'fail');
      let panels = Object.assign({}, this.state.panels);

      panels.seoPanel.data.shareCounts.lastUpdated = new Date().getTime();
      panels.seoPanel.data.shareCounts.networks[socialNetwork] = {
        count: 'Please try again.',
        isSearching: false
      };

      this.setState({panels});
    }.bind(this);
  },

  getKeywordInfo: function(keyword) {
    const {url} = this.state;

    chrome.runtime.sendMessage({
      type: 'getKeywordInfo',
      keyword,
      url
    }, response => {
      const panels = Object.assign({}, this.state.panels);
      let {keywordInfo} = panels.seoPanel.data;

      keywordInfo.unshift({
        keyword: response.keyword,
        rank: response.rank,
        volume: response.volume || 'low',
        lastUpdated: new Date().getTime()
      });

      // Only keep 10 items in array
      keywordInfo.splice();

      this.setState({panels});
    }.bind(this));
  },

  render: function() {
    const {url, panels} = this.state;
    const {colorsPanel, fontsPanel, imagesPanel, seoPanel} = panels;
    const appStyle = mergeCSS(styles.appStyle.base);

    return (
      <Draggable handle='.drag-handle'>
        <div className="sproggles-app" style={appStyle}>
          <ColorsPanel {...colorsPanel} toggle={this.togglePanel('colorsPanel')} />
          <FontsPanel {...fontsPanel} toggle={this.togglePanel('fontsPanel')} />
          <ImagesPanel {...imagesPanel} toggle={this.togglePanel('imagesPanel')} />
          <SEOPanel
            {...seoPanel}
            toggle={this.togglePanel('seoPanel')}
            getResult={this.getResult}
            getSocialCounts={this.getSocialCounts}
            getKeywordInfo={this.getKeywordInfo}
          />
        </div>
      </Draggable>
    );
  }
});

export default App;
