import React from 'react';
import {mergeCSS} from '../../modules/utils';

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
    const {previewColor} = this.props;
    const colorPreviewStyle = mergeCSS(styles.colorPreview, {'backgroundColor': previewColor});

    return (
      <div style={colorPreviewStyle}></div>
    );
  }
});

export default ColorPreview;
