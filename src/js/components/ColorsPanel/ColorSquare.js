import React from 'react';
import {highlightColors} from '../../modules/highlightColors';

const styles = {
  colorSquare: {
    backgroundColor: `#FFF`,
    cursor: 'pointer',
    float: 'left',
    paddingTop: `${1 / 12 * 100}%`, // This is a trick for height to match width
    width: `${1 / 12 * 100}%`
  }
};

const ColorSquare = React.createClass({
  handleClick(e) {
    const {copyColor, color} = this.props;
    copyColor(color);
  },

  handleMouseEnter(e) {
    this.setState({isHovered: true});
    highlightColors(this.props.matchingElements, true);
  },

  handleMouseLeave(e) {
    this.setState({isHovered: false});
    highlightColors(this.props.matchingElements, false);
  },

  hoverClass() {
    if (this.state.isHovered) {
      return 'sproggles-shadow'
    }
  },

  hoverIcon() {

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
        className={this.hoverClass()}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      ></div>
    );
  }
});

export default ColorSquare;
