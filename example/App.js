import React, {useRef, useState} from 'react';
import {StyleSheet, Pressable, Image, Text, View} from 'react-native';
import {thumbnails, imageSize} from './constants';
import ThumbnailSelector from './src/ThumbnailSelector';

const Label = ({text = ''}) => {
  return <Text style={styles.text}>{text}</Text>;
};

const Button = ({text = '', onPress = () => {}}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Label text={text} />
    </Pressable>
  );
};

const Thumbnail = ({thumbnail = {caption: '', image: ''}}) => {
  return (
    <View>
      <Image
        style={styles.image}
        resizeMode={'contain'}
        source={{uri: thumbnail.image}}
      />
      <Label text={thumbnail.caption} />
      <Label text={thumbnail.image} />
    </View>
  );
};

const App = () => {
  const [selected, setSelected] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const thumbnail = thumbnails[selected];
  let thumbnailSelectorRef = useRef(null);

  const _onPress = () => {
    if (isVisible) {
      thumbnailSelectorRef.current.hide();
      setIsVisible(false);
    } else {
      thumbnailSelectorRef.current.show();
      setIsVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Thumbnail thumbnail={thumbnail} />
      <Button text={isVisible ? 'Hide' : 'Show'} onPress={_onPress} />
      <ThumbnailSelector
        ref={thumbnailSelectorRef}
        thumbnails={thumbnails}
        selectedIndex={selected}
        onSelect={({item, index}) => setSelected(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
    justifyContent: 'center',
  },
  text: {
    color: '#202020',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: imageSize,
    height: imageSize,
    margin: 8,
    alignSelf: 'center',
  },
  button: {
    margin: 8,
    padding: 8,
    borderColor: '#202020',
    borderRadius: 2,
    borderWidth: 1,
    alignContent: 'center',
  },
});

export default App;
