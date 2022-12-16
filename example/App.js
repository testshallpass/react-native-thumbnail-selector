import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  View,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import ThumbnailSelector from 'react-native-thumbnail-selector';

const getPlaceholderImage = () => {
  const low = 1;
  const high = 99;
  const random = Math.floor(Math.random() * (high - low) + low);
  if (random % 2 === 0) {
    return 'https://reactjs.org/logo-og.png';
  }
  return `https://randomuser.me/api/portraits/women/${random}.jpg`;
};
const generateThumbnails = () => {
  return ['David', 'Brian', 'Gene', 'Jose', 'Jon', 'Craig', 'Sean'].map(
    caption => {
      const image = getPlaceholderImage();
      return {caption, image};
    },
  );
};
const thumbnails = generateThumbnails();

const App = () => {
  const {height, width} = useWindowDimensions();
  let selected = 0;
  const [thumbnail, setThumbnail] = useState(thumbnails[selected]);
  const [isOpen, setIsOpen] = useState(false);
  let thumbnailSelectorRef = useRef();

  const _onPress = () => {
    thumbnailSelectorRef.current.animate();
    setIsOpen(!isOpen);
  };

  if (thumbnail) {
    selected = thumbnails.indexOf(thumbnail);
  }

  return (
    <View>
      <SafeAreaView>
        <ImageBackground
          style={[styles.imageBackground, {width, height}]}
          source={{uri: thumbnail.image}}
          resizeMode={'contain'}>
          <View style={styles.row}>
            <Pressable style={styles.button} onPress={_onPress}>
              <Text style={styles.text}>{isOpen ? 'open' : 'close'}</Text>
            </Pressable>
            <View>
              <Text style={styles.text}>{`Caption: ${thumbnail.caption}`}</Text>
              <Text style={styles.text}>{`Image: ${thumbnail.image}`}</Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
      <ThumbnailSelector
        thumbnailSelectorRef={obj => {
          thumbnailSelectorRef.current = obj;
        }}
        thumbnails={thumbnails}
        initialIndex={selected}
        onThumbnailSelect={({item}) => setThumbnail(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: 'flex-start',
    backgroundColor: '#1F1F1F',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    backgroundColor: '#1F1F1F',
  },
  button: {
    borderColor: '#3AD4F8',
    borderWidth: 1,
    borderRadius: 3,
    margin: 8,
    padding: 8,
  },
});

export default App;
