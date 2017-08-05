import React, {Component} from 'react';
import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  ViewPropTypes,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
const {height, width} = Dimensions.get('window');
const WINDOW = Dimensions.get('window');

export default class ThumbnailSelector extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    opacity: PropTypes.number,
    backgroundColor: PropTypes.string,
    onSelectedData: PropTypes.func,
    closeOnSelect: PropTypes.bool,
    zIndex: PropTypes.number,
    closeOnSelectInterval: PropTypes.number,
    numberOfLines: PropTypes.number,
    visible: PropTypes.bool,
    captionTextStyle: Text.propTypes.style,
    thumbnailImageStyle: Image.propTypes.style,
    flatlistProps: PropTypes.func,
    containerStyle: ViewPropTypes.style,
    itemContainerStyle: ViewPropTypes.style,
    loadMore: PropTypes.func,
  };
  static defaultProps = {
    items: null,
    opacity: 0.8,
    backgroundColor: 'dimgray',
    onSelectedData: null,
    closeOnSelect: true,
    zIndex: 1000,
    closeOnSelectInterval: 200,
    numberOfLines: 2,
    visible: false,
    loadMore: null,
    containerStyle: {
      position: 'absolute',
      bottom: 0,
    },
    itemContainerStyle: {
      flexDirection: 'column',
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
      alignItems: 'center',
    },
    captionTextStyle: {
      color: 'white',
      fontFamily: 'Avenir',
      fontSize: 16,
      textAlign: 'center',
    },
    thumbnailImageStyle: {
      width: 125,
      height: 125,
      borderWidth: 2,
      borderRadius: 2,
      borderColor: 'white',
    },
    flatlistProps: null,
  };
  constructor(props) {
    super(props);
    if (props.items && props.items.length === 0) {
      console.warn('ThumbnailSelector Items prop: Requires least one item.');
    }
    this.state = {
      fadeAnim: new Animated.Value(0),
      items: props.items,
      visible: false,
      startDelta: WINDOW.height + 155,
      endDelta: 0,
      duration: 600,
    };
  }
  componentDidMount() {
    const {visible} = this.props;
    if (visible) {
      this.show();
    }
  }
  componentWillReceiveProps(nextProps) {
    const {visible, items} = this.props;
    if (nextProps.visible !== visible) {
      if (nextProps.visible) {
        this.show();
      } else {
        this.hide();
      }
    }
    if (nextProps.items.length > items.length) {
      this.setState({
        items: nextProps.items,
      });
    }
  }
  show = () => {
    this.animateToValue(1);
    this.scrollToSelected();
  };
  hide = () => {
    this.timeOutForisVisible(false);
    this.animateToValue(0);
  };
  animateToValue = toValue => {
    Animated.timing(this.state.fadeAnim, {
      toValue: toValue,
      duration: this.state.duration,
      friction: 7,
    }).start();
  };
  timeOutForisVisible = visible => {
    setTimeout(
      function() {
        this.setState({
          visible: visible,
        });
      }.bind(this),
      this.state.duration,
    );
  };
  scrollToSelected = () => {
    var index = 0;
    const {items} = this.state;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.selected) {
        index = i;
        break;
      }
    }
    if (index > 0) {
      this.flatList.scrollToIndex({index: index});
    }
  };
  onLayoutEvent = event => {
    const {x, y, width, height} = event.nativeEvent.layout;
    this.setState({
      startDelta: WINDOW.height + height,
      endDelta: 0,
    });
  };
  itemAction = (item, index) => {
    var items = this.state.items;
    for (const value of items) {
      value.selected = false;
    }
    item.selected = true;
    this.setState({
      items: items,
    });
    if (this.props.onSelectedItem) {
      this.props.onSelectedItem(item);
    }
    if (this.props.closeOnSelect == true) {
      setTimeout(
        function() {
          this.hide();
        }.bind(this),
        this.props.closeOnSelectInterval,
      );
    }
  };
  onEndReached = () => {
    const {flatlistProps, loadMore} = this.props;
    if (flatlistProps) {
      if (flatlistProps.onEndReached) {
        flatlistProps.onEndReached();
      }
      return;
    }
    if (loadMore) {
      loadMore();
    }
  };
  renderItem = ({item, index}) => {
    const {
      itemContainerStyle,
      captionTextStyle,
      thumbnailImageStyle,
      numberOfLines,
      opacity,
    } = this.props;
    return (
      <TouchableOpacity onPress={() => this.itemAction(item, index)}>
        <View
          style={[itemContainerStyle, {opacity: item.selected ? 1 : opacity}]}
        >
          {this.renderImage(item.imageUri, thumbnailImageStyle, item.selected)}
          {this.renderText(
            item.title,
            captionTextStyle,
            numberOfLines,
            item.selected,
          )}
        </View>
      </TouchableOpacity>
    );
  };
  renderImage(imageUri, style, selected) {
    return (
      <Image
        style={[
          style,
          {borderColor: selected ? style.borderColor : 'transparent'},
        ]}
        source={{uri: imageUri}}
      />
    );
  }
  renderText(text, style, numberOfLines, selected) {
    return (
      <Text
        style={[style, {fontWeight: selected ? 'bold' : 'normal'}]}
        numberOfLines={numberOfLines}
      >
        {text}
      </Text>
    );
  }
  render() {
    const {startDelta, endDelta, fadeAnim, dataSource, items} = this.state;
    const {zIndex, backgroundColor, flatlistProps, containerStyle} = this.props;
    return (
      <Animated.View
        style={[
          containerStyle,
          {
            zIndex: zIndex,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [startDelta, endDelta],
                }),
              },
            ],
          },
        ]}
      >
        <FlatList
          ref={ref => this.flatList = ref}
          style={{backgroundColor: backgroundColor, flex: 1}}
          data={items}
          horizontal={true}
          renderItem={this.renderItem}
          onEndReached={this.onEndReached}
          keyExtractor={item => item.key}
          {...flatlistProps}
        />
      </Animated.View>
    );
  }
}
