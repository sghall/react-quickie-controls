import React from 'react';
import { useValueSlider, useColorPicker, useSelectControl } from '../src';

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

type OptionType = {
  value: number;
  label: string;
};

export const selectDemo = () => {
  const pizza1 = useSelectControl<OptionType>('Pizza Size 1: ', [
    { value: 20, label: 'sm' },
    { value: 30, label: 'md' },
    { value: 30, label: 'lg' },
  ]);
  const pizza2 = useSelectControl<OptionType>('Pizza Size 2: ', [
    { value: 20, label: 'sm' },
    { value: 30, label: 'md' },
    { value: 30, label: 'lg' },
  ]);
  const pizza3 = useSelectControl<OptionType>('Pizza Size 3: ', [
    { value: 20, label: 'sm' },
    { value: 30, label: 'md' },
    { value: 30, label: 'lg' },
  ]);

  return (
    <div>
      <div>Pizza 1: {pizza1.label}</div>
      <div>Pizza 2: {pizza2.label}</div>
      <div>Pizza 3: {pizza3.label}</div>
    </div>
  );
};

selectDemo.story = {
  name: 'Select Demo',
};

type MyOptionType = {
  value: () => string; // could be whatever
  label: string;
};

export const kitchenSink = () => {
  const text = useSelectControl<MyOptionType>('Pizza Size 1: ', [
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

kitchenSink.story = {
  name: 'Kitchen Sink',
};
