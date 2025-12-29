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

```tsx
import React from 'react';
import { Button } from 'react-native';

// Step 1: Import ThumbnailSelector.
import ThumbnailSelector from 'react-native-thumbnail-selector';

// Step 2: Define one or more thumbnails like below.
const Thumbnails = [
  {
    caption: 'Caption 1',
    imageSrc: { uri: 'https://reactnative.dev/img/pwa/manifest-icon-512.png' },
  },
  {
    caption: 'Caption 2',
    imageSrc: { uri: 'https://prettier.io/icon.png' },
  },
];

export default function App(): React.JSX.Element {
  // Step 3: Define the ref variable to hold toggle action.
  const toggleRef = React.useRef(() => {});

  return (
    <>
      {/* Step 4: Depending on your use case, use toggleRef to open and close the ThumbnailSelector. */}
      <Button title={'Toggle'} onPress={() => toggleRef.current()} />
      {/* Step 5: Add ThumbnailSelector at last position in document tree so it overlaps other components. */}
      {/* Step 6: Define the thumbnails and toggle props like below. */}
      <ThumbnailSelector
        thumbnails={Thumbnails}
        toggle={func => (toggleRef.current = func)}
      />
    </>
  );
}
```
