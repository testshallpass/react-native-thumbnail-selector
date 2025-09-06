import React from 'react';
import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  ImageProps,
  ImageSourcePropType,
  TextProps,
  TouchableOpacityProps,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';

export type ThumbnailItem = {
  caption?: string;
  imageSrc: ImageSourcePropType;
};

export type ThumbnailItemIndex = {
  item: ThumbnailItem;
  index: number;
};

export type ThumbnailSelectorProps = {
  thumbnails: ThumbnailItem[];
  toggle?: (func: () => Promise<Animated.EndResult>) => void;
  renderThumbnail?: (
    item: ThumbnailItem,
    index: number,
    onSelect?: (item: ThumbnailItem, index: number) => void,
  ) => JSX.Element;
  onSelect?: (item: ThumbnailItem, index: number) => void;
  initialIndex?: number;
  captionCharacterMaxLimit?: number;
  captionEllipsis?: string;
  activeColor?: string;
  inactiveColor?: string;
  imageProps?: ImageProps;
  textProps?: TextProps;
  touchableOpacityProps?: TouchableOpacityProps;
  animatedViewStyle?: ViewStyle;
  animationConfig?: Animated.SpringAnimationConfig;
  flatListViewStyle?: ViewStyle;
  animatedViewTestID?: string;
};

const ThumbnailSelector: React.FunctionComponent<ThumbnailSelectorProps> = ({
  thumbnails,
  toggle = undefined,
  renderThumbnail = undefined,
  onSelect = undefined,
  initialIndex = -1,
  captionCharacterMaxLimit = 15,
  captionEllipsis = '...',
  activeColor = 'white',
  inactiveColor = 'black',
  imageProps = {
    style: { width: 136, height: 136, borderWidth: 1 },
  },
  textProps = {
    style: { fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
    numberOfLines: 1,
  },
  touchableOpacityProps = {
    style: { padding: 8 },
  },
  animatedViewStyle = {
    elevation: 1,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  animationConfig = {
    toValue: 0,
    friction: 9,
    useNativeDriver: false,
  },
  flatListViewStyle = { backgroundColor: 'grey', padding: 8 },
  animatedViewTestID = 'ThumbnailSelector',
}) => {
  const window = useWindowDimensions();
  const [itemIndex, setItemIndex] = React.useState(initialIndex);
  const [animViewHeight, setAnimViewHeight] = React.useState(0);
  const animatedValue = React.useRef(new Animated.Value(0));
  const toValue = React.useRef(animationConfig.toValue);

  function _toggle(): Promise<Animated.EndResult> {
    if (toValue.current) {
      animationConfig.toValue = 0;
    } else {
      animationConfig.toValue = 1;
    }
    toValue.current = animationConfig.toValue;
    return new Promise<Animated.EndResult>(resolve => {
      Animated.spring(animatedValue.current, animationConfig).start(resolve);
    });
  }

  if (toggle) {
    toggle(_toggle);
  }

  function _renderItem(obj: ThumbnailItemIndex): React.JSX.Element {
    const { item, index } = obj;
    if (renderThumbnail) {
      return renderThumbnail(item, index, onSelect);
    }
    const selected = itemIndex === index;
    const color = selected ? activeColor : inactiveColor;
    let caption = item.caption;
    if (caption) {
      if (caption.length > captionCharacterMaxLimit) {
        const end = captionCharacterMaxLimit - captionEllipsis.length;
        caption = `${caption.substring(0, end)}${captionEllipsis}`;
      }
    }
    return (
      <TouchableOpacity
        {...touchableOpacityProps}
        onPress={() => {
          setItemIndex(index);
          if (onSelect) {
            onSelect(item, index);
          }
        }}
      >
        <Image
          {...imageProps}
          style={[{ borderColor: color }, imageProps.style]}
          source={item.imageSrc}
        />
        {caption && (
          <Text {...textProps} style={[{ color }, textProps.style]}>
            {caption}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  function _onLayout(event: LayoutChangeEvent): void {
    const { height } = event.nativeEvent.layout;
    if (animViewHeight !== height) {
      setAnimViewHeight(height);
    }
  }

  function _getAnimViewStyle(): ViewStyle[] {
    const start = window.height;
    const end = window.height - animViewHeight;
    return [
      animatedViewStyle,
      {
        transform: [
          {
            translateY: animatedValue.current.interpolate({
              inputRange: [0, 1],
              outputRange: [start, end],
            }),
          },
        ],
      },
    ];
  }

  return (
    <Animated.View
      testID={animatedViewTestID}
      style={_getAnimViewStyle()}
      onLayout={_onLayout}
    >
      <FlatList
        style={flatListViewStyle}
        data={thumbnails}
        initialNumToRender={thumbnails.length}
        extraData={itemIndex}
        horizontal={true}
        renderItem={_renderItem}
        keyExtractor={(_item, index) => `${index}`}
      />
    </Animated.View>
  );
};

export default ThumbnailSelector;
