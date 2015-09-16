import React from 'react';
import PanelContainer from './PanelContainer';
import PanelToolbar from './PanelToolbar';
import PanelBody from './PanelBody';

const FontsPanel = React.createClass({
  render: function() {
    return (
      <PanelContainer>
        <PanelToolbar title={this.props.title} toggle={this.props.toggle} />
        <PanelBody isOpen={this.props.isOpen}>
          <ul>
            {this.props.data.map(font => {
              return (
                <li className="font" style={{fontFamily: font}}>
                  <a target="_blank" href={`https://typekit.com/search?utf8=✓&q=${font}`}>
                    {font}
                  </a>
                </li>
              );
            })}
          </ul>
        </PanelBody>
      </PanelContainer>
    );
  }
});

export default FontsPanel;
