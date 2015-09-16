import React from 'react';
import $ from 'jquery';
import ColorsPanel from './ColorsPanel.js';
import FontsPanel from './FontsPanel.js';
import ImagesPanel from './ImagesPanel.js';
import Draggable from 'react-draggable';
import {completeImageUrl} from '../modules/utils';
import reduceColorsAndFonts from '../modules/reduceColorsAndFonts';
import {preNormalize} from '../modules/utils';


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
      results: reduced.results,
      panels: {
        colors: {
          title: 'Colors',
          isOpen: true
        },
        fonts: {
          title: 'Fonts',
          isOpen: false
        },
        images: {
          title: 'images',
          isOpen: false
        },
        seo: {
          title: 'SEO',
          isOpen: false
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

  getDefaultProps: function() {
    return {
      styles: {
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
      }
    };
  },

  render: function() {
    return (
      <Draggable>
        <div className="sproggles-app" style={preNormalize(this.props.styles.appStyle.base)}>
          <ColorsPanel
            title="Colors"
            data={this.state.results.allColors}
            isOpen={this.state.panels.colors.isOpen}
            toggle={this.togglePanel('colors')}
          />
          <FontsPanel
            title="Fonts"
            data={this.state.results.allFonts}
            isOpen={this.state.panels.fonts.isOpen}
            toggle={this.togglePanel('fonts')}
          />
          <ImagesPanel
            title="Images"
            data={this.state.results.allColors}
            isOpen={this.state.panels.images.isOpen}
            toggle={this.togglePanel('images')}
          />
          <ColorsPanel
            title="SEO"
            data={this.state.results.allColors}
            isOpen={this.state.panels.seo.isOpen}
            toggle={this.togglePanel('seo')}
          />
        </div>
      </Draggable>
    );
  }
});

export default App;
