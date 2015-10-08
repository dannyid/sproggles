import React from 'react';
import {highlightElements} from '../../modules/highlightElements';
import {CURRENT_EXTENSION_ID} from '../../modules/constants';
import {getContrastYIQ} from '../../modules/utils';

const styles = {
  colorSquare: {
    backgroundColor: `#FFF`,
    cursor: 'pointer',
    float: 'left',
    paddingTop: `${1 / 12 * 100}%`, // This is a trick for height to match width
    position: 'relative',
    width: `${1 / 12 * 100}%`
  },

  eyeball: {
    fill: 'currentColor',
    left: '50%',
    maxHeight: 16,
    maxWidth: 16,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

const ColorSquare = React.createClass({
  handleClick(e) {
    const {copyColor, color} = this.props;
    copyColor(color);
  },

  handleMouseEnter(e) {
    this.setState({isHovered: true});
    highlightElements(this.props.matchingElements, true);
  },

  handleMouseLeave(e) {
    this.setState({isHovered: false});
    highlightElements(this.props.matchingElements, false);
  },

  hoverClass() {
    if (this.state.isHovered) {
      return 'sproggles-shadow'
    }
  },

  hoverIcon() {
    const imageUrl = `chrome-extension://${CURRENT_EXTENSION_ID}/img/eye.svg`;
    const overlayColor = {'color': getContrastYIQ(this.props.color, 'rgb')};
    const eyeballStyle = {...styles.eyeball, ...overlayColor};

    if (this.state.isHovered) {
      return (
        <svg width="512" height="512" viewBox="0 0 512 512" style={eyeballStyle}>
          <path d="M256 96c-111.659 0-208.441 65.021-256 160 47.559 94.979 144.341 160 256 160 111.656 0 208.438-65.021 256-160-47.558-94.979-144.344-160-256-160zM382.225 180.852c30.081 19.187 55.571 44.887 74.717 75.148-19.146 30.261-44.637 55.961-74.718 75.148-37.797 24.109-81.445 36.852-126.224 36.852-44.78 0-88.429-12.743-126.226-36.852-30.079-19.186-55.569-44.886-74.716-75.148 19.146-30.262 44.637-55.962 74.717-75.148 1.959-1.25 3.938-2.461 5.93-3.65-4.98 13.664-7.705 28.411-7.705 43.798 0 70.691 57.308 128 128 128s128-57.309 128-128c0-15.387-2.726-30.134-7.704-43.799 1.989 1.189 3.969 2.401 5.929 3.651v0zM256 208c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.491 48 48z"></path>
        </svg>
      );
    }
  },

  getInitialState() {
    return {
      isHovered: false
    };
  },

  render() {
    const bgColor = {'backgroundColor': this.props.color};
    const colorSquareStyle = {...styles.colorSquare, ...bgColor};

    return (
      <div
        style={colorSquareStyle}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.hoverIcon()}
      </div>
    );
  }
});

export default ColorSquare;
