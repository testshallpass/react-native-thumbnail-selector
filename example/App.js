import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import {ITEMS, IMAGE_SIZE} from './constants';
// import ThumbnailSelector from './src/ThumbnailSelector';
import ThumbnailSelector from 'react-native-thumbnail-selector';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }
  componentDidMount() {
    this._show();
  }
  _show = () => {
    this.thumbnailSelectorRef.show();
  };
  _hide = () => {
    this.thumbnailSelectorRef.hide();
  };
  _onSelect = (item, index) => {
    this.setState({selectedIndex: index});
  };
  render() {
    const {selectedIndex} = this.state;
    const {image, caption} = ITEMS[selectedIndex];
    const text = `${caption} #${selectedIndex}`;
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={{uri: image}}
        />
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity style={styles.button} onPress={this._show}>
          <Text style={styles.text}>{'Show'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this._hide}>
          <Text style={styles.text}>{'Hide'}</Text>
        </TouchableOpacity>
        <ThumbnailSelector
          ref={ref => (this.thumbnailSelectorRef = ref)}
          selectedIndex={selectedIndex}
          thumbnails={ITEMS}
          onSelect={this._onSelect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EEEF',
    justifyContent: 'center',
  },
  text: {
    color: '#202020',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    margin: 8,
    alignSelf: 'center',
  },
  button: {
    margin: 8,
    padding: 8,
    borderColor: '#202020',
    borderRadius: 3,
    borderWidth: 1,
    alignContent: 'center',
  },
});
