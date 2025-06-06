import React, {act} from 'react';
import {Text} from 'react-native';
import {
  render,
  fireEvent,
  screen,
  cleanup,
} from '@testing-library/react-native';
import ThumbnailSelector, {ThumbnailItem} from '../ThumbnailSelector';

describe('ThumbnailSelector', () => {
  afterEach(cleanup);

  function _truncate(
    value: string,
    maxLength: number = 15,
    ellipsis: string = '...',
  ): string {
    if (value.length > maxLength) {
      const end = maxLength - ellipsis.length;
      return `${value.substring(0, end)}${ellipsis}`;
    }
    return value;
  }

  const thumbnails = [
    {
      caption: 'react-native',
      imageSrc: {uri: 'https://reactnative.dev/img/tiny_logo.png'},
    },
    {
      caption: 'New York City',
      imageSrc: {uri: 'https://reactnative.dev/img/tiny_logo.png'},
    },
    {
      caption:
        'Elit cupidatat qui ea deserunt reprehenderit sit velit eu aliqua incididunt sit elit reprehenderit.',
      imageSrc: {uri: 'https://reactnative.dev/img/tiny_logo.png'},
    },
    {
      imageSrc: {uri: 'https://reactnative.dev/img/tiny_logo.png'},
    },
  ];

  test('it renders', () => {
    const component = render(<ThumbnailSelector thumbnails={thumbnails} />);
    thumbnails.forEach(thumbnail => {
      if (thumbnail.caption) {
        const item = screen.getByText(_truncate(thumbnail.caption));
        expect(item).toBeDefined();
        fireEvent.press(item);
      }
    });
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('onSelect prop', async () => {
    let toggle = () => {};
    let onSelect = jest.fn();
    const component = render(
      <ThumbnailSelector
        thumbnails={thumbnails}
        toggle={func => (toggle = func)}
        onSelect={onSelect}
      />,
    );
    await act(async () => toggle());
    thumbnails.forEach((thumbnail, index) => {
      if (thumbnail.caption) {
        const item = screen.getByText(_truncate(thumbnail.caption));
        expect(item).toBeDefined();
        fireEvent.press(item);
        expect(onSelect).toHaveBeenCalledTimes(index + 1);
      }
    });
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renderThumbnail prop', async () => {
    let toggle = () => {};
    const renderThumbnail = (item: ThumbnailItem, index: number) => {
      return <Text testID={`${index}`}>{item.caption}</Text>;
    };
    render(
      <ThumbnailSelector
        thumbnails={thumbnails}
        toggle={func => (toggle = func)}
        renderThumbnail={renderThumbnail}
      />,
    );
    await act(async () => toggle());
    thumbnails.forEach((thumbnail, index) => {
      if (thumbnail.caption) {
        const itemText = screen.getByText(thumbnail.caption);
        expect(itemText).toBeDefined();
      }
      const itemTestId = screen.getByTestId(`${index}`);
      expect(itemTestId).toBeDefined();
    });
    await act(async () => toggle());
  });

  test('onLayout', () => {
    render(<ThumbnailSelector thumbnails={thumbnails} />);

    const selector = screen.getByTestId('ThumbnailSelector');
    expect(selector).toBeDefined();

    fireEvent(selector, 'layout', {
      nativeEvent: {layout: {height: 0}},
    });

    fireEvent(selector, 'layout', {
      nativeEvent: {layout: {height: 100}},
    });
  });

  test('no thumbnails', () => {
    const component = render(<ThumbnailSelector thumbnails={[]} />);
    thumbnails.forEach(thumbnail => {
      if (thumbnail.caption) {
        const text = _truncate(thumbnail.caption);
        try {
          screen.getByText(text);
        } catch (error: unknown) {
          expect(error).toBeDefined();
          if (error instanceof Error) {
            expect(error).toBeInstanceOf(Error);
            const partialErrorMessage = `Unable to find an element with text: ${text}`;
            expect(error.message).toContain(partialErrorMessage);
          }
        }
      }
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
