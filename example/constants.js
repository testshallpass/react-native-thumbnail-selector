export const REACT_NATIVE_LOGO = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
export const IMAGE_SIZE = 125;
const getPlaceholderImage = (category = '') => {
  const placeholderPrefix = `https://placeimg.com/${IMAGE_SIZE}/${IMAGE_SIZE}`;
  const categories = ['animals', 'arch', 'nature', 'people', 'tech', 'any'];
  if (categories.includes(category)) {
    return `${placeholderPrefix}/${category}`;
  }
  return `${placeholderPrefix}/any`;
};
export const ITEMS = [
  {
    caption: 'David',
    image: getPlaceholderImage('tech'),
  },
  {
    caption: 'Brian',
    image: REACT_NATIVE_LOGO,
  },
  {
    caption: 'Gene',
    image: getPlaceholderImage('arch'),
  },
  {
    caption: 'Jose',
    image: REACT_NATIVE_LOGO,
  },
  {
    caption: 'Jon',
    image: getPlaceholderImage('animals'),
  },
  {
    caption: 'Craig',
    image: REACT_NATIVE_LOGO,
  },
  {
    caption: 'Sean',
    image: getPlaceholderImage('people'),
  },
];
