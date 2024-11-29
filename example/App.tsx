import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageSize,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import ThumbnailSelector, {ThumbnailItem} from 'react-native-thumbnail-selector';

export default function App(): React.JSX.Element {
  function getThumbnails(): ThumbnailItem[] {
    return [
      {
        caption: 'react-native',
        imageSrc: {
          uri: 'https://reactnative.dev/img/pwa/manifest-icon-512.png',
        },
      },
      {
        caption: 'jest testing',
        imageSrc: {
          uri: 'https://jestjs.io/img/opengraph.png',
        },
      },
      {
        caption: 'prettier',
        imageSrc: {
          uri: 'https://prettier.io/icon.png',
        },
      },
      {
        caption: 'Visual Studio Code',
        imageSrc: {
          uri: 'https://code.visualstudio.com/apple-touch-icon.png',
        },
      },
      {
        caption: 'eslint tool',
        imageSrc: {
          uri: 'https://eslint.org/icon-512.png',
        },
      },
      {
        imageSrc: {
          uri: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
      },
      {
        caption: 'Do mollit sit nisi elit velit proident pariatur eu occaecat.',
        imageSrc: {
          uri: 'https://randomuser.me/api/portraits/women/79.jpg',
        },
      },
      {caption: 'Cleveland Guardians', imageSrc: require('./assets/cg.png')},
      {caption: 'Milwaukee Brewers', imageSrc: require('./assets/mb.png')},
      {caption: 'New York Mets', imageSrc: require('./assets/nym.png')},
      {caption: 'New York Yankees', imageSrc: require('./assets/nyy.png')},
      {caption: "Oakland A's", imageSrc: require('./assets/oa.png')},
      {caption: 'San Diego Padres', imageSrc: require('./assets/sdp.png')},
      {caption: '', imageSrc: require('./assets/nyy.png')},
      {
        caption:
          'Excepteur amet veniam enim sint dolor consequat dolor deserunt.',
        imageSrc: require('./assets/nym.png'),
      },
    ];
  }
  const thumbnails = React.useMemo(() => getThumbnails(), []);
  const [thumbnail, setThumbnail] = React.useState<ThumbnailItem>(
    thumbnails[0],
  );
  const [isThumbnailSelectorOpen, setIsThumbnailSelectorOpen] =
    React.useState<boolean>(false);
  const defaultImageSize = {width: 136, height: 136};
  const [imageSize, setImageSize] = React.useState<ImageSize>(defaultImageSize);
  let toggle = () => new Promise<Animated.EndResult | unknown>(res => res);

  function _onButtonPress(): void {
    toggle();
    setIsThumbnailSelectorOpen(!isThumbnailSelectorOpen);
  }

  async function _onThumbnailSelect(item: ThumbnailItem): Promise<void> {
    const resolvedSrc = Image.resolveAssetSource(item.imageSrc);
    let size = defaultImageSize;
    if (resolvedSrc.uri) {
      size = await Image.getSize(resolvedSrc.uri);
    }
    setImageSize({width: size.width, height: defaultImageSize.height});
    setThumbnail(item);
  }

  const src = Image.resolveAssetSource(thumbnail.imageSrc);
  const buttonText = isThumbnailSelectorOpen
    ? 'Close ThumbnailSelector'
    : 'Open ThumbnailSelector';
  const buttonColor = isThumbnailSelectorOpen ? '#61896C' : '#5571F6';

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.content}>
        <Image
          style={[styles.image, {...imageSize}]}
          source={thumbnail.imageSrc}
          resizeMode={'contain'}
        />
        <View style={styles.item}>
          <Text style={styles.key}>{'caption'}</Text>
          <Text style={styles.value}>{thumbnail.caption}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.key}>{'imageSrc'}</Text>
          <Text style={styles.value}>{JSON.stringify(src)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: buttonColor}]}
          onPress={_onButtonPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      <ThumbnailSelector
        thumbnails={thumbnails}
        toggle={func => (toggle = func)}
        onSelect={_onThumbnailSelect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#32302F',
  },
  content: {
    margin: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#3C3B3A',
  },
  image: {
    width: 136,
    height: 136,
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'column',
    padding: 4,
  },
  key: {
    fontSize: 16,
    color: 'whitesmoke',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: 'whitesmoke',
  },
  button: {
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'whitesmoke',
  },
});
