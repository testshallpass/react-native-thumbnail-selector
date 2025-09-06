import React from 'react';
import { Animated } from 'react-native';
import ThumbnailSelector from 'react-native-thumbnail-selector';

const thumbnails = [
  {
    caption: 'react-native',
    imageSrc: { uri: 'https://reactnative.dev/img/pwa/manifest-icon-512.png' },
  },
  {
    caption: 'Dolore do magna ullamco nisi quis.',
    imageSrc: { uri: 'https://reactnative.dev/img/pwa/manifest-icon-512.png' },
  },
];

function Example(): React.JSX.Element {
  // use toggle to show and hide ThumbnailSelector
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let toggle = () => new Promise<Animated.EndResult>(res => res);

  return (
    <ThumbnailSelector
      thumbnails={thumbnails}
      toggle={func => (toggle = func)}
    />
  );
}

export default Example;
