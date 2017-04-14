## react-native-thumbnail-selector: Work-In-Progress

[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/)

### Installation
```coming soon```

### Usage
```javascript
import ThumbnailSelector from 'react-native-thumbnail-selector'
//...
render() {
  const items = [
    { title: 'Lorem ipsum dolor sit amet',
      borderColor: 'white',
      imageUri: 'https://unsplash.it/125?random',
      selected: true
    },
    { title: 'Brian',
      borderColor: 'white',
      imageUri: 'https://facebook.github.io/react/img/logo_og.png',
      selected: false
    }
  ]
  return (
    <ThumbnailSelector visible={this.state.showThumbnail} opacity={0.5} items={items} />
  )
}
// ...
buttonAction() {
  this.setState({
    showThumbnail: true
  })
}
```

### Demo

![screenshot](https://raw.github.com/testshallpass/react-native-thumbnail-selector/master/screenshots/demo.gif)

### Props

| Name | Type | Description | Default |
| --- | :---: | --- | --- |
| ```items``` | Array  | Array of thumbnail items (i.e.`{title: 'Brian', borderColor: 'white',imageUri: 'https://facebook.github.io/react/img/logo_og.png', selected: false}`) | []
| ```opacity``` | Number  | unselected items opacity | 0.8
| ```fontSize``` | Number  | caption title font size| 16
| ```fontFamily``` | String  | caption title font family| Avenir
| ```textColor``` | String  | caption title color | 1
| ```imageHeight``` | String  | thumbnail width | 125
| ```imageWidth``` | String  | thumbnail height | 125
| ```imageBorderWidth``` | Number | border width of thumbnail | 2
| ```imageBorderRadius``` | Number  | thumbnail border radius | 2
| ```onSelectedItem``` | Func  | fired when user selects thumbnail | null
| ```closeOnSelect``` | Bool  | whether or not to close after selection | true
| ```zIndex``` | Number  | zIndex | 0
| ```closeOnSelectInterval``` | Number  | duration of close animation | 200
| ```numberOfLines``` | Number  | caption title numberOfLines | 2
