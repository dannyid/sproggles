import React from 'react';

const styles = {
  colorPreview: {
    backgroundColor: `#FFF`,
    float: 'left',
    paddingTop: `${1 / 2 * 100}%`, // This is a trick for height to match width
    position: 'absolute',
    width: `${1 / 2 * 100}%`
  }
};

const ColorPreview = React.createClass({
  render: function() {
    const bgColor = {'backgroundColor': this.props.previewColor};
    const colorPreviewStyle = {...styles.colorPreview, ...bgColor};

    return (
      <div style={colorPreviewStyle}></div>
    );
  }
});

export default ColorPreview;
