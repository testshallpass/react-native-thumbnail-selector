export const REACT_NATIVE_LOGO =
  'https://reactnative.dev/docs/assets/favicon.png';
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
    id: 0,
    caption: 'David',
    image: getPlaceholderImage('tech'),
  },
  {
    id: 1,
    caption: 'Brian',
    image: REACT_NATIVE_LOGO,
  },
  {
    id: 2,
    caption: 'Gene',
    image: getPlaceholderImage('arch'),
  },
  {
    id: 3,
    caption: 'Jose',
    image: REACT_NATIVE_LOGO,
  },
  {
    id: 4,
    caption: 'Jon',
    image: getPlaceholderImage('animals'),
  },
  {
    id: 5,
    caption: 'Craig',
    image: REACT_NATIVE_LOGO,
  },
  {
    id: 6,
    caption: 'Sean',
    image: getPlaceholderImage('people'),
  },
];
