import React, { Component } from 'react';
import { StyleSheet, Button, Image, Text, View } from 'react-native';
import ThumbnailSelector from 'react-native-thumbnail-selector';
import { ITEMS, REACT_NATIVE_LOGO, PLACEHOLDER, IMAGE_SIZE } from './constants';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ITEMS,
      visible: false,
      selected: ITEMS[0],
    };
  }
  _onOpen = () => {
    this.setState({ visible: true });
  };
  _onClose = () => {
    this.setState({ visible: false });
  };
  _onSelect = item => {
    this.setState({ selected: item });
  };
  _onLoadMore = () => {
    let items = this.state.items;
    let itemCount = items.length;
    const more = [
      {
        key: itemCount++,
        title: 'Paul',
        borderColor: 'white',
        imageUri: PLACEHOLDER,
        selected: false,
      },
      { 
        key: itemCount++,
        title: 'Brian',
        borderColor: 'white',
        imageUri: REACT_NATIVE_LOGO,
        selected: false,
      },
    ];
    items = items.concat(more);
    this.setState({ items });
  };
  render() {
    const { visible, items, selected } = this.state;
    const { key, imageUri, title } = selected;
    const text = `${title} #${key}`;
    return (
      <View style={styles.container}>
        <Image style={styles.image} resizeMode={'contain'} source={{ uri: imageUri }}/>
        <Text style={styles.text}>{text}</Text>
        <Button
          onPress={this._onOpen}
          title={'Open'}
          color={'steelblue'}
          accessibilityLabel={'Open'}
        />
        <Button
          onPress={this._onClose}
          title={'Close'}
          color={'red'}
          accessibilityLabel={'Close'}
        />
        <ThumbnailSelector
          visible={visible}
          items={items}
          onSelectedItem={this._onSelect}
          loadMore={this._onLoadMore}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
