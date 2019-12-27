import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  Image,
  Text,
  View,
} from 'react-native';
import ThumbnailSelector from 'react-native-thumbnail-selector';

export default class App extends Component {
  constructor(props) {
    const items = [
      {
        key: 0,
        title: 'Paul',
        borderColor: 'white',
        imageUri: 'https://placeimg.com/125/125/any',
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
        imageUri: 'https://placeimg.com/125/125/tech',
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
        imageUri: 'https://placeimg.com/125/125/nature',
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
        imageUri: 'https://placeimg.com/125/125/people',
        selected: false,
      },
    ];
    super(props);
    this.state = {
      items: items,
      visible: true,
      imageUri: 'https://facebook.github.io/react/img/logo_og.png',
      title: items[0].title + ' #' + items[0].key
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
      imageUri: item.imageUri,
      title: item.title + ' #' + item.key
    })
  }
  loadMore = () => {
    var items = this.state.items;
    var itemCount = items.length
    const more = [{
        key: itemCount++,
        title: 'Paul',
        borderColor: 'white',
        imageUri: 'https://placeimg.com/125/125/any',
        selected: false,
      },
      { key: itemCount++,
        title: 'Brian',
        borderColor: 'white',
        imageUri: 'https://facebook.github.io/react/img/logo_og.png',
        selected: false,
      },
    ]
    items = items.concat(more)
    this.setState({
      items: items
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={{width: 125, height: 125}} source={{uri: this.state.imageUri}}/>
        <Text style={styles.text}>{this.state.title}</Text>
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
          loadMore={this.loadMore}
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
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  }
});
