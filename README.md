# react-native-thumbnail-selector

[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/)
![npm](https://img.shields.io/npm/v/react-native-thumbnail-selector)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.github.com/testshallpass/react-native-thumbnail-selector/master/LICENSE)

A thumbnail selector that internally uses Flatlist component so it requires react-native 0.43.0 or higher.

## Installation

```npm i react-native-thumbnail-selector --save```

## Usage

```javascript
import ThumbnailSelector from 'react-native-thumbnail-selector';
export default class App extends Component {
  componentDidMount() {
    this._show();
  }
  _show = () => {
    this.thumbnailSelectorRef.show();
  };
  _hide = () => {
    this.thumbnailSelectorRef.hide();
  };
  _onSelect = item => {
    this._hide();
  };
  render() {
    const reactNativeImage = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
    // thumbnail objects are require to have image and caption properties.
    const thumbnails = [{ image: reactNativeImage, caption: 'Logo' }];
    return (
      <ThumbnailSelector
        ref={ref => this.thumbnailSelectorRef = ref}
        thumbnails={thumbnails}
        onSelect={this._onSelect}
      />
    );
  }
}
```

## Props

| Name | Type | Description | Default |
| --- | :---: | --- | --- |
| ```thumbnails``` | Array | thumbnails for the Flatlist | `[]`
| ```containerStyle``` | Object | animated view style | `{ elevation: 1, zIndex: 1, position: 'absolute', top: 0, right: 0, left: 0  }`
| ```thumbnailStyle``` | Object | thumbnail style | `{ flexDirection: 'column', margin: 8, alignItems: 'center' }`
| ```imageStyle``` | Object | image style | `{ width: 125, height: 125, borderWidth: 2 }`
| ```captionStyle``` | Object | caption text style | `{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }`
| ```animationDuration``` | Number  | how long it animates show and hide | 600
| ```onSelect``` | Function  | invoked at thumbnail selection | `() => {}`
| ```activeOpacity``` | Number  | selected thumbnails opacity | 1
| ```inactiveOpacity``` | Number  | unselected thumbnails opacity | 0.5
| ```activeBorderColor``` | String  | selected thumbnails borderColor | transparent
| ```inactiveBorderColor``` | String  | unselected thumbnails borderColor | black
| ```selectedIndex``` | Number  | selected index of thumbnail | -1
| ```viewHeight``` | Number  | thumbnail container view height | 0
