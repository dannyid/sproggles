import React from 'react';
import Draggable from 'react-draggable';

const colorsPanelStyle = {
  position: 'fixed',
  top: '30px',
  left: '30px',
  height: '500px',
  width: '300px',
  background: 'white',
  border: '1px solid #CCC',
  'z-index': 9999999999,
  'box-shadow': '0 -1px 0 #e5e5e5, 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
  'padding': '5px',
  'font-size': '16px'
};

class ColorsPanel extends React.Component {
  render() {
    return (
      <Draggable>
        <div className="colorsPanel" style={colorsPanelStyle}>
          Hello, I am a React component embedded on the screen!
        </div>
      </Draggable>
    );
  }
}

export default ColorsPanel;
