import React from 'react';
import { Box, Button, xcss } from '@forge/react';

interface NavigationButtonsProps {
    onBack: () => void;
    onNext: () => void;
    disableBack: boolean;
    disableNext: boolean;
}

const navButtonBoxStyles = xcss({
    margin: 'space.400',
    display: 'inline-block',
    gap: 'space.200',
});

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onBack, onNext, disableBack, disableNext }) => (
    <Box xcss={navButtonBoxStyles}>
        <Button onClick={onBack} isDisabled={disableBack}>Back</Button>
        <Button onClick={onNext} isDisabled={disableNext}>Next</Button>
    </Box>
);

export default NavigationButtons;
