import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import {ITEMS, IMAGE_SIZE} from './constants';
import ThumbnailSelector from 'react-native-thumbnail-selector';

const Label = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const Button = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Label text={props.text} />
    </TouchableOpacity>
  );
};

const Item = (props) => {
  return (
    <View>
      <Image
        style={styles.image}
        resizeMode={'contain'}
        source={{uri: props.uri}}
      />
      <Label text={props.text} />
    </View>
  );
};

const App = () => {
  const [selected, setSelected] = useState(ITEMS[0]);
  const {id, image, caption} = selected;
  const text = `${caption} #${id}`;
  let thumbnailSelectorRef;
  return (
    <View style={styles.container}>
      <Item uri={image} text={text} />
      <Button
        text={'Show'}
        onPress={() => thumbnailSelectorRef.show()}
      />
      <Button
        text={'Hide'}
        onPress={() => thumbnailSelectorRef.hide()}
      />
      <ThumbnailSelector
        ref={(ref) => (thumbnailSelectorRef = ref)}
        selectedIndex={id}
        thumbnails={ITEMS}
        onSelect={(item) => setSelected(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EEEF',
    justifyContent: 'center',
  },
  text: {
    color: '#202020',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    margin: 8,
    alignSelf: 'center',
  },
  button: {
    margin: 8,
    padding: 8,
    borderColor: '#202020',
    borderRadius: 3,
    borderWidth: 1,
    alignContent: 'center',
  },
});

export default App;
