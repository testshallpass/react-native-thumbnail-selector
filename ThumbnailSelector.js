import React, {useRef, useState, forwardRef, useImperativeHandle} from 'react';
import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from 'react-native';

const ThumbnailSelector = (
  {
    thumbnails = [],
    renderThumbnail = undefined,
    onThumbnailSelect = () => {},
    initialIndex = -1,
    horizontal = true,
    active = {
      opacity: 1,
      borderColor: 'black',
    },
    inactive = {
      opacity: 0.5,
      borderColor: 'transparent',
    },
    thumbnailProps = {
      style: {
        width: 125,
        height: 125,
        borderWidth: 2,
      },
    },
    captionProps = {
      style: {fontSize: 16, textAlign: 'center'},
    },
    buttonProps = {
      style: {flexDirection: 'column', padding: 8},
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
      duration: 600,
      friction: 9,
      useNativeDriver: true,
    },
  },
  ref,
) => {
  const [animViewHeight, setAnimViewHeight] = useState(0);
  const [itemIndex, setItemIndex] = useState(initialIndex);
  const animationValue = useRef(new Animated.Value(0)).current;
  const windowHeight = useWindowDimensions().height;
  let toValue = useRef(animationConfig.toValue);

  const _animate = (onComplete = () => {}) => {
    if (toValue.current) {
      animationConfig.toValue = 0;
    } else {
      animationConfig.toValue = 1;
    }
    toValue.current = animationConfig.toValue;
    Animated.spring(animationValue, animationConfig).start(onComplete);
  };

  useImperativeHandle(ref, () => ({animate: () => _animate()}));

  const _renderItem = ({item, index}) => {
    if (renderThumbnail) {
      return renderThumbnail({item, index, onThumbnailSelect});
    }
    const selected = itemIndex === index;
    const styles = selected ? active : inactive;
    if (thumbnailProps.style) {
      thumbnailProps.style = {...thumbnailProps.style, ...styles};
    } else {
      thumbnailProps.style = {...styles};
    }
    return (
      <TouchableOpacity
        {...buttonProps}
        onPress={() => {
          setItemIndex(index);
          onThumbnailSelect({item, index});
        }}>
        {item.image && <Image {...thumbnailProps} source={{uri: item.image}} />}
        {item.caption && <Text {...captionProps}>{item.caption}</Text>}
      </TouchableOpacity>
    );
  };

  const _onLayout = event => {
    const {height} = event.nativeEvent.layout;
    if (animViewHeight !== height) {
      setAnimViewHeight(height);
    }
  };

  const _getAnimViewStyle = () => {
    const start = windowHeight;
    const end = windowHeight - animViewHeight;
    return [
      animatedViewStyle,
      {
        transform: [
          {
            translateY: animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [start, end],
            }),
          },
        ],
      },
    ];
  };

  const viewStyle = _getAnimViewStyle();

  return (
    <Animated.View style={viewStyle} onLayout={_onLayout}>
      <FlatList
        ref={ref}
        data={thumbnails}
        initialNumToRender={thumbnails.length}
        extraData={itemIndex}
        horizontal={horizontal}
        renderItem={_renderItem}
        keyExtractor={(item, index) => `${index}`}
      />
    </Animated.View>
  );
};

export default forwardRef(ThumbnailSelector);
