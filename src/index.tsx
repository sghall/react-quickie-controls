import React, { useMemo, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { CompactPicker, ColorResult } from 'react-color';
import Select, { OptionsType, ValueType, Styles } from 'react-select';
import { ValueSlider } from './Slider';

const theme = {
  text: '#555',
  background: '#fff',
  border: '1px solid #ccc',
};

const controlsId = 'react-quickie-controls-root';
const controlsClass = 'react-quickie-control';

const textStyles = {
  fontSize: '12px',
  fontFamily: 'Arial, Helvetica, sans-serif',
};

function useControlsRoot() {
  const memoized = useMemo(() => {
    const existing = document.getElementById(controlsId);

    if (existing) {
      return existing;
    }

    const controlsRoot = document.createElement('div');
    controlsRoot.setAttribute('id', controlsId);
    controlsRoot.style.width = '257px';
    controlsRoot.style.backgroundColor = theme.background;
    controlsRoot.style.position = 'fixed';
    controlsRoot.style.top = '0';
    controlsRoot.style.right = '0';
    controlsRoot.style.zIndex = '10000';
    document.body.appendChild(controlsRoot);

    const button = document.createElement('button');
    button.style.backgroundColor = theme.background;
    button.style.color = theme.text;
    button.style.border = theme.border;
    button.style.borderRadius = '4px';
    button.style.width = '100%';
    button.style.height = '35px';
    button.style.outline = 'none';
    button.style.cursor = 'pointer';
    button.style.userSelect = 'none';
    button.style.webkitTapHighlightColor = 'transparent';
    button.style.zIndex = '10005';
    button.style.fontFamily = textStyles.fontFamily;
    button.style.fontSize = '14px';
    button.innerHTML = 'Show/Hide Controls';
    controlsRoot.appendChild(button);

    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('container');
    controlsContainer.style.backgroundColor = theme.background;
    controlsContainer.style.borderRadius = '2px';
    controlsContainer.style.boxSizing = 'border-box';
    controlsContainer.style.border = theme.border;
    controlsContainer.style.width = '100%';
    controlsContainer.style.position = 'absolute';
    controlsContainer.style.boxShadow = ' 0 8px 6px -6px #ccc';
    controlsRoot.appendChild(controlsContainer);

    button.addEventListener('click', () => {
      if (
        !controlsContainer.style.top ||
        controlsContainer.style.top === 'unset'
      ) {
        controlsContainer.style.top = '-5000px';
      } else {
        controlsContainer.style.top = 'unset';
      }
    });

    return controlsRoot;
  }, []);

  return memoized;
}

export function useValueSlider(
  label: string,
  value: number,
  min = 1,
  max = 100,
  step = 1
) {
  const [float, setFloat] = useState<readonly number[]>([value]);
  const controlsRoot = useControlsRoot();

  useEffect(() => {
    if (!controlsRoot) {
      return;
    }

    const container = controlsRoot.getElementsByClassName('container');
    const controlContainer = document.createElement('div');
    controlContainer.classList.add(controlsClass);
    container[0] && container[0].appendChild(controlContainer);

    function ValueSliderApp() {
      return (
        <ValueSlider
          defaultValues={[value]}
          step={step}
          label={label}
          domain={[min, max]}
          onUpdate={setFloat}
        />
      );
    }

    render(<ValueSliderApp />, controlContainer);

    return () => {
      container[0].removeChild(controlContainer);

      const sliders = container[0].getElementsByClassName(controlsClass);

      if (sliders.length === 0) {
        const root = document.getElementById(controlsId);
        root && document.body.removeChild(root);
      }
    };
  }, [controlsRoot, label, value, min, max, step]);

  return Array.isArray(float) ? float[0] : float;
}

export function useColorPicker(label: string, hex: string) {
  const [color, setColor] = useState(hex);
  const controlsRoot = useControlsRoot();

  useEffect(() => {
    if (!controlsRoot) {
      return;
    }

    const container = controlsRoot.getElementsByClassName('container');
    const controlContainer = document.createElement('div');
    controlContainer.classList.add(controlsClass);
    container[0].appendChild(controlContainer);

    function updateColor(color: ColorResult) {
      setColor(color.hex);
    }

    function ColorPickerApp() {
      const [pickerColor, setPickerColor] = useState(color);

      function onPickerChange(color: ColorResult) {
        setPickerColor(color.hex);
        updateColor(color);
      }

      return (
        <div style={{ padding: 5 }}>
          <div
            style={{
              paddingLeft: 15,
              ...textStyles,
            }}
          >
            {label}
          </div>
          <CompactPicker color={pickerColor} onChange={onPickerChange} />
        </div>
      );
    }

    render(<ColorPickerApp />, controlContainer);

    return () => {
      container[0].removeChild(controlContainer);

      const controls = container[0].getElementsByClassName(controlsClass);

      if (controls.length === 0) {
        const root = document.getElementById(controlsId);
        root && document.body.removeChild(root);
      }
    };
  }, [controlsRoot, label, hex]);

  return color;
}

export function useSelectControl<T>(label: string, options: OptionsType<T>) {
  const [option, setOption] = useState<ValueType<T>>(options[0]);
  const controlsRoot = useControlsRoot();

  useEffect(() => {
    if (!controlsRoot) {
      return;
    }

    const container = controlsRoot.getElementsByClassName('container');
    const selectContainer = document.createElement('div');
    selectContainer.classList.add(controlsClass);
    container[0].appendChild(selectContainer);

    function updateOption(value: ValueType<T>) {
      setOption(value);
    }

    function SelectControlApp() {
      const customStyles: Partial<Styles> = {
        control: (provided: React.CSSProperties) => {
          return {
            ...provided,
            boxShadow: 'none',
            borderColor: '#ccc',
            cursor: 'pointer',
            '&:hover': {
              borderColor: '#ccc',
            },
            '&:focus': {
              outline: 'none',
            },
            outline: 'none',
          };
        },
        menu: (provided: React.CSSProperties) => {
          return { ...provided, marginTop: 2, zIndex: 50010 };
        },
        option: () => {
          return {
            cursor: 'pointer',
            label: 'option',
            backgroundColor: 'transparent',
            color: 'inherit',
            display: 'block',
            fontSize: 'inherit',
            padding: '8px 12px',
            width: 225,
            userSelect: 'none',
            '&:hover': {
              backgroundColor: '#ccc',
              color: '#fff',
            },
          };
        },
        container: (provided: React.CSSProperties) => {
          return {
            ...provided,
            ...textStyles,
          };
        },
      };

      return (
        <div style={{ padding: '10px 2px 2px' }}>
          <div
            style={{
              paddingLeft: 15,
              ...textStyles,
            }}
          >
            {label}
          </div>
          <Select
            isSearchable={false}
            styles={customStyles}
            defaultValue={option}
            onChange={updateOption}
            options={options}
          />
        </div>
      );
    }

    render(<SelectControlApp />, selectContainer);

    return () => {
      container[0].removeChild(selectContainer);

      const controls = container[0].getElementsByClassName(controlsClass);

      if (controls.length === 0) {
        const root = document.getElementById(controlsId);
        root && document.body.removeChild(root);
      }
    };
  }, [controlsRoot, label]);

  return option as T;
}
