import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import ThumbnailSelector, {
  type ThumbnailItem,
} from 'react-native-thumbnail-selector';
import { SafeAreaView } from 'react-native-safe-area-context';

const ThumbnailItems: ThumbnailItem[] = [
  {
    caption: 'Arizona Diamondbacks',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/109.jpg',
    },
  },
  { caption: 'Athletics', imageSrc: require('./assets/oa.png') },
  {
    caption: 'Atlanta Braves',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/144.jpg',
    },
  },
  {
    caption: 'Baltimore Orioles',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/110.jpg',
    },
  },
  {
    caption: 'Boston Red Sox',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/111.jpg',
    },
  },
  {
    caption: 'Chicago Cubs',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/112.jpg',
    },
  },
  {
    caption: 'Cincinnati Reds',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/113.jpg',
    },
  },
  { caption: 'Cleveland Guardians', imageSrc: require('./assets/cg.png') },
  {
    caption: 'Colorado Rockies',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/115.jpg',
    },
  },
  {
    caption: 'Detroit Tigers',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/116.jpg',
    },
  },
  {
    caption: 'Houston Astros',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/117.jpg',
    },
  },
  {
    caption: 'Kansas City Royals',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/118.jpg',
    },
  },
  {
    caption: 'Los Angeles Angels',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/108.jpg',
    },
  },
  {
    caption: 'Los Angeles Dodgers',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/119.jpg',
    },
  },
  {
    caption: 'Miami Marlins',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/146.jpg',
    },
  },
  {
    caption: 'Milwaukee Brewers',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/158.jpg',
    },
  },
  {
    caption: 'Minnesota Twins',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/142.jpg',
    },
  },
  { caption: 'New York Mets', imageSrc: require('./assets/nym.png') },
  { caption: 'New York Yankees', imageSrc: require('./assets/nyy.png') },
  {
    caption: 'Philadelphia Phillies',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/143.jpg',
    },
  },
  {
    caption: 'Pittsburgh Pirates',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/134.jpg',
    },
  },
  {
    caption: 'San Diego Padres',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/135.jpg',
    },
  },
  {
    caption: 'San Francisco Giants',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/137.jpg',
    },
  },
  {
    caption: 'St. Louis Cardinals',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/138.jpg',
    },
  },
  {
    caption: 'Tampa Bay Rays',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/139.jpg',
    },
  },
  {
    caption: 'Texas Rangers',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/140.jpg',
    },
  },
  {
    caption: 'Toronto Blue Jays',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/141.jpg',
    },
  },
  {
    caption: 'Washington Nationals',
    imageSrc: {
      uri: 'https://www.mlbstatic.com/team-logos/share/120.jpg',
    },
  },
];

export default function App(): React.JSX.Element {
  const [selected, setSelected] = React.useState<ThumbnailItem>(
    ThumbnailItems[0],
  );
  const toggleRef = React.useRef(() => {});
  const window = useWindowDimensions();
  const imageStyle = { width: window.width, height: window.height - 300 };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => toggleRef.current()}
      >
        <Text style={styles.buttonText}>{'Toggle ThumbnailSelector'}</Text>
      </TouchableOpacity>
      <Image
        style={imageStyle}
        source={selected.imageSrc}
        resizeMode={'contain'}
      />
      <ThumbnailSelector
        thumbnails={ThumbnailItems}
        toggle={func => (toggleRef.current = func)}
        onSelect={item => setSelected(item)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  button: {
    backgroundColor: 'black',
    borderRadius: 6,
    borderWidth: 1,
    margin: 16,
    padding: 16,
  },
  // eslint-disable-next-line react-native/no-color-literals
  buttonText: {
    color: 'whitesmoke',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // eslint-disable-next-line react-native/no-color-literals
  safeAreaView: {
    backgroundColor: 'whitesmoke',
    flex: 1,
  },
});
