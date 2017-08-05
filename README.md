## react-native-thumbnail-selector
[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/) [![npm version](http://img.shields.io/npm/v//react-native-thumbnail-selector.svg)](https://www.npmjs.com/package/react-native-thumbnail-selector) [![npm version](http://img.shields.io/npm/dm//react-native-thumbnail-selector.svg)](https://www.npmjs.com/package/react-native-thumbnail-selector) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.github.com/testshallpass/react-native-thumbnail-selector/master/LICENSE)

 **Requires react-native >=v0.43.0**

A Flatlist thumbnail selector that animates from the bottom by default.

### Installation
```npm i react-native-thumbnail-selector --save```

### Demo
![screenshot](https://raw.github.com/testshallpass/react-native-thumbnail-selector/master/screenshots/demo.gif)

### Props
| Name | Type | Description | Default |
| --- | :---: | --- | --- |
| ```items``` | **Required** Array of objects with key  | (i.e.`[{key: 0, title: 'Brian', borderColor: 'white', imageUri: 'http://path/to/image.png', selected: false}]`) | []
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
| ```containerStyle``` | ViewPropTypes.style | animated view style | `{position: 'absolute', bottom: 0}`
| ```itemContainerStyle``` | ViewPropTypes.style | item view style | `{flexDirection: 'column', paddingLeft: 8, paddingRight: 8, paddingTop: 8, alignItems: 'center}`
