## react-native-thumbnail-selector
[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/)

Project to experiment with the new Flatlist in React-Native. **Requires >v0.43.0**

### Installation
```coming soon```

### Usage
```javascript
import ThumbnailSelector from 'react-native-thumbnail-selector'
//...
render() {
  const items = [
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
  return (
    <ThumbnailSelector
      visible={this.state.visible}
      items={items}
      onSelectedItem={(item) => this.onSelectedItem(item)} />
  )
}
// ...
toggleAction() {
  this.setState({
    visible: !this.state.visible
  })
}
// ...
onSelectedItem(item) {
	// ...
}
// ...
```

### Demo

![screenshot](https://raw.github.com/testshallpass/react-native-thumbnail-selector/master/screenshots/demo.gif)

### Props

| Name | Type | Description | Default |
| --- | :---: | --- | --- |
| ```items``` | **Required** Array  | Array of items (i.e.`[{key: 0, title: 'Brian', borderColor: 'white', imageUri: 'https://facebook.github.io/react/img/logo_og.png', selected: false}]`) | []
| ```visible``` | Bool  | show or hide selector | false
| ```backgroundColor``` | String  | backgroundColor of Flatlist | false
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
