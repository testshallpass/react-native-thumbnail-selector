import React, { Component } from 'react';
import { StyleSheet, Button, Image, Text, View } from 'react-native';
import { ITEMS, IMAGE_SIZE } from './constants';
// import ThumbnailSelector from './src/ThumbnailSelector';
import ThumbnailSelector from 'react-native-thumbnail-selector';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ITEMS[0],
    };
  }
  _show = () => {
    this.thumbnailSelectorRef.show(ITEMS);
  };
  _hide = () => {
    this.thumbnailSelectorRef.hide();
  };
  _onSelect = item => {
    this.setState({ selected: item });
    this._hide();
  };
  render() {
    const { selected } = this.state;
    const { image, caption } = selected;
    const text = `${caption}`;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image style={styles.image} resizeMode={'contain'} source={{ uri: image }}/>
          <Text style={styles.text}>{text}</Text>
          <Button
            onPress={this._show}
            title={'Show'}
            color={'blue'}
            accessibilityLabel={'Show'}
          />
          <Button
            onPress={this._hide}
            title={'Hide'}
            color={'red'}
            accessibilityLabel={'Hide'}
          />
        </View>
        <ThumbnailSelector
          ref={ref => this.thumbnailSelectorRef = ref}
          onSelect={this._onSelect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: IMAGE_SIZE, 
    height: IMAGE_SIZE
  }
});
