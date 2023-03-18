import React from 'react';
import ThumbnailSelector from './src/ThumbnailSelector';

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

function Example(): JSX.Element {
  // use toggle to show and hide ThumbnailSelector
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let toggle = () => {};

  return (
    <ThumbnailSelector
      thumbnails={thumbnails}
      toggle={func => (toggle = func)}
    />
  );
}

export default Example;
