import React, {useRef, useState} from 'react';
import {StyleSheet, Switch, Image, Text, View} from 'react-native';
import {thumbnails, imageSize} from './constants';
import ThumbnailSelector from './src/ThumbnailSelector';

const App = () => {
  const [selected, setSelected] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const thumbnail = thumbnails[selected];
  let thumbnailSelectorRef = useRef(null);

  const _onValueChange = value => {
    if (value) {
      thumbnailSelectorRef.current.show();
    } else {
      thumbnailSelectorRef.current.hide();
    }
    setIsVisible(value);
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={{uri: thumbnail.image}}
        />
        <Text style={styles.text}>{`Caption: ${thumbnail.caption}`}</Text>
        <Text style={styles.text}>{`Image: ${thumbnail.image}`}</Text>
      </View>
      <Switch value={isVisible} onValueChange={_onValueChange} />
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
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#202020',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  image: {
    width: imageSize,
    height: imageSize,
    alignSelf: 'center',
  },
});

export default App;
