import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  View,
} from 'react-native';

export default class ThumbnailSelector extends Component {
  static propTypes = {
    thumbnails: PropTypes.array,
    containerStyle: PropTypes.object,
    thumbnailStyle: PropTypes.object,
    imageStyle: PropTypes.object,
    captionStyle: PropTypes.object,
    animationDuration: PropTypes.number,
    onSelect: PropTypes.func,
    activeOpacity: PropTypes.number,
    inactiveOpacity: PropTypes.number,
    activeBorderColor: PropTypes.string,
    inactiveBorderColor: PropTypes.string,
    selectedIndex: PropTypes.number,
    viewHeight: PropTypes.number,
  };
  static defaultProps = {
    thumbnails: [],
    containerStyle: {
      elevation: 1,
      zIndex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    thumbnailStyle: {
      flexDirection: 'column',
      margin: 8,
      alignItems: 'center',
    },
    imageStyle: {
      width: 125,
      height: 125,
      borderWidth: 2,
    },
    captionStyle: {
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    animationDuration: 600,
    onSelect: () => {},
    activeOpacity: 1,
    inactiveOpacity: 0.5,
    activeBorderColor: 'black',
    inactiveBorderColor: 'transparent',
    selectedIndex: -1,
    viewHeight: 0,
  };
  constructor(props) {
    super(props);
    this.state = {
      animationValue: new Animated.Value(0),
      selectedIndex: props.selectedIndex,
      height: props.viewHeight,
    };
  }
  show = () => {
    this._animate(1);
  };
  hide = () => { 
    this._animate(0);
  };
  _animate = (toValue, onComplete = () => {}) => {
    Animated.spring(this.state.animationValue, {
      toValue,
      duration: this.props.animationDuration,
      friction: 9,
    }).start(onComplete);
  };
  _onLayout = event => {
    const { height } = event.nativeEvent.layout;
    const stateHeight = this.state.height;
    if (stateHeight != height) {
      this.setState({ height });
    }
  };
  _onSelect = (item, index) => {
    if (index != this.state.selectedIndex) {
      this.setState({ selectedIndex: index });
      this.props.onSelect(item, index);
    }
  };
  _renderItem = ({ item, index }) => {
    const { selectedIndex } = this.state;
    const { thumbnailStyle, captionStyle, imageStyle, activeOpacity, inactiveOpacity, activeBorderColor, inactiveBorderColor } = this.props;
    const selected = selectedIndex == index;
    const opacity = selected ? activeOpacity : inactiveOpacity;
    const borderColor = selected ? activeBorderColor : inactiveBorderColor;
    const { image, caption } = item;
    return (
      <TouchableOpacity onPress={() => this._onSelect(item, index)}>
        <View
          style={[thumbnailStyle, { opacity }]}
        >
          {image && this._renderImage(image, imageStyle, borderColor)}
          {caption && this._renderText(caption, captionStyle, selected)}
        </View>
      </TouchableOpacity>
    );
  };
  _renderImage = (uri, style, borderColor) => {
    return (
      <Image
        style={[ style, { borderColor } ]}
        source={{ uri }}
        resizeMode={'contain'}
      />
    );
  };
  _renderText = (text, style, selected) => {
    let fontWeight = 'normal';
    if (selected && style.fontWeight) {
      fontWeight = style.fontWeight;
    }
    return (
      <Text style={ [style, { fontWeight }] }>
        {text}
      </Text>
    );
  };
  _getOutputRange = height => {
    const WINDOW = Dimensions.get('window');
    const HEIGHT = WINDOW.height;
    const start = HEIGHT;
    const end = HEIGHT - height;
    return [start, end];
  };
  _getAnimViewStyle = (containerStyle, animValue, height) => {
    return [
      containerStyle,
      {
        transform: [
          {
            translateY: animValue.interpolate({
              inputRange: [0, 1],
              outputRange: this._getOutputRange(height),
            }),
          },
        ],
      },
    ];
  };
  render() {
    const { height, animationValue } = this.state;
    const { containerStyle, thumbnails } = this.props;
    return (
      <Animated.View
        onLayout={this._onLayout}
        style={this._getAnimViewStyle(containerStyle, animationValue, height)}>
        <FlatList
          ref={ref => this.flatList = ref}
          data={thumbnails}
          extraData={this.state}
          horizontal={true}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => `${index}`}
          {...this.props}
        />
      </Animated.View>
    );
  }
}
