import React from 'react';
import { Checkbox, Box } from '@forge/react';

interface Option {
    name: string;
    value: string;
    label: string;
}

interface CheckboxOptionsProps {
    name: string;
    options: Option[];
    values: string[];
    onChange: (values: string[]) => void;
}

const CheckboxOptions: React.FC<CheckboxOptionsProps> = ({ name, options, values, onChange }) => {
    const handleToggle = (val: string) => {
        if (values.includes(val)) {
            onChange(values.filter((v) => v !== val));
        } else {
            onChange([...values, val]);
        }
    };

    return (
        <>
            {options.map((option) => (
                <Box key={option.value}>
                    <Checkbox
                        name={name}
                        value={option.value}
                        label={option.label}
                        isChecked={values.includes(option.value)}
                        onChange={() => handleToggle(option.value)}
                    />
                </Box>
            ))}
        </>
    );
};

export default CheckboxOptions;
