import React from 'react';
import { RadioGroup } from '@forge/react';

interface Option {
  name: string;
  value: string;
  label: string;
}

interface RadioOptionsProps {
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const RadioOptions: React.FC<RadioOptionsProps> = ({ name, options, value, onChange }) => (
  <RadioGroup name={name} options={options} value={value} onChange={(e) => onChange(e.target.value)} />
);

export default RadioOptions;
