import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
  View,
} from 'react-native';
const {height, width} = Dimensions.get('window');
const WINDOW = Dimensions.get('window');
var timeOutId;

export default class ThumbnailSelector extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    opacity: PropTypes.number,
    fontSize: PropTypes.number,
    textColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontFamily: PropTypes.string,
    imageHeight: PropTypes.number,
    imageWidth: PropTypes.number,
    imageBorderWidth: PropTypes.number,
    imageBorderRadius: PropTypes.number,
    onSelectedData: PropTypes.func,
    closeOnSelect: PropTypes.bool,
    zIndex: PropTypes.number,
    closeOnSelectInterval: PropTypes.number,
    numberOfLines: PropTypes.number,
    visible: PropTypes.bool,
  };
  static defaultProps = {
    items: null,
    fontSize: 16,
    textColor: 'white',
    opacity: 0.8,
    backgroundColor: 'dimgray',
    fontFamily: 'Avenir',
    imageHeight: 125,
    imageWidth: 125,
    imageBorderWidth: 2,
    imageBorderRadius: 2,
    onSelectedData: null,
    closeOnSelect: true,
    zIndex: 1000,
    closeOnSelectInterval: 200,
    numberOfLines: 2,
    visible: true,
  };
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      items: props.items,
      visible: false,
      startDelta: WINDOW.height + 155,
      endDelta: 0,
      duration: 600,
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.animateToValue = this.animateToValue.bind(this);
    this.timeOutForisVisible = this.timeOutForisVisible.bind(this);
  }
  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.items),
      items: this.props.items,
    });
  }
  componentDidMount() {
    const {visible} = this.props
    if (visible) {
      this.show()
    }
  }
  componentWillReceiveProps(nextProps) {
    const {visible} = this.props
    if (nextProps.visible !== visible) {
      if (nextProps.visible) {
        this.show()
      } else {
        this.hide()
      }
    }
  }
  show() {
    this.animateToValue(1);
  }
  hide() {
    this.timeOutForisVisible(false);
    this.animateToValue(0);
  }
  animateToValue(toValue) {
    Animated.timing(this.state.fadeAnim, {
      toValue: toValue,
      duration: this.state.duration,
    }).start();
  }
  timeOutForisVisible(visible) {
    timeOutId = setTimeout(
      function() {
        this.setState({
          visible: visible,
        });
      }.bind(this),
      this.state.duration,
    );
  }
  onLayoutEvent(event) {
    const {x, y, width, height} = event.nativeEvent.layout;
    this.setState({
      startDelta: WINDOW.height + height,
      endDelta: 0,
    });
  }
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
  renderItem = item => {
    const index = item.index;
    item = item.item;
    return (
      <TouchableOpacity onPress={() => this.itemAction(item, index)}>
        <View
          style={[
            styles.column,
            {opacity: item.selected ? 1 : this.props.opacity},
          ]}
        >
          <Image
            style={{
              borderColor: item.selected ? item.borderColor : 'transparent',
              width: this.props.imageWidth,
              height: this.props.imageHeight,
              borderRadius: this.props.imageBorderRadius,
              borderWidth: this.props.imageBorderWidth,
            }}
            source={{uri: item.imageUri}}
          />
          <Text
            style={{
              color: this.props.textColor,
              fontSize: this.props.fontSize,
              fontFamily: this.props.fontFamily,
              fontWeight: item.selected ? 'bold' : 'normal',
              maxWidth: this.props.imageWidth,
              textAlign: 'center',
            }}
            numberOfLines={this.props.numberOfLines}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {
      startDelta,
      endDelta,
      fadeAnim,
      dataSource,
      items,
    } = this.state;
    const {zIndex, backgroundColor} = this.props;
    return (
      <Animated.View
        style={{
          zIndex: zIndex,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [startDelta, endDelta],
              }),
            },
          ],
          position: 'absolute',
          bottom: 0,
        }}
      >
        <FlatList
          ref={ref => this.flatList = ref}
          style={{backgroundColor: backgroundColor, flex: 1}}
          data={items}
          horizontal={true}
          renderItem={this.renderItem}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    alignItems: 'center',
  },
});
