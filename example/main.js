import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  View,
} from 'react-native';
import ThumbnailSelector from './ThumbnailSelector';

const {height, width} = Dimensions.get('window');

var data = [
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    borderColor: 'white',
    imageUri: 'https://unsplash.it/125?random',
    selected: true,
  },
  {
    title: 'Brian',
    borderColor: 'white',
    imageUri: 'https://facebook.github.io/react/img/logo_og.png',
    selected: false,
  },
  {
    title: 'Gene',
    borderColor: 'white',
    imageUri: 'https://unsplash.it/125?random',
    selected: false,
  },
  {
    title: 'Jose',
    borderColor: 'white',
    imageUri: 'https://facebook.github.io/react/img/logo_og.png',
    selected: false,
  },
  {
    title: 'Jon',
    borderColor: 'white',
    imageUri: 'https://unsplash.it/125?random',
    selected: false,
  },
  {
    title: 'Craig',
    borderColor: 'white',
    imageUri: 'https://facebook.github.io/react/img/logo_og.png',
    selected: false,
  },
  {
    title: 'Sean',
    borderColor: 'white',
    imageUri: 'https://unsplash.it/125?random',
    selected: false,
  },
];

export default class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: 'https://unsplash.it/' + width + '?random',
      isOpen: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 125, height: 125, margin: 8}}
          source={{uri: this.state.imageUri}}
          resizeMode={'contain'}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.show()}>
          <Text style={styles.text}>{'Toggle'}</Text>
        </TouchableOpacity>
        <ThumbnailSelector
          visible={this.state.isOpen}
          opacity={0.5}
          items={data}
          onSelectedItem={data => this.onSelectedItem(data)}
        />
      </View>
    );
  }
  show() {
    this.setState({
      isOpen: this.state.isOpen ? false : true,
    });
  }
  onSelectedItem(data) {
    console.log(data);
    this.setState({
      imageUri: data.imageUri,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'purple',
    margin: 8,
    padding: 8,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    fontFamily: 'Avenir',
  },
});
