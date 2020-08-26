# React Quickie Controls

React hooks to make quick controls to use for development or in storybooks. A test control can be added to your app or component by just importing this library and adding a single line to your code. You can append more controls to the same instance and experiment with different values for numbers, strings and colors. They can be in multiple places anywhere in the tree. When the hook unmounts that control will be removed from the list and any others will continue to work.

```
npm install react-quickie-controls
```

#### [Storybook Demos](https://react-quickie-controls.netlify.app)

<div style="text-align:center;">
  <a href="https://github.com/sghall/react-move" target="\_parent"><img src="https://user-images.githubusercontent.com/4615775/91217598-9c680100-e6cc-11ea-92e9-04c011222876.gif" alt="react-quickie-controls"/></a>
</div>

**NOTE: This is a beta project and is only being used in a couple of places. Since it's only for development it's relatively safe to put it out there for others to try out. Please don't put this in your app though.**

# How does it work?

For example, if you wanted to quickly be able to change a number to different values between 1 and 100 you could just do the following...

```js
import { useValueSlider } from 'react-quickie-controls';

const MyComponent = () => {
  // this will render a value slider in the upper right of the screen
  // changing the slider value will cause this component to update
  const x = useValueSlider('X Value:', 10, 1, 100, 0.5); // (label, value, min?, max?, step?)

  return <div>The X Value: {x}</div>;
};
```

Need to add two color selectors as well? No problem.

```js
import { useValueSlider, useColorPicker } from 'react-quickie-controls';

const MyComponent = () => {
  const x = useValueSlider('X Value:', 10, 0, 100, 0.5);
  const color = useColorPicker('Color:', '#333');
  const backgroundColor = useColorPicker('Background Color:', '#555');

  return <div style={{{color, backgroundColor }}>The X Value: {x}</div>;
};
```

You get the idea.

Currently, this package exports these three React hooks...

```js
import {
  useValueSlider,
  useColorPicker,
  useSelectControl,
} from 'react-quickie-controls';
```

# Fun Fact

Each control is actually a mini React app.

# Road Map

If people start using this, there's a lot that could be done. More control types and better styling/customization come to mind.

# One more example...

```js
type MyOptionType = {
  value: () => string, // could be whatever, string, number, function, etc
  label: string,
};

export const kitchenSink = () => {
  const text =
    useSelectControl <
    MyOptionType >
    ('Select Control: ',
    [
      { value: () => 'Option 1', label: 'The First Option' },
      { value: () => 'Option 2', label: 'The Second Option' },
      { value: () => 'Option 3', label: 'The Third Option' },
    ]);

  const width = useValueSlider('Width: ', 100, 50, 300, 10);
  const height = useValueSlider('Height: ', 100, 50, 300, 10);

  const backgroundColor = useColorPicker('Background Color: ', '#0000ff');
  const border = useColorPicker('Border Color: ', '#ccc');

  return (
    <div
      style={{
        width,
        height,
        color: '#fff',
        backgroundColor,
        border: `2px solid ${border}`,
      }}
    >
      {text.value()}
    </div>
  );
};
```
