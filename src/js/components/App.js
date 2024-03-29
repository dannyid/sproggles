import React from 'react';
import ColorsPanel from './ColorsPanel/ColorsPanel';
import FontsPanel from './FontsPanel/FontsPanel';
import ImagesPanel from './ImagesPanel/ImagesPanel';
import SEOPanel from './SEOPanel/SEOPanel';
import HelpIcon from './HelpIcon';
import Draggable from 'react-draggable';
import getColors from '../modules/getColors';
import getFonts from '../modules/getFonts';
import getSerp from '../modules/getSerp';
import getImages from '../modules/getImages';
import {VERSION_NUMBER} from '../modules/constants';
import * as chromeStorage from '../modules/chromeStorage';
import * as mixpanelEvents from '../modules/mixpanelEvents';
import {
  getTwitterShareCount,
  getFacebookShareCount,
  getLinkedInShareCount,
  getPinterestShareCount
} from '../modules/getSocialCounts';

const styles = {
  app: {
    background: 'white',
    boxShadow: '0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
    fontFamily: 'Helvetica',
    fontSize: 16,
    right: 10,
    padding: 0,
    opacity: 0.98,
    overflow: 'show',
    position: 'fixed',
    top: 10,
    width: 542,
    zIndex: 2147483647 // Maximum z-index value
  }
};

const App = React.createClass({
  closeAllPanels(panels) {
    Object.keys(panels).forEach(panel => {
      panels[panel].isOpen = false;
    });
  },

  togglePanel(panelName) {
    return function(e) {
      e.preventDefault();
      e.stopPropagation();

      mixpanelEvents.tabClicked(panelName);

      // Copy panels object from state to modify it and then set it back as state
      const panels = {...this.state.panels};

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

  setSocialCountState(socialNetwork) {
    return (count) => {
      const panels = {...this.state.panels};
      const {shareCounts} = panels.seoPanel.data;

      shareCounts.lastUpdated = new Date().getTime();
      shareCounts.networks[socialNetwork] = {
        count,
        isSearching: false
      };

      this.setState({panels});
    }.bind(this);
  },

  setShareCountsSearching(isSearching) {
    const panels = {...this.state.panels};
    const {networks} = panels.seoPanel.data.shareCounts;

    Object.keys(networks).forEach(socialNetwork => {
      networks[socialNetwork].isSearching = isSearching;
    });

    this.setState({panels});
  },

  getResult() {
    const {url} = this.state;
    const panels = {...this.state.panels};
    const {googleResult} = panels.seoPanel.data;

    googleResult.isSearching = true;
    this.setState({panels});

    mixpanelEvents.refreshGoogleResult(url);

    return getSerp(url)
    .done(resultData => {
      console.log(resultData);
      const panels = {...this.state.panels};
      const {googleResult} = panels.seoPanel.data;

      if (Object.keys(resultData).length > 0) {
        googleResult.resultJson.title = resultData.title;
        googleResult.resultJson.link = resultData.link;
        googleResult.resultJson.description = resultData.description;
      } else {
        googleResult.resultJson = {};
      }

      googleResult.isSearching = false;
      googleResult.lastUpdated = new Date().getTime();

      this.setState({panels});
    });
  },

  getSocialCounts() {
    const {url} = this.state;

    this.setShareCountsSearching(true);

    mixpanelEvents.refreshSocialCounts(url);

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

  getSocialCountsFail(socialNetwork) {
    return (data) => {
      const panels = {...this.state.panels};
      const {shareCounts} = panels.seoPanel.data;

      shareCounts.lastUpdated = new Date().getTime();
      shareCounts.networks[socialNetwork] = {
        count: 'Please try again.',
        isSearching: false
      };

      this.setState({panels});
    }.bind(this);
  },

  getKeywordInfo(keyword) {
    const {url} = this.state;

    mixpanelEvents.keywordSearched(keyword);

    chrome.runtime.sendMessage({
      type: 'getKeywordInfo',
      keyword,
      url
    }, response => {
      const panels = {...this.state.panels};
      const {keywordInfo} = panels.seoPanel.data;

      keywordInfo.unshift({
        keyword: response.keyword,
        rank: response.rank,
        volume: response.volume || 'low',
        lastUpdated: new Date().getTime()
      });

      // Only keep 10 items in array
      // keywordInfo.splice(10);

      this.setState({panels});
    }.bind(this));
  },

  getInitialState() {
    const now = new Date().getTime();

    return {
      url: window.location.origin + (window.location.pathname || ''),
      panels: {
        seoPanel: {
          title: 'SEO/Social',
          isOpen: true,
          data: {
            googleResult: {
              isSearching: true,
              lastUpdated: now,
              resultJson: {
                title: '',
                link: '',
                description: ''
              }
            },
            shareCounts: {
              lastUpdated: now,
              networks: {
                twitter: {
                  count: 0,
                  isSearching: true
                },
                facebook: {
                  count: 0,
                  isSearching: true
                },
                linkedIn: {
                  count: 0,
                  isSearching: true
                },
                pinterest: {
                  count: 0,
                  isSearching: true
                }
              }
            },
            keywordInfo: []
          }
        },
        colorsPanel: {
          title: 'Colors',
          isOpen: false,
          colors: {}
        },
        fontsPanel: {
          title: 'Fonts',
          isOpen: false,
          fonts: {}
        },
        imagesPanel: {
          title: 'Images',
          isOpen: false,
          images: []
        }
      }
    };
  },

  componentWillMount() {
    const panels = {...this.state.panels};
    const domElements = [...document.querySelectorAll('body > *:not(#sproggles-app-container) *:not(script), body > *:not(#sproggles-app-container) *:not(style)')];

    // Add listener to save state before navigating away from page
    window.onbeforeunload = function() {
      chromeStorage.set({
       [this.state.url]: this.state.panels.seoPanel.data
      });
    }.bind(this);

    panels.colorsPanel.colors = getColors(domElements);
    panels.fontsPanel.fonts = getFonts(domElements);
    panels.imagesPanel.images = getImages(domElements);

    this.setState({panels});

    // If there's a saved SEOPanel data for this site, use it
    // Otherwise generate all the data anew
    chromeStorage
    .get(this.state.url)
    .then(savedState => {
      const panels = {...this.state.panels};
      if (Object.keys(savedState).length > 0) {
        panels.seoPanel.data = savedState[this.state.url]
        this.setState({panels});
      } else {
        this.getResult();
        this.getSocialCounts();
      }
    });
  },

  componentWillUnmount() {
    // Save data to Chrome storage upon app closing
    chromeStorage.set({
      [this.state.url]: this.state.panels.seoPanel.data
    });

    // Remove listener for navigating away from page
    window.onbeforeunload = null;
  },

  componentDidMount() {
    mixpanelEvents.popupOpened(this.state.url);
  },

  render() {
    const {
      url,
      panels: {
        colorsPanel,
        fontsPanel,
        imagesPanel,
        seoPanel
      }
    } = this.state;

    return (
      <Draggable handle='.drag-handle'>
        <div className="sproggles-app" style={styles.app}>
          <SEOPanel
            {...seoPanel}
            toggle={this.togglePanel('seoPanel')}
            getResult={this.getResult}
            getSocialCounts={this.getSocialCounts}
            getKeywordInfo={this.getKeywordInfo}
          />
          <ColorsPanel {...colorsPanel} toggle={this.togglePanel('colorsPanel')} />
          <FontsPanel {...fontsPanel} toggle={this.togglePanel('fontsPanel')} />
          <ImagesPanel {...imagesPanel} toggle={this.togglePanel('imagesPanel')} />
        </div>
      </Draggable>
    );
  }
});

export default App;
