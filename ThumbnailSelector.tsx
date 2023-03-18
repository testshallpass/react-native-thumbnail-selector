import React, {useRef, useState} from 'react';
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
  toggle?: (func: () => void) => void;
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
};

const ThumbnailSelector: React.FC<ThumbnailSelectorProps> = ({
  thumbnails = [],
  toggle = undefined,
  renderThumbnail = undefined,
  onSelect = undefined,
  initialIndex = -1,
  captionCharacterMaxLimit = 15,
  captionEllipsis = '...',
  activeColor = 'white',
  inactiveColor = 'black',
  imageProps = {
    style: {width: 136, height: 136, borderWidth: 1},
  },
  textProps = {
    style: {fontSize: 16, textAlign: 'center', fontWeight: 'bold'},
    numberOfLines: 1,
  },
  touchableOpacityProps = {
    style: {padding: 8},
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
  flatListViewStyle = {backgroundColor: 'grey', padding: 8},
}) => {
  const window = useWindowDimensions();
  const [itemIndex, setItemIndex] = useState(initialIndex);
  const [animViewHeight, setAnimViewHeight] = useState(0);
  const animatedValue = useRef(new Animated.Value(0));
  const toValue = useRef(animationConfig.toValue);

  const _toggle = () => {
    if (toValue.current) {
      animationConfig.toValue = 0;
    } else {
      animationConfig.toValue = 1;
    }
    toValue.current = animationConfig.toValue;
    Animated.spring(animatedValue.current, animationConfig).start();
  };

  if (toggle) {
    toggle(_toggle);
  }

  const _renderItem = (obj: ThumbnailItemIndex) => {
    const {item, index} = obj;
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
        }}>
        <Image
          {...imageProps}
          style={[{borderColor: color}, imageProps.style]}
          source={item.imageSrc}
        />
        {caption && (
          <Text {...textProps} style={[{color}, textProps.style]}>
            {caption}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const _onLayout = ({nativeEvent = {layout: {height: 0}}}) => {
    const {height} = nativeEvent.layout;
    if (animViewHeight !== height) {
      setAnimViewHeight(height);
    }
  };

  const _getAnimViewStyle = () => {
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
  };

  return (
    <Animated.View style={_getAnimViewStyle()} onLayout={_onLayout}>
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
