import React, {useRef, useState, forwardRef, useImperativeHandle} from 'react';
import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  View,
  useWindowDimensions,
} from 'react-native';

const Label = ({style = {}, text = '', selected = false}) => {
  let fontWeight = 'normal';
  if (selected && style.fontWeight) {
    fontWeight = style.fontWeight;
  }
  return <Text style={[style, {fontWeight}]}>{text}</Text>;
};

const ImageView = ({uri = '', style = {}, borderColor = 'transparent'}) => {
  return (
    <Image
      style={[style, {borderColor}]}
      source={{uri}}
      resizeMode={'contain'}
    />
  );
};

const Thumbnail = ({
  item = {image: '', caption: ''},
  index = 0,
  selected = false,
  thumbnailStyle = {flexDirection: 'column', margin: 8, alignItems: 'center'},
  captionStyle = {fontSize: 16, textAlign: 'center', fontWeight: 'bold'},
  imageStyle = {width: 125, height: 125, borderWidth: 2},
  activeOpacity = 1,
  inactiveOpacity = 0.5,
  activeBorderColor = 'black',
  inactiveBorderColor = 'transparent',
  onPress = () => {},
}) => {
  const opacity = selected ? activeOpacity : inactiveOpacity;
  const borderColor = selected ? activeBorderColor : inactiveBorderColor;
  return (
    <TouchableOpacity onPress={() => onPress({item, index})}>
      <View style={[thumbnailStyle, {opacity}]}>
        {item.image && (
          <ImageView
            uri={item.image}
            style={imageStyle}
            borderColor={borderColor}
          />
        )}
        {item.caption && (
          <Label text={item.caption} style={captionStyle} selected={selected} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const ThumbnailSelector = (props, ref) => {
  const {
    containerStyle = {
      elevation: 1,
      zIndex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    thumbnailStyle = {flexDirection: 'column', margin: 8, alignItems: 'center'},
    imageStyle = {width: 125, height: 125, borderWidth: 2},
    captionStyle = {fontSize: 16, textAlign: 'center', fontWeight: 'bold'},
    thumbnails = [],
    animationDuration = 600,
    onSelect = () => {},
    activeOpacity = 1,
    inactiveOpacity = 0.5,
    activeBorderColor = 'black',
    inactiveBorderColor = 'transparent',
    selectedIndex = -1,
    viewHeight = 0,
    horizontal = true,
  } = props;
  const [animViewHeight, setViewHeight] = useState(viewHeight);
  const [itemIndex, setItemIndex] = useState(selectedIndex);
  const animationValue = useRef(new Animated.Value(0)).current;
  const windowHeight = useWindowDimensions().height;

  const animate = (toValue, onComplete = () => {}) => {
    Animated.spring(animationValue, {
      toValue,
      duration: animationDuration,
      friction: 9,
      useNativeDriver: true,
    }).start(onComplete);
  };

  useImperativeHandle(ref, () => ({
    show: () => animate(1),
    hide: () => animate(0),
  }));

  const getAnimViewStyle = () => {
    const start = windowHeight;
    const end = windowHeight - animViewHeight;
    return [
      containerStyle,
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

  const renderItem = ({item, index}) => {
    const isSelected = itemIndex === index;
    return (
      <Thumbnail
        item={item}
        index={index}
        selected={isSelected}
        thumbnailStyle={thumbnailStyle}
        imageStyle={imageStyle}
        captionStyle={captionStyle}
        activeOpacity={activeOpacity}
        inactiveOpacity={inactiveOpacity}
        activeBorderColor={activeBorderColor}
        inactiveBorderColor={inactiveBorderColor}
        onPress={() => {
          setItemIndex(index);
          onSelect({item, index});
        }}
      />
    );
  };

  const _onLayout = (event) => {
    const {height} = event.nativeEvent.layout;
    if (animViewHeight !== height) {
      setViewHeight(height);
    }
  };

  const viewStyle = getAnimViewStyle();

  return (
    <Animated.View style={viewStyle} onLayout={_onLayout}>
      <FlatList
        ref={ref}
        data={thumbnails}
        initialNumToRender={thumbnails.length}
        extraData={thumbnails}
        horizontal={horizontal}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
        {...props}
      />
    </Animated.View>
  );
};

export default forwardRef(ThumbnailSelector);
