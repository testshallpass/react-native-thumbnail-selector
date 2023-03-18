import React from "react";
import { Text } from "react-native";
import {
  render,
  fireEvent,
  screen,
  cleanup,
} from "@testing-library/react-native";
import ThumbnailSelector from "../ThumbnailSelector";
const thumbnails = [
  {
    caption: "react-native",
    imageSrc: { uri: "https://reactnative.dev/img/tiny_logo.png" },
  },
  {
    caption: "Dolore do magna ullamco nisi quis.",
    imageSrc: { uri: "https://reactnative.dev/img/tiny_logo.png" },
  },
];

afterEach(cleanup);

test("it renders", () => {
  const component = render(<ThumbnailSelector thumbnails={thumbnails} />);
  expect(component.toJSON()).toMatchSnapshot();
});

test("it toggle open and can select item", () => {
  let toggle = () => {};
  const component = render(
    <ThumbnailSelector
      thumbnails={thumbnails}
      toggle={(func) => (toggle = func)}
      onSelect={(item) => {
        console.log(item.caption);
      }}
    />
  );
  toggle();

  const { getByText } = screen;
  const item = getByText("react-native");
  expect(item).toBeDefined();
  fireEvent.press(item);

  expect(component.toJSON()).toMatchSnapshot();
});

test("it toggle open and close", () => {
  let toggle = () => {};
  const component = render(
    <ThumbnailSelector
      thumbnails={thumbnails}
      toggle={(func) => (toggle = func)}
    />
  );
  toggle();
  toggle();
  expect(component.toJSON()).toMatchSnapshot();
});

test("it toggle open and renderThumbnail", () => {
  let toggle = () => {};
  const component = render(
    <ThumbnailSelector
      thumbnails={thumbnails}
      toggle={(func) => (toggle = func)}
      renderThumbnail={(item) => {
        return <Text>{item.caption}</Text>;
      }}
    />
  );
  toggle();
  expect(component.toJSON()).toMatchSnapshot();
});
