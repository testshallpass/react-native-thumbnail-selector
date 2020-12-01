export const reactNativeLogo =
  'https://reactnative.dev/docs/assets/favicon.png';
export const imageSize = 125;
const getPlaceholderImage = (category = '') => {
  const placeholderPrefix = `https://placeimg.com/${imageSize}/${imageSize}`;
  const categories = ['animals', 'arch', 'nature', 'people', 'tech', 'any'];
  if (categories.includes(category)) {
    return `${placeholderPrefix}/${category}`;
  }
  return `${placeholderPrefix}/any`;
};
export const thumbnails = [
  {
    caption: 'David',
    image: getPlaceholderImage('tech'),
  },
  {
    caption: 'Brian',
    image: reactNativeLogo,
  },
  {
    caption: 'Gene',
    image: getPlaceholderImage('arch'),
  },
  {
    caption: 'Jose',
    image: reactNativeLogo,
  },
  {
    caption: 'Jon',
    image: getPlaceholderImage('animals'),
  },
  {
    caption: 'Craig',
    image: reactNativeLogo,
  },
  {
    caption: 'Sean',
    image: getPlaceholderImage('people'),
  },
];
