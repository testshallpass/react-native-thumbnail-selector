import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Main from './main'

class ThumbnailSelector extends Component {
  render() {
    return (
      <Main />
    )
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('ThumbnailSelector', () => ThumbnailSelector);
