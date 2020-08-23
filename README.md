# React Quickie Controls

Make simple controls to use for development or in storybooks. A test control can be added to your app or component by just importing this library and adding a single line to your code. You can append more controls to the same instance and experiment with different values for numbers, strings and colors. They can be in multiple places anywhere in the tree. When the hook unmounts that control will be removed from the list and any others will continue to work.

```
npm install react-quickie-controls
```

For example, if you wanted to quickly be able to change a number to different values between 1 and 100 you could just do the following...

```js
import { useValueSlider } from 'react-quickie-controls';

const MyComponent = () => {
  // this will render a value slider in the upper right of the screen
  // changing the slider value will cause this component to update
  const x = useValueSlider('X Value:', 10, 1, 100, 0.5); // (label, value, min, max, step?)

  return <div>The X Value: {x}</div>;
};
```

Need to add two color selectors as well? No problem.

```js
import { useValueSlider } from 'react-quickie-controls';

const MyComponent = () => {
  const x = useValueSlider('X Value:', 10, 0, 100, 0.5);
  const color = useColorPicker('Color:', '#333');
  const backgroundColor = useColorPicker('Background Color:', '#555');

  return <div style={{{color, backgroundColor }}>The X Value: {x}</div>;
};
```

You get the idea.

Currently, this package exports these three react hooks...

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

If people start using this, there's a lot that could be done. More control types, better styling and customization come to mind.
