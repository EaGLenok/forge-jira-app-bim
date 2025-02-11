import React from 'react';
import { Box, Button, Heading, Textfield, Select, xcss } from '@forge/react';
import { QuestionNode, ButtonType } from '../../../utils/types';
import AnswerList from './AnswerList';

const questionCardContainerStyles = xcss({
    display: 'block',
    marginTop: 'space.300',
    padding: 'space.400',
    borderWidth: 'border.width',
    borderColor: 'color.border.accent.blue',
    borderStyle: 'solid',
    borderRadius: 'border.radius',
    backgroundColor: 'elevation.surface.sunken',
});

const questionHeaderContainerStyles = xcss({
    display: 'block',
    marginBottom: 'space.200',
});

const removeButtonWrapperStyles = xcss({
    display: 'block',
    marginTop: 'space.100',
    marginBottom: 'space.200',
});

const narrowTextfieldWrapperStyles = xcss({
    display: 'inline-block',
    width: '300px',
});

const textfieldWrapperStyles = xcss({
    display: 'block',
    marginBottom: 'space.200',
});

const selectWrapperStyles = xcss({
    display: 'block',
    marginBottom: 'space.200',
});

const checkBoxNextWrapperStyles = xcss({
    display: 'block',
    marginTop: 'space.100',
    marginBottom: 'space.200',
});

const narrowSelectStyles = xcss({
    display: 'inline-block',
    width: '300px',
});

const answersHeaderWrapperStyles = xcss({
    display: 'block',
    marginTop: 'space.300',
    marginBottom: 'space.100',
});

const addAnswerButtonContainerStyles = xcss({
    display: 'block',
    marginBottom: 'space.200',
});

function parseId(id: string) {
    const [topicStr, questionStr] = id.split('.');
    return {
        topicNum: parseInt(topicStr, 10),
        questionNum: parseInt(questionStr, 10),
    };
}

function isIdAfter(currentId: string, candidateId: string) {
    const current = parseId(currentId);
    const candidate = parseId(candidateId);
    if (candidate.topicNum > current.topicNum) return true;
    if (candidate.topicNum < current.topicNum) return false;
    return candidate.questionNum > current.questionNum;
}

interface Props {
    topicId: string;
    question: QuestionNode;
    allQuestionIds: string[];
    onRemoveQuestion: (topicId: string, questionId: string) => void;
    onQuestionTextChange: (topicId: string, questionId: string, newText: string) => void;
    onQuestionTypeChange: (topicId: string, questionId: string, newType: ButtonType) => void;
    onAddAnswer: (topicId: string, questionId: string) => void;
    onRemoveAnswer: (topicId: string, questionId: string, index: number) => void;
    onAnswerLabelChange: (
        topicId: string,
        questionId: string,
        index: number,
        newLabel: string
    ) => void;
    onRadioNextChange: (
        topicId: string,
        questionId: string,
        answerIndex: number,
        nextId: string
    ) => void;
    onCheckBoxNextChange: (
        topicId: string,
        questionId: string,
        nextId: string
    ) => void;
}

const QuestionCard: React.FC<Props> = ({topicId, question, allQuestionIds, onRemoveQuestion, onQuestionTextChange, onQuestionTypeChange, onAddAnswer, onRemoveAnswer, onAnswerLabelChange, onRadioNextChange, onCheckBoxNextChange}) => {
    return (
        <Box xcss={questionCardContainerStyles}>
            <Box xcss={questionHeaderContainerStyles}>
                <Heading as="h4">Question {question.id}</Heading>
            </Box>

            <Box xcss={removeButtonWrapperStyles}>
                <Button appearance="danger" onClick={() => onRemoveQuestion(topicId, question.id)}>
                    Remove
                </Button>
            </Box>

            <Box xcss={textfieldWrapperStyles}>
                <Box xcss={narrowTextfieldWrapperStyles}>
                    <Textfield
                        placeholder="Question"
                        value={question.text}
                        onChange={(e) => onQuestionTextChange(topicId, question.id, e.target.value)}
                    />
                </Box>
            </Box>

            <Box xcss={selectWrapperStyles}>
                <Box xcss={narrowSelectStyles}>
                    <Select
                        placeholder="Question Type"
                        options={[
                            { label: ButtonType.RadioButton, value: ButtonType.RadioButton },
                            { label: ButtonType.Checkbox, value: ButtonType.Checkbox },
                        ]}
                        value={{ label: question.type, value: question.type }}
                        onChange={(option) => {
                            if (!option) return;
                            onQuestionTypeChange(topicId, question.id, option.value as ButtonType);
                        }}
                    />
                </Box>
            </Box>

            {question.type === ButtonType.Checkbox && (
                <Box xcss={checkBoxNextWrapperStyles}>
                    <Box xcss={narrowSelectStyles}>
                        <Select
                            placeholder="Next question"
                            options={allQuestionIds
                                .filter((id) => isIdAfter(question.id, id))
                                .map((id) => ({ label: id, value: id }))}
                            value={
                                question.next && question.next !== 'unused'
                                    ? { label: question.next, value: question.next }
                                    : null
                            }
                            onChange={(option) => {
                                if (!option) return;
                                onCheckBoxNextChange(topicId, question.id, option.value);
                            }}
                        />
                    </Box>
                </Box>
            )}

            <Box xcss={answersHeaderWrapperStyles}>
                <Heading as="h5">Answers</Heading>
            </Box>

            <Box xcss={addAnswerButtonContainerStyles}>
                <Button appearance="primary" onClick={() => onAddAnswer(topicId, question.id)}>
                    + Add Answer
                </Button>
            </Box>
        </Box>
    );
};

export default QuestionCard;
