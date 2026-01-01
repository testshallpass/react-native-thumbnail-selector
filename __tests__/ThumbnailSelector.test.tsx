import React, { act } from 'react';
import { View, Image, Text } from 'react-native';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import ThumbnailSelector, { type ThumbnailItem } from '../ThumbnailSelector';

describe('ThumbnailSelector', () => {
  afterEach(cleanup);

  function _getThumbnailItemTestId(
    type: 'button' | 'image' | 'text',
    index: number,
  ): string {
    return `thumbnail-item-${type}-${index}`;
  }

  const imageSrc = { uri: 'https://reactnative.dev/img/tiny_logo.png' };
  const thumbnails: ThumbnailItem[] = [
    {
      caption: 'Caption 1',
      imageSrc,
    },
    {
      caption: 'Caption 2',
      imageSrc,
    },
    {
      caption: 'Caption 3: this is a really long caption',
      imageSrc,
    },
    {
      imageSrc,
    },
  ];

  function _testOnSelect(onSelect?: jest.Mock): void {
    const component = render(
      <ThumbnailSelector thumbnails={thumbnails} onSelect={onSelect} />,
    );
    const selector = component.getByTestId('ThumbnailSelector');
    expect(selector).toBeDefined();
    const flatlist = component.getByTestId('thumbnail-selector-flatlist');
    expect(flatlist).toBeDefined();

    thumbnails.forEach((thumbnail, index) => {
      const button = component.getByTestId(
        _getThumbnailItemTestId('button', index),
      );
      expect(button).toBeDefined();
      expect(button).toBeOnTheScreen();

      const image = component.getByTestId(
        _getThumbnailItemTestId('image', index),
      );
      expect(image).toBeDefined();
      expect(image).toBeOnTheScreen();
      expect(image).toHaveStyle({ borderColor: 'black' });

      let text;
      if (thumbnail.caption) {
        text = component.getByTestId(_getThumbnailItemTestId('text', index));
        expect(text).toBeDefined();
        expect(text).toBeOnTheScreen();
        expect(text).toHaveStyle({ color: 'black' });
      }

      fireEvent.press(button);
      expect(image).toHaveStyle({ borderColor: 'white' });
      if (text) {
        expect(text).toHaveStyle({ color: 'white' });
      }
    });
    if (onSelect) {
      expect(onSelect).toBeDefined();
      expect(onSelect).toHaveBeenCalledTimes(thumbnails.length);
    }
    expect(component.toJSON()).toMatchSnapshot();
  }

  test('without onSelect prop', () => {
    _testOnSelect();
  });

  test('with onSelect prop', () => {
    _testOnSelect(jest.fn());
  });

  test('renderThumbnail prop', () => {
    const renderThumbnail = (item: ThumbnailItem, index: number) => {
      return (
        <View testID={`my-view-${index}`}>
          <Image testID={`my-image-${index}`} source={item.imageSrc} />
          <Text testID={`my-text-${index}`}>{item.caption}</Text>
        </View>
      );
    };
    const component = render(
      <ThumbnailSelector
        thumbnails={thumbnails}
        renderThumbnail={renderThumbnail}
      />,
    );
    thumbnails.forEach((_thumbnail, index) => {
      const elements = [
        `my-view-${index}`,
        `my-image-${index}`,
        `my-text-${index}`,
      ];
      elements.forEach(element => {
        const elementTestId = component.getByTestId(element);
        expect(elementTestId).toBeDefined();
        expect(elementTestId).toBeOnTheScreen();
      });
    });
  });

  test('toggle toValue 1', () => {
    let toggle = () => {};
    render(
      <ThumbnailSelector
        thumbnails={thumbnails}
        toggle={func => (toggle = func)}
        animationConfig={{
          toValue: 1,
          useNativeDriver: false,
        }}
      />,
    );
    act(() => toggle());
  });

  test('toggle toValue 0', () => {
    let toggle = () => {};
    render(
      <ThumbnailSelector
        thumbnails={thumbnails}
        toggle={func => (toggle = func)}
      />,
    );
    act(() => toggle());
  });

  test('onLayout', () => {
    const component = render(<ThumbnailSelector thumbnails={thumbnails} />);
    const selector = component.getByTestId('ThumbnailSelector');
    expect(selector).toBeDefined();

    fireEvent(selector, 'layout', {
      nativeEvent: { layout: { height: 0 } },
    });

    fireEvent(selector, 'layout', {
      nativeEvent: { layout: { height: 100 } },
    });
  });

  test('no thumbnails', () => {
    const component = render(<ThumbnailSelector thumbnails={[]} />);
    const selector = component.getByTestId('ThumbnailSelector');
    expect(selector).toBeDefined();

    const flatlist = component.getByTestId('thumbnail-selector-flatlist');
    expect(flatlist).toBeDefined();
    expect(flatlist.props.data).toStrictEqual([]);
    expect(flatlist.props.initialNumToRender).toStrictEqual(0);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
