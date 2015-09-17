import React from 'react';
import $ from 'jquery';
import ColorsPanel from './ColorsPanel.js';
import FontsPanel from './FontsPanel.js';
import ImagesPanel from './ImagesPanel.js';
import Draggable from 'react-draggable';
import {completeImageUrl, resetCSS} from '../modules/utils';
import reduceColorsAndFonts from '../modules/reduceColorsAndFonts';

const styles = {
  appStyle: {
    base: {
      background: `white`,
      // border: `1px solid #CCC`,
      boxShadow: /*0 -1px 0 #e5e5e5,*/ `0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)`,
      fontFamily: `Helvetica`,
      fontSize: 16,
      left: 10,
      padding: 0,
      opacity: 0.98,
      overflow: `hidden`,
      position: `fixed`,
      top: 10,
      width: 250,
      zIndex: `9999999999999999`
    }
  }
};

const App = React.createClass({
  componentWillMount: function() {
    return;
  },

  getInitialState: () => {
    // Get fonts and colors on page load
    const elements = $.makeArray($('body *').not('script, link, style'));
    const images = $.makeArray($('body img'));

    // Whittle DOM nodes down into list of colors and fonts
    let reduced = reduceColorsAndFonts(elements);

    // Derive all the images and add them to the reduced result
    images.forEach((i) => {
      const imgSrc = $(i).attr('src') || '';
      const imageUrl = completeImageUrl(imgSrc);

      // Dedupe images and only add one of each
      if (imageUrl && $.inArray(imageUrl, reduced.results.allImages) === -1) {
        reduced.results.allImages.push(imageUrl);
      }
    });

    console.log(reduced.results);

    return {
      panels: {
        colorsPanel: {
          title: 'Colors',
          isOpen: true,
          data: reduced.results.allColors
        },
        fontsPanel: {
          title: 'Fonts',
          isOpen: false,
          data: reduced.results.allFonts
        },
        imagesPanel: {
          title: 'Images',
          isOpen: false,
          data: reduced.results.allImages
        },
        seoPanel: {
          title: 'SEO',
          isOpen: false,
          data: reduced.results.allColors
        }
      }
    };
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

      // If panel is already open, close it, overwise switch panels
      if (panels[panelName].isOpen) {
        panels[panelName].isOpen = false;
      } else {
        this.closeAllPanels(panels);
        panels[panelName].isOpen = true;
      }

      // Set state of all panels
      this.setState({panels});
    }.bind(this);
  },

  render: function() {
    const {colorsPanel, fontsPanel, imagesPanel, seoPanel} = this.state.panels;
    const appStyle = resetCSS(styles.appStyle.base);

    return (
      <Draggable handle='.drag-handle'>
        <div className="sproggles-app" style={appStyle}>
          <ColorsPanel {...colorsPanel} toggle={this.togglePanel('colorsPanel')} />
          <FontsPanel {...fontsPanel} toggle={this.togglePanel('fontsPanel')} />
          <ImagesPanel {...imagesPanel} toggle={this.togglePanel('imagesPanel')} />
          <ColorsPanel {...seoPanel} toggle={this.togglePanel('seoPanel')} />
        </div>
      </Draggable>
    );
  }
});

export default App;
