import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
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
      items: items,
      visible: true,
      imageUri: 'https://facebook.github.io/react/img/logo_og.png'
    };
  }
  showAction() {
    const {visible} = this.state
    this.setState({
      visible: !visible
    })
  }
  onSelectedItem(item) {
    this.setState({
      visible: false,
      imageUri: item.imageUri
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={{width: 125, height: 125}} source={{uri: this.state.imageUri}}/>
        <Button
          onPress={() => this.showAction()}
          title={"Toggle"}
          color={"steelblue"}
          accessibilityLabel={"Toggle"}
        />
        <ThumbnailSelector
          visible={this.state.visible}
          items={this.state.items}
          onSelectedItem={(item) => this.onSelectedItem(item)}
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
    alignItems: 'center'
  },
});
