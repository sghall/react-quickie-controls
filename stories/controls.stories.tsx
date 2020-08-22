import React from 'react';
import { useValueSlider, useColorPicker } from '../src';

export default {
  title: 'Demos',
};

export const valueSlider = () => {
  const scaleX = useValueSlider('X Value:', 10, 0, 100, 0.5);
  const scaleY = useValueSlider('Y Value:', 10, 0, 100, 0.5);
  const scaleZ = useValueSlider('Z Value:', 10, 0, 100, 0.5);

  return (
    <div>
      <div>x: {scaleX.toFixed(2)}</div>
      <div>y: {scaleY.toFixed(2)}</div>
      <div>z: {scaleZ.toFixed(2)}</div>
    </div>
  );
};

valueSlider.story = {
  name: 'Value Slider',
};

export const colorPicker = () => {
  const color1 = useColorPicker('Color 1:', '#333');
  const color2 = useColorPicker('Color 2:', '#555');
  const color3 = useColorPicker('Color 3:', '#777');

  return (
    <div>
      <div style={{ width: 200, height: 200, backgroundColor: color1 }}>
        Color 1
      </div>
      <div style={{ width: 200, height: 200, backgroundColor: color2 }}>
        Color 2
      </div>
      <div style={{ width: 200, height: 200, backgroundColor: color3 }}>
        Color 3
      </div>
    </div>
  );
};

colorPicker.story = {
  name: 'Color Picker',
};
