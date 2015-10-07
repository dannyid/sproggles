import React from 'react';
import {highlightElements} from '../../modules/highlightElements';

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
    return '';
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
