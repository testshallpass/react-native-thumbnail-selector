import React, {useRef, useState} from 'react';
import {StyleSheet, Switch, Image, Text, View} from 'react-native';
import ThumbnailSelector from 'react-native-thumbnail-selector';

const App = () => {
  const _getPlaceholderImage = (category = '') => {
    const placeholderPrefix = `https://placeimg.com/${imageSize}/${imageSize}`;
    const categories = ['animals', 'arch', 'nature', 'people', 'tech', 'any'];
    if (categories.includes(category)) {
      return `${placeholderPrefix}/${category}`;
    }
    return `${placeholderPrefix}/any`;
  };

  const reactNativeLogo = 'https://reactjs.org/logo-og.png';
  const imageSize = 125;
  const thumbnails = [
    {
      caption: 'David',
      image: _getPlaceholderImage('tech'),
    },
    {
      caption: 'Brian',
      image: reactNativeLogo,
    },
    {
      caption: 'Gene',
      image: _getPlaceholderImage('arch'),
    },
    {
      caption: 'Jose',
      image: reactNativeLogo,
    },
    {
      caption: 'Jon',
      image: _getPlaceholderImage('animals'),
    },
    {
      caption: 'Craig',
      image: reactNativeLogo,
    },
    {
      caption: 'Sean',
      image: _getPlaceholderImage('people'),
    },
  ];
  let selected = 0;
  const [thumbnail, setThumbnail] = useState(thumbnails[selected]);
  const [isOpen, setIsOpen] = useState(false);
  let thumbnailSelectorRef = useRef();

  const _onValueChange = value => {
    thumbnailSelectorRef.current.animate();
    setIsOpen(value);
  };

  if (thumbnail) {
    selected = thumbnails.indexOf(thumbnail);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: thumbnail.image}} />
      <Switch value={isOpen} onValueChange={_onValueChange} />
      <Text style={styles.text}>{`Caption is ${thumbnail.caption}`}</Text>
      <Text style={styles.text}>{`Image is ${thumbnail.image}`}</Text>
      <View style={styles.switch}>
        <Text style={styles.text}>{`ThumbnailSelector is ${
          isOpen ? 'open' : 'closed'
        }`}</Text>
      </View>
      <ThumbnailSelector
        thumbnailSelectorRef={ref => {
          thumbnailSelectorRef.current = ref;
        }}
        thumbnails={thumbnails}
        initialIndex={selected}
        onThumbnailSelect={({item}) => setThumbnail(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 8,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    padding: 4,
  },
  image: {
    width: 125,
    height: 125,
    alignSelf: 'center',
  },
});

export default App;
