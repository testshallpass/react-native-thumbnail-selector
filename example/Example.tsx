import React from 'react';
import { Button } from 'react-native';

// Step 1: Import ThumbnailSelector.
import ThumbnailSelector from 'react-native-thumbnail-selector';

// Step 2: Define one or more thumbnails.
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
      {/* Step 4: Depending on your use case, use toggleRef to open and close ThumbnailSelector. */}
      <Button title={'Toggle'} onPress={() => toggleRef.current()} />
      {/* Step 5: Add ThumbnailSelector at last position in document tree so it overlaps other elements. */}
      <ThumbnailSelector
        thumbnails={Thumbnails}
        toggle={func => (toggleRef.current = func)}
      />
    </>
  );
}
