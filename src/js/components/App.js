import React from 'react';
import ColorsPanel from './ColorsPanel.js';
import Draggable from 'react-draggable';

const App = React.createClass({
  componentWillMount: function() {
    return;
  },

  getDefaultProps: function() {
    return;
  },

  render: function() {
    return (
      <Draggable>
        <ColorsPanel colors={this.props.results.allColors} />
      </Draggable>
    );
  }
});

export default App;
