import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Switch,
  View,
  FlatList,
  Image,
} from 'react-native';
import ThumbnailSelector, {
  ThumbnailItem,
} from 'react-native-thumbnail-selector';

const captions = [
  'David',
  'Brian',
  'Gene',
  'Jose',
  'Jon',
  'Craig',
  'Sean',
  'Anim cillum voluptate mollit esse reprehenderit anim enim elit veniam duis cupidatat irure.',
  'Enim incididunt',
  undefined,
  '',
];

function getRandomRemoteImageSrc(): object {
  const low = 1;
  const high = 99;
  const random = Math.floor(Math.random() * (high - low) + low);
  if (random % 2 === 0) {
    return {uri: 'https://reactnative.dev/img/tiny_logo.png'};
  }
  return {uri: `https://randomuser.me/api/portraits/women/${random}.jpg`};
}

const locals = [
  {caption: 'Cleveland Guardians', imageSrc: require('./assets/cg.png')},
  {caption: 'Milwaukee Brewers', imageSrc: require('./assets/mb.png')},
  {caption: 'New York Mets', imageSrc: require('./assets/nym.png')},
  {caption: 'New York Yankees', imageSrc: require('./assets/nyy.png')},
  {caption: "Oakland A's", imageSrc: require('./assets/oa.png')},
  {caption: 'San Diego Padres', imageSrc: require('./assets/sdp.png')},
];

function getThumbnails(): ThumbnailItem[] {
  const remotes = captions.map(caption => {
    return {caption, imageSrc: getRandomRemoteImageSrc()};
  });
  return remotes.concat(locals);
}

const thumbnails = getThumbnails();

type Detail = {
  item: {
    key: string;
    value: string | undefined;
  };
  index: number;
};

function App(): React.JSX.Element {
  const initialIndex = 0;
  const [thumbnailIndex, setThumbnailIndex] = useState(initialIndex);
  const [thumbnail, setThumbnail] = useState(thumbnails[initialIndex]);
  const [status, setStatus] = useState(false);
  let toggle = () => new Promise<unknown>(res => res);

  let src = thumbnail.imageSrc.toString();
  if (typeof thumbnail.imageSrc === 'object') {
    src = JSON.stringify(thumbnail.imageSrc);
  }

  function _renderDetail(detail: Detail): React.JSX.Element {
    const {item} = detail;
    const {key, value} = item;
    return (
      <View style={styles.item}>
        <Text style={styles.key}>{key}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  }

  function _renderSwitch(): React.JSX.Element {
    return (
      <View style={styles.switch}>
        <Text style={styles.status}>{status ? 'ON' : 'OFF'}</Text>
        <Switch
          value={status}
          onChange={() => {
            toggle();
            setStatus(!status);
          }}
        />
      </View>
    );
  }

  const details = [
    {key: 'index', value: `${thumbnailIndex}`},
    {key: 'caption', value: thumbnail.caption},
    {key: 'imageSrc', value: src},
  ];

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.card}>
        <Image style={styles.image} source={thumbnail.imageSrc} />
        <FlatList
          style={styles.details}
          data={details}
          initialNumToRender={details.length}
          renderItem={_renderDetail}
          keyExtractor={(_item, index) => `${index}`}
          scrollEnabled={false}
          ListHeaderComponent={_renderSwitch}
        />
      </View>
      <ThumbnailSelector
        thumbnails={thumbnails}
        toggle={func => (toggle = func)}
        initialIndex={initialIndex}
        onSelect={(item, index) => {
          setThumbnail(item);
          setThumbnailIndex(index);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#001C34',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  card: {
    marginHorizontal: 8,
  },
  details: {
    backgroundColor: '#2D2C52',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  item: {
    flexDirection: 'column',
    padding: 4,
  },
  key: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    color: 'white',
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  status: {
    color: 'white',
    fontWeight: '700',
    marginRight: 4,
  },
});

export default App;
