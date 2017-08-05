import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import Main from './main';

class ThumbnailSelector extends Component {
  render() {
    return <Main />;
  }
}
AppRegistry.registerComponent(
  'ThumbnailSelectorExample',
  () => ThumbnailSelector,
);
