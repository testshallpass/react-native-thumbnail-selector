import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  View,
} from 'react-native';
import ThumbnailSelector from './ThumbnailSelector';

export default class main extends Component {
  constructor(props) {
    const items = [
      {
        key: 0,
        title: 'Paul',
        borderColor: 'white',
        imageUri: 'https://unsplash.it/125?random',
        selected: true,
      },
      {
        key: 1,
        title: 'Brian',
        borderColor: 'white',
        imageUri: 'https://facebook.github.io/react/img/logo_og.png',
        selected: false,
      },
      {
        key: 2,
        title: 'Gene',
        borderColor: 'white',
        imageUri: 'https://unsplash.it/125?random',
        selected: false,
      },
      {
        key: 3,
        title: 'Jose',
        borderColor: 'white',
        imageUri: 'https://facebook.github.io/react/img/logo_og.png',
        selected: false,
      },
      {
        key: 4,
        title: 'Jon',
        borderColor: 'white',
        imageUri: 'https://unsplash.it/125?random',
        selected: false,
      },
      {
        key: 5,
        title: 'Craig',
        borderColor: 'white',
        imageUri: 'https://facebook.github.io/react/img/logo_og.png',
        selected: false,
      },
      {
        key: 6,
        title: 'Sean',
        borderColor: 'white',
        imageUri: 'https://unsplash.it/125?random',
        selected: false,
      },
    ];
    super(props);
    this.state = {
      items: items
    };
  }
  showAction() {
    this.thumbnailSelector.show();
  }
  onSelectedItem(data) {
    console.log(data);
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.showAction()}
          title={"Toggle ThumbnailSelector"}
          color={"steelblue"}
          accessibilityLabel={"Toggle ThumbnailSelector"}
        />
        <ThumbnailSelector
          ref={ref => this.thumbnailSelector = ref}
          opacity={0.5}
          items={this.state.items}
          onSelectedItem={(data) => this.onSelectedItem(data)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
