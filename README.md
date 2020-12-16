# react-native-thumbnail-selector

[![Platform](https://img.shields.io/badge/react-v16.8.0-lightgrey?style=flat-square)](https://reactjs.org/)
[![Platform](https://img.shields.io/badge/react--native-v0.61.0-blue?style=flat-square)](https://github.com/facebook/react-native)
[![npm](https://img.shields.io/npm/v/react-native-thumbnail-selector?style=flat-square)](https://www.npmjs.com/package/react-native-thumbnail-selector)
[![npm](https://img.shields.io/npm/dm/react-native-thumbnail-selector?style=flat-square)](https://www.npmjs.com/package/react-native-thumbnail-selector)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.github.com/testshallpass/react-native-thumbnail-selector/master/LICENSE)

## Installation

* ```yarn add react-native-thumbnail-selector```
* ```npm install react-native-thumbnail-selector --save```

This depends on React hooks introduced in React v16.8.0 and `useWindowDimensions` introduced in react-native v0.61.0.

## Demo

![screenshot](./assets/demo.gif)

## Usage

1. Import `import ThumbnailSelector from 'react-native-thumbnail-selector';`
2. Create an array of object(s) that have image URL and caption.

    ```javascript
    const thumbnails = [
      {image: 'https://reactnative.dev/docs/assets/favicon.png', caption: 'React-native'},
      {image: 'https://placeimg.com/125/125/any', caption: 'Any'},
    ];
    ```

3. Add `ThumbnailSelector`.

    ```javascript
    let thumbnailSelectorRef = useRef(null);
    <ThumbnailSelector
      ref={thumbnailSelectorRef}
      thumbnails={thumbnails}
    />
    ```

4. To show: ```thumbnailSelectorRef.current.show();```.
5. To hide: ```thumbnailSelectorRef.current.hide();```.

## Props

| Name | Type | Description | Default |
| :--- | :---: | --- | --- |
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
