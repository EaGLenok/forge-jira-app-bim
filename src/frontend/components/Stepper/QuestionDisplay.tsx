import React from 'react';
import {Box, Heading, Text, xcss} from '@forge/react';
import RadioOptions from './RadioButton';
import CheckboxOptions from './Checkbox';

interface Option {
    name: string;
    value: string;
    label: string;
}

interface QuestionDisplayProps {
    questionId: string;
    text: string;
    options: Option[];
    type: 'RadioButton' | 'Checkbox';
    pendingAnswer: string;
    pendingAnswers: string[];
    onRadioChange: (value: string) => void;
    onCheckboxChange: (values: string[]) => void;
}

const questionBoxStyles = xcss({
    margin: 'space.600',
    padding: 'space.500',
    backgroundColor: 'color.background.accent.blue.subtlest',
    borderColor: 'color.border.discovery',
    borderWidth: 'border.width',
    borderStyle: 'solid',
    borderRadius: 'border.radius',
    wordWrap: 'break-word',
    display: 'block',
});

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({questionId, text, options, type, pendingAnswer, pendingAnswers, onRadioChange, onCheckboxChange}) => (
    <Box xcss={questionBoxStyles}>
        <Heading as="h2">{questionId}</Heading>
        <Text>{text}</Text>
        {type === 'RadioButton' ? (
            <RadioOptions name={questionId} options={options} value={pendingAnswer} onChange={onRadioChange}/>
        ) : (
            <CheckboxOptions name={questionId} options={options} values={pendingAnswers} onChange={onCheckboxChange}/>
        )}
    </Box>
);

export default QuestionDisplay;
