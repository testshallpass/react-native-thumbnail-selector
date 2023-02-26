import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import ThumbnailSelector from './src/ThumbnailSelector';

function getPlaceholderImage(): string {
  const low = 1;
  const high = 99;
  const random = Math.floor(Math.random() * (high - low) + low);
  if (random % 2 === 0) {
    return 'https://reactjs.org/logo-og.png';
  }
  return `https://randomuser.me/api/portraits/women/${random}.jpg`;
}

function generateThumbnails() {
  return ['David', 'Brian', 'Gene', 'Jose', 'Jon', 'Craig', 'Sean'].map(
    caption => {
      const image = getPlaceholderImage();
      return {caption, image};
    },
  );
}

const thumbnails = generateThumbnails();

function App(): JSX.Element {
  let selected = 0;
  let thumbnailSelectorRef = useRef({animate: () => {}});

  const {height, width} = useWindowDimensions();
  const [thumbnail, setThumbnail] = useState(thumbnails[selected]);
  const [isOpen, setIsOpen] = useState(false);

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
              <Text style={styles.text}>{isOpen ? 'close' : 'open'}</Text>
            </Pressable>
            <View>
              <Text style={styles.text}>{`Caption: ${thumbnail.caption}`}</Text>
              <Text style={styles.text}>{`Image: ${thumbnail.image}`}</Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
      <ThumbnailSelector
        thumbnailSelectorRef={ref => (thumbnailSelectorRef.current = ref)}
        thumbnails={thumbnails}
        initialIndex={selected}
        onThumbnailSelect={item => setThumbnail(item)}
        active={{opacity: 1, borderColor: 'white'}}
        captionProps={{style: {color: 'white', textAlign: 'center'}}}
      />
    </View>
  );
}

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
