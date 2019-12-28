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
const WINDOW = Dimensions.get('window');
const HEIGHT = WINDOW.height;

export default class ThumbnailSelector extends Component {
  static propTypes = {
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
  };
  static defaultProps = {
    containerStyle: {
      backgroundColor: 'gray'
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
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    animationDuration: 600,
    onSelect: () => {},
    activeOpacity: 1,
    inactiveOpacity: 0.5,
    activeBorderColor: 'white',
    inactiveBorderColor: 'transparent',
  };
  constructor(props) {
    super(props);
    this.state = {
      animationValue: new Animated.Value(0),
      thumbnails: [],
      selectedIndex: -1,
      startDelta: HEIGHT,
      endDelta: 0,
    };
  }
  show = (thumbnails = []) => {
    if (Array.isArray(thumbnails) && thumbnails.length > 0) {
      this.setState({ thumbnails });
      this._animate(1);
    }
  };
  hide = () => { 
    this._animate(0, () => {
      this.setState({ 
        thumbnails: [], 
        selectedIndex: -1,
      });
    });
  };
  _animate = (toValue, onComplete = () => {}) => {
    Animated.timing(this.state.animationValue, {
      toValue,
      duration: this.props.animationDuration,
      friction: 9,
    }).start(onComplete);
  };
  _onLayout = event => {
    const { height } = event.nativeEvent.layout;
    if (height != this.state.startDelta) {
      this.setState({ startDelta: HEIGHT + height });
    }
  };
  _onSelect = (item, index) => {
    this.setState({ selectedIndex: index });
    this.props.onSelect(item);
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
  render() {
    const { startDelta, endDelta, animationValue, thumbnails } = this.state;
    const { containerStyle } = this.props;
    const wrapperStyle = [
      containerStyle,
      {
        transform: [
          {
            translateY: animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [startDelta, endDelta],
            }),
          },
        ],
        elevation: 1,
      },
    ];
    return (
      <Animated.View
        onLayout={this._onLayout}
        style={wrapperStyle}>
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
