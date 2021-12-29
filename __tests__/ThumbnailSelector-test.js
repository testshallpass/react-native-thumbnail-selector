import 'react-native';
import React from 'react';
import ThumbnailSelector from '../ThumbnailSelector';
import renderer from 'react-test-renderer';

describe('ThumbnailSelector', () => {
  test('open', () => {
    let thumbRef;
    let tree = renderer.create(
      <ThumbnailSelector
        ref={(ref) => {
          thumbRef = ref;
        }}
      />,
    );
    thumbRef.animate();
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('open then close', () => {
    let thumbRef;
    let tree = renderer.create(
      <ThumbnailSelector
        ref={(ref) => {
          thumbRef = ref;
        }}
      />,
    );
    thumbRef.animate(); // open
    thumbRef.animate(); // close
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('renders', () => {
    const tree = renderer.create(<ThumbnailSelector />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
