## react-native-thumbnail-selector
[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/) [![npm version](http://img.shields.io/npm/v//react-native-thumbnail-selector.svg)](https://www.npmjs.com/package/react-native-thumbnail-selector) [![npm version](http://img.shields.io/npm/dm//react-native-thumbnail-selector.svg)](https://www.npmjs.com/package/react-native-thumbnail-selector) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.github.com/testshallpass/react-native-thumbnail-selector/master/LICENSE)

 **Requires React-Native v0.43.0 or higher**

 Project began as an experiment with the new Flatlist in React-Native and shifted to a easy-to-use thumbnail selector module.

### Installation
```npm i react-native-thumbnail-selector --save```

### Usage
```javascript
import ThumbnailSelector from 'react-native-thumbnail-selector'
//...
constructor(props) {
  super(props);
  const items = [ // !!! Keys must be unique as per requirement of FlatList.
    { key: 0, 
      title: 'Lorem ipsum dolor sit amet', 
      borderColor: 'white',
      imageUri: 'https://placeimg.com/125/125/any',
      selected: true 
    },
    { key: 1,
      title: 'Brian',
      borderColor: 'white',
      imageUri: 'https://facebook.github.io/react/img/logo_og.png',
      selected: false
    }
  ]
  this.state = {
    items: items
    visible: true
  }
}
toggleAction() {
  this.setState({
    visible: !this.state.visible // Shows and hides selector.
  })
}
onSelectedItem(item) {
  // Use thumbnail selected to update UI.
}
loadMore = () => {
  var {items} = this.state.items
  var itemCount = items.length
  const moreItems = [
    { key: itemCount++, 
      title: 'Lorem ipsum dolor sit amet', 
      borderColor: 'white',
      imageUri: 'https://placeimg.com/125/125/any',
      selected: true 
    },
    { key: itemCount++,
      title: 'Brian',
      borderColor: 'white',
      imageUri: 'https://facebook.github.io/react/img/logo_og.png',
      selected: false
    }
  ]
  items = items.concat(moreItems)
  this.setState({
    items: items
  })
}
render() {
  const {items, visible} = this.state
  return ( // !!! View container should have flex set to 1
    <ThumbnailSelector visible={visible} 
      items={items} 
      onSelectedItem={(item) => this.onSelectedItem(item)} 
      loadMore={this.loadMore} />
  )
}
```
### Demo
![screenshot](https://raw.github.com/testshallpass/react-native-thumbnail-selector/master/screenshots/demo.gif)

### Props
| Name | Type | Description | Default |
| --- | :---: | --- | --- |
| ```items``` | **Required** Array  | Array of items (i.e.`[{key: 0, title: 'Brian', borderColor: 'white', imageUri: 'https://facebook.github.io/react/img/logo_og.png', selected: false}]`) | []
| ```visible``` | Bool  | show or hide selector | false
| ```backgroundColor``` | String  | backgroundColor of Flatlist | false
| ```loadMore``` | Func  | Callback to load more items at the end of the list | null
| ```flatlistProps``` | Func  | `<Flatlist />` props | null
| ```opacity``` | Number  | unselected items opacity | 0.8
| ```onSelectedItem``` | Func  | Invoked when user selects an item | null
| ```closeOnSelect``` | Bool  | whether or not to close after item is selected | true
| ```zIndex``` | Number  | zIndex | 1000
| ```closeOnSelectInterval``` | Number  | duration of close animation | 200
| ```numberOfLines``` | Number  | numberOfLines for caption | 2
| ```captionTextStyle``` | Text.proptypes.style | caption text style | `{color: 'white', fontFamily: 'Avenir', fontSize: 16, textAlign: 'center'}`
| ```thumbnailImageStyle``` | Image.proptypes.style | thumbnail image style | `{width: 125, height: 125, borderWidth: 2, borderRadius: 2}`
| ```containerStyle``` | View.proptypes.style | animated view style | `{position: 'absolute', bottom: 0}`
| ```itemContainerStyle``` | View.proptypes.style | item view style | `{flexDirection: 'column', paddingLeft: 8, paddingRight: 8, paddingTop: 8, alignItems: 'center}`
