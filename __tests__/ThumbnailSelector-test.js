import 'react-native';
import React from 'react';
import ThumbnailSelector from '../ThumbnailSelector';
import renderer from 'react-test-renderer';

describe('ThumbnailSelector', () => {
  test('open', () => {
    let thumbRef = {current: ''};
    let tree = renderer.create(
      <ThumbnailSelector
        thumbnailSelectorRef={(obj) => {
          thumbRef.current = obj;
        }}
      />,
    );
    thumbRef.current.animate();
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('open then close', () => {
    let thumbRef = {current: ''};
    let tree = renderer.create(
      <ThumbnailSelector
        thumbnailSelectorRef={(obj) => {
          thumbRef.current = obj;
        }}
      />,
    );
    thumbRef.current.animate(); // open
    thumbRef.current.animate(); // close
    expect(tree.toJSON()).toMatchSnapshot();
  });
  test('renders', () => {
    const tree = renderer.create(<ThumbnailSelector />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
