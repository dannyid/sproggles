import React from 'react';
import ColorSquare from './ColorSquare';
import PanelToolbar from './PanelToolbar';
import {preNormalize} from '../modules/utils';

const important = '!important';

// const colors = ['#CCC', '#999', '#333', '#CCC', '#CCC'];

const ColorsPanel = React.createClass({
  getDefaultProps: function() {
    return {
      styles: {
        colorsPanelStyle: {
          base: {
            fontFamily: `Helvetica`,
            fontSize: 14,
            padding: 0,
            margin: 0,
            overflow: `hidden`,
            display: `block`
          },

          opened: {
            maxHeight: 435
          },

          closed: {
            height: 35
          }
        },

        panelTextStyle: {
          display: `block`,
          fontFamily: `inherit`,
          padding: 5
        },

        colorSquaresContainer: {
          display: `block`,
          position: `relative`
        }
      }
    };
  },

  render: function() {
    const openState =
      this.props.open
      ? this.props.styles.colorsPanelStyle.opened
      : this.props.styles.colorsPanelStyle.closed;

    return (
      <div className="colors-panel" style={preNormalize(this.props.styles.colorsPanelStyle.base, openState)}>
        <PanelToolbar title={this.props.title} toggle={this.props.toggle}/>
        <div className="color-squares-container" style={preNormalize(this.props.styles.colorSquaresContainer)}>
          {this.props.data.map(function(color){
            return (
              <ColorSquare color={color} />
            );
          })}
          <div style={{clear: "both"}}></div>
        </div>
      </div>
    );
  }
});

export default ColorsPanel;
