import React, { Component, PropTypes } from 'react';

class Bundle extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };

  static generateBundle = loadModule => () => (
    /* eslint-disable */
    <Bundle load={loadModule}>
      {Mod => Mod ? <Mod /> : <div style={{ textAlign: 'center', paddingTop: '35vh' }}>Loading</div>}
    </Bundle>
    /* eslint-enable */
    );


  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null,
  };

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      mod: null,
    });
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod,
      });
    });
  }

  render() {
    return this.props.children(this.state.mod);
  }
}

export default Bundle;
