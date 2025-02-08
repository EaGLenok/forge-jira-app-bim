import React from 'react';
import { ProgressBar, xcss } from '@forge/react';

interface ProgressIndicatorProps {
    value: number;
    appearance: 'default' | 'success';
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ value, appearance }) => (
    <ProgressBar ariaLabel="Overall progress" value={value} appearance={appearance} />
);

export default ProgressIndicator;
