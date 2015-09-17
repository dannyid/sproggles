import React from 'react';
import PanelContainer from '../PanelContainer';

const SEOPanel = React.createClass({
  componentWillUpdate: function(nextProps, nextState) {
    const {isOpen} = nextProps;

    if (isOpen) {
      console.log(true);
      // do Google search
    } else {
      console.log(false);
    }
  },

  render: function() {
    const {data, title, toggle, isOpen} = this.props;

    return (
      <PanelContainer title={title} toggle={toggle} isOpen={isOpen}>
        <p>SEO Panel</p>
      </PanelContainer>
    );
  }
});

export default SEOPanel;
