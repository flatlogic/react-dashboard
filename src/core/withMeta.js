import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { updateMeta } from '../DOMUtils';
import { defaultMeta } from '../config';

function withMeta(ComposedComponent) {
  class WithMeta extends Component {
    componentWillMount() {
      if (ComposedComponent.meta) {
        Object.keys(ComposedComponent.meta).forEach(metaKey => {
          if (metaKey === 'title') {
            document.title = `${ComposedComponent.meta[
              metaKey
            ]} - ${defaultMeta[metaKey]}`;
            return;
          }
          updateMeta(metaKey, ComposedComponent.meta[metaKey]);
        });
      }
    }

    componentWillUnmount() {
      Object.keys(defaultMeta).forEach(metaKey => {
        if (metaKey === 'title') {
          document.title = defaultMeta[metaKey];
          return;
        }
        updateMeta(metaKey, defaultMeta[metaKey]);
      });
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  WithMeta.ComposedComponent = ComposedComponent;
  return hoistStatics(WithMeta, ComposedComponent);
}

export default withMeta;
