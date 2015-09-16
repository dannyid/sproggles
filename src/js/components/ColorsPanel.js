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
          fontFamily: `Helvetica`,
          fontSize: 14,
          padding: 0,
          margin: 0,
          overflow: `hidden`,
          display: `block`
        },

        panelTextStyle: {
          display: `block`,
          fontFamily: `inherit`,
          padding: 5
        },

        colorSquaresContainer: {
          base: {
            display: `block`,
            position: `relative`,
            overflow: `scroll`
          },

          opened: {
            maxHeight: 400
          },

          closed: {
            height: 0,
            maxHeight: 0
          }
        }
      }
    };
  },

  render: function() {
    const openState =
      this.props.open
      ? this.props.styles.colorSquaresContainer.opened
      : this.props.styles.colorSquaresContainer.closed;

    return (
      <div className="colors-panel" style={preNormalize(this.props.styles.colorsPanelStyle)}>
        <PanelToolbar title={this.props.title} toggle={this.props.toggle}/>
        <div className="color-squares-container" style={preNormalize(this.props.styles.colorSquaresContainer.base, openState)}>
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
