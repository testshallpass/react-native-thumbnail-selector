import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  Image,
  TouchableHighlight,
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
    zIndex: 0,
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
      isVisible: props.visible,
      startDelta: WINDOW.height + 155,
      endDelta: 0,
      duration: 600,
    };
    this.showSelector = this.showSelector.bind(this);
    this.hideSelector = this.hideSelector.bind(this);
    this.animateToValue = this.animateToValue.bind(this);
    this.timeOutForisVisible = this.timeOutForisVisible.bind(this);
  }
  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.items),
      items: this.props.items
    });
  }
  showSelector() {
    if (this.props.visible == true) {
      this.hideSelector();
      return;
    }
    this.animateToValue(1);
  }
  hideSelector() {
    this.timeOutForisVisible(false);
    this.animateToValue(0);
  }
  animateToValue(toValue) {
    Animated.timing(this.state.fadeAnim, {
      toValue: toValue,
      duration: this.state.duration,
    }).start();
  }
  timeOutForisVisible(isVisible) {
    timeOutId = setTimeout(
      function() {
        this.setState({
          isVisible: isVisible,
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
  rowAction(rowData, sectionID, rowID) {
    var items = this.state.items;
    items[rowID].selected = true;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.selected && i != rowID) {
        item.selected = false;
      }
    }
    this.setState({
      items: items,
    });
    if (this.props.onSelectedData) {
      this.props.onSelectedData(items[rowID]);
    }
    if (this.props.closeOnSelect == true) {
      setTimeout(
        function() {
          this.hideSelector();
        }.bind(this),
        this.props.closeOnSelectInterval,
      );
    }
  }
  renderRow(rowData, sectionID, rowID) {
    if (rowData.imageUri.length === 0) {
      console.warn('QuickSelector: imageUri is missing at index: ' + rowID);
    }
    return (
      <TouchableHighlight
        underlayColor="darkgray"
        onPress={() => this.rowAction(rowData, sectionID, rowID)}
      >
        <View
          style={[
            styles.column,
            {opacity: rowData.selected ? 1 : this.props.opacity},
          ]}
        >
          <Image
            style={{
              borderColor: rowData.selected
                ? rowData.borderColor
                : 'transparent',
              width: this.props.imageWidth,
              height: this.props.imageHeight,
              borderRadius: this.props.imageBorderRadius,
              borderWidth: this.props.imageBorderWidth,
            }}
            source={{uri: rowData.imageUri}}
          />
          <Text
            style={{
              color: this.props.textColor,
              fontSize: this.props.fontSize,
              fontFamily: this.props.fontFamily,
              fontWeight: rowData.selected ? 'bold' : 'normal',
              maxWidth: this.props.imageWidth,
              textAlign: 'center',
            }}
            numberOfLines={this.props.numberOfLines}
          >
            {rowData.title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    if (this.state.isVisible) {
      const {startDelta, endDelta, fadeAnim, dataSource, items} = this.state
      const {zIndex, backgroundColor} = this.props
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
            left: 0,
            right: 0,
          }}
        >
          <ListView
            onLayout={(event) => this.onLayoutEvent(event)}
            style={{backgroundColor: backgroundColor}}
            horizontal={true}
            dataSource={dataSource}
            renderRow={() => this.renderRow(rowData, sectionID, rowID)}
            initialListSize={items.length}
            pageSize={items.length}
          />
        </Animated.View>
      );
    }
    return null;
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
