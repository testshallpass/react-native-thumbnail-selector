# react-native-thumbnail-selector

[![Platform](https://img.shields.io/badge/-react--native-grey?style=for-the-badge&logo=react)](https://github.com/facebook/react-native)
[![npm](https://img.shields.io/npm/v/react-native-thumbnail-selector?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/react-native-thumbnail-selector)
[![npm](https://img.shields.io/npm/dm/react-native-thumbnail-selector?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/react-native-thumbnail-selector)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://raw.github.com/testshallpass/react-native-thumbnail-selector/master/LICENSE)
[![CI](https://github.com/testshallpass/react-native-thumbnail-selector/actions/workflows/ci.yml/badge.svg)](https://github.com/testshallpass/react-native-thumbnail-selector/actions/workflows/ci.yml)

## Table of contents

- [Installation](#installation)
- [Support](#support)
- [Demo](#demo)
- [Usage](#usage)
- [Props](/ThumbnailSelector.tsx)

## Installation

|      |                                                      |
| :--: | ---------------------------------------------------- |
| yarn | `yarn add react-native-thumbnail-selector`           |
| npm  | `npm install react-native-thumbnail-selector --save` |

## Support

| react version | react-native version | package version | reason                                         |
| :-----------: | :------------------: | :-------------: | ---------------------------------------------- |
|    v16.8.0    |       v0.61.0        |     >=3.0.0     | React hooks and usage of `useWindowDimensions` |

## Demo

![screenshot](./assets/demo.gif)

## Usage

```javascript
import ThumbnailSelector from 'react-native-thumbnail-selector';

const thumbnails = [
  {
    caption: 'react-native',
    imageSrc: {uri: 'https://reactnative.dev/img/tiny_logo.png'},
  },
  {
    caption: 'Dolore do magna ullamco nisi quis.',
    imageSrc: {uri: 'https://reactnative.dev/img/tiny_logo.png'},
  },
];

function Example() {
  // use toggle to show and hide ThumbnailSelector
  let toggle = () => new Promise<unknown>(res => res);

  return (
    <ThumbnailSelector
      thumbnails={thumbnails}
      toggle={func => (toggle = func)}
    />
  );
}

export default Example;
```
